#!/usr/bin/env python3
"""
Shared helpers for scanning placeholders, checking dependencies, and opening files.
"""

import sys
import os
import re
import subprocess
from pathlib import Path


def ensure_dependencies():
    """Check and auto-install required Python packages if missing."""
    required = {
        'docx': 'python-docx',
        'docxtpl': 'docxtpl',
        'PIL': 'pillow',
        'lxml': 'lxml',
    }
    missing = []
    for module, package in required.items():
        try:
            __import__(module)
        except ImportError:
            missing.append(package)

    if missing:
        print(f"Installing missing dependencies: {', '.join(missing)}")
        subprocess.check_call(
            [sys.executable, '-m', 'pip', 'install', '--quiet'] + missing
        )
        print("Dependencies installed successfully.")


W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
TEXT_PLACEHOLDER_RE = re.compile(r"\{\{([^{}]+)\}\}")
IMG_PLACEHOLDER_RE = re.compile(r"img_(.+)")


def _collect_placeholders_from_xml(xml_bytes, text_placeholders, img_placeholders):
    """Collect {{name}} / {{img_name}} from all paragraphs, including text boxes."""
    from lxml import etree

    root = etree.fromstring(xml_bytes)
    for para in root.iter(f"{W_NS}p"):
        full = "".join((node.text or "") for node in para.iter(f"{W_NS}t"))
        for match in TEXT_PLACEHOLDER_RE.finditer(full):
            name = match.group(1).strip()
            img_match = IMG_PLACEHOLDER_RE.match(name)
            if img_match:
                img_placeholders.append(img_match.group(1).strip())
            else:
                text_placeholders.append(name)


def scan_placeholders(docx_path):
    """
    Scan a .docx template file for all {{variable}} and {{img_name}} placeholders.

    Covers document body, tables, headers, footers, and text boxes.
    Image placeholders use {{img_name}} (underscore) because Jinja2 disallows colons.

    Returns:
        dict with keys:
            'text': list of text placeholder names (e.g. ['文档标题', '摘要'])
            'img': list of image placeholder names (e.g. ['附图'])
                  These are the names AFTER removing the 'img_' prefix.
    """
    import zipfile

    text_placeholders = []
    img_placeholders = []

    with zipfile.ZipFile(docx_path) as zf:
        for name in zf.namelist():
            if not name.endswith(".xml"):
                continue
            if name == "word/document.xml" or name.startswith("word/header") or name.startswith("word/footer"):
                _collect_placeholders_from_xml(zf.read(name), text_placeholders, img_placeholders)

    text_placeholders = list(dict.fromkeys(text_placeholders))
    img_placeholders = list(dict.fromkeys(img_placeholders))
    return {"text": text_placeholders, "img": img_placeholders}


def format_placeholders_list(placeholders):
    """Format scanned placeholders into a readable display string."""
    lines = []
    if placeholders['text']:
        lines.append("=== Text Placeholders ===")
        for i, name in enumerate(placeholders['text'], 1):
            lines.append(f"  {i}. {{{{{name}}}}}")
    if placeholders['img']:
        lines.append("=== Image Placeholders ===")
        for i, name in enumerate(placeholders['img'], 1):
            lines.append(f"  {i}. {{{{img_{name}}}}}")
    if not lines:
        lines.append("No placeholders found in the template.")
    return '\n'.join(lines)


def resolve_output_path(template_path, output_path=None):
    """
    Resolve the output file path for the generated document.

    If output_path is provided by the user, use it directly.
    Otherwise, save to the same directory as the template with a _generated suffix.
    """
    if output_path:
        return Path(output_path).resolve()

    template = Path(template_path).resolve()
    return template.parent / f"{template.stem}_generated{template.suffix}"


def open_file(filepath):
    """Open the generated file using the system's default application."""
    filepath = str(Path(filepath).resolve())
    if sys.platform == 'win32':
        os.startfile(filepath)
    elif sys.platform == 'darwin':
        subprocess.run(['open', filepath])
    else:
        subprocess.run(['xdg-open', filepath])


def validate_template_path(docx_path):
    """Validate that the template file exists and is a .docx file."""
    path = Path(docx_path).resolve()
    if not path.exists():
        print(f"Error: Template file not found: {path}")
        sys.exit(1)
    if path.suffix.lower() != '.docx':
        print(f"Error: Template file must be a .docx file, got: {path.suffix}")
        sys.exit(1)
    return path


def validate_image_path(img_path):
    """Validate that an image file exists."""
    path = Path(img_path).resolve()
    if not path.exists():
        print(f"Warning: Image file not found: {path}")
        return None
    return path


def trim_image_whitespace(img_path, threshold=245, pad=6, out_dir=None):
    """Crop near-white margins from an image; return (path, width_px, height_px).

    Keeps original file unchanged; writes a trimmed copy under out_dir (or %TEMP%).
    """
    from PIL import Image
    import tempfile

    src = Path(img_path)
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size

    def is_ink(x, y):
        r, g, b, a = px[x, y]
        if a < 10:
            return False
        return not (r >= threshold and g >= threshold and b >= threshold)

    top = 0
    while top < h and not any(is_ink(x, top) for x in range(0, w, 2)):
        top += 1
    bot = h - 1
    while bot > top and not any(is_ink(x, bot) for x in range(0, w, 2)):
        bot -= 1
    left = 0
    while left < w and not any(is_ink(left, y) for y in range(top, bot + 1, 2)):
        left += 1
    right = w - 1
    while right > left and not any(is_ink(right, y) for y in range(top, bot + 1, 2)):
        right -= 1

    if top >= bot or left >= right:
        return src, w, h

    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(w - 1, right + pad)
    bot = min(h - 1, bot + pad)
    cropped = im.crop((left, top, right + 1, bot + 1))

    dest_dir = Path(out_dir) if out_dir else Path(tempfile.gettempdir()) / "docx-template-trim"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / f"{src.stem}_trim{src.suffix or '.png'}"
    # JPEG has no alpha
    if dest.suffix.lower() in {".jpg", ".jpeg"}:
        cropped = cropped.convert("RGB")
    cropped.save(dest)
    cw, ch = cropped.size
    return dest, cw, ch


def load_json_value(raw, file_path, default=None):
    """Parse JSON from a CLI string or a UTF-8 file."""
    import json

    if file_path:
        return json.loads(Path(file_path).read_text(encoding="utf-8"))
    if raw:
        return json.loads(raw)
    return {} if default is None else default


def load_template_meta(template_path):
    """Load optional sidecar JSON: <template_stem>.meta.json (image sizes, etc.)."""
    import json

    meta_path = Path(template_path).with_name(Path(template_path).stem + ".meta.json")
    if not meta_path.exists():
        return {}
    return json.loads(meta_path.read_text(encoding="utf-8"))
