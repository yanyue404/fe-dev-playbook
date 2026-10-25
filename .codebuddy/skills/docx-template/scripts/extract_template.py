#!/usr/bin/env python3
"""
Turn a filled .docx into a docxtpl template.

The caller supplies a JSON object of exact strings to replace with
{{placeholders}}. This script does not ship any document's original wording.
Inline pictures in the body become {{img_图片N}}, and a sidecar .meta.json
records their width in centimetres.
"""

from __future__ import annotations

import argparse
import json
import sys
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from utils import ensure_dependencies

ensure_dependencies()

from lxml import etree

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
WP = "{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
XML_SPACE = "{http://www.w3.org/XML/1998/namespace}space"


def replace_once_in_paragraph(para, old: str, new: str) -> bool:
    """Replace the first occurrence of `old` inside a paragraph, keeping surrounding runs."""
    t_nodes = list(para.iter(f"{W}t"))
    if not t_nodes:
        return False

    pieces = [(node, node.text or "") for node in t_nodes]
    full = "".join(text for _, text in pieces)
    start = full.find(old)
    if start < 0:
        return False
    end = start + len(old)

    pos = 0
    start_i = end_i = start_off = end_off = None
    for i, (_, text) in enumerate(pieces):
        nxt = pos + len(text)
        if start_i is None and start < nxt:
            start_i, start_off = i, start - pos
        if end <= nxt:
            end_i, end_off = i, end - pos
            break
        pos = nxt

    if start_i is None or end_i is None:
        return False

    if start_i == end_i:
        node, text = pieces[start_i]
        node.text = text[:start_off] + new + text[end_off:]
        node.set(XML_SPACE, "preserve")
        return True

    first_node, first_text = pieces[start_i]
    last_node, last_text = pieces[end_i]
    first_node.text = first_text[:start_off] + new
    first_node.set(XML_SPACE, "preserve")
    for i in range(start_i + 1, end_i):
        pieces[i][0].text = ""
    last_node.text = last_text[end_off:]
    last_node.set(XML_SPACE, "preserve")
    return True


def replace_all_in_tree(root, old: str, new: str) -> int:
    count = 0
    for para in root.iter(f"{W}p"):
        while replace_once_in_paragraph(para, old, new):
            count += 1
    return count


def emu_to_cm(emu) -> float:
    return round(int(emu) / 360000.0, 2)


def replace_inline_images(root) -> list[dict]:
    """Replace body inline pictures with {{img_图片N}} placeholders."""
    specs = []
    index = 0
    for para in root.iter(f"{W}p"):
        inlines = para.findall(f".//{WP}inline")
        if not inlines:
            continue
        blips = para.findall(f".//{A}blip")
        if not blips:
            continue

        index += 1
        name = f"图片{index}"
        extent = inlines[0].find(f"{WP}extent")
        spec = {"name": name, "placeholder": f"{{{{img_{name}}}}}"}
        if extent is not None:
            spec["width_cm"] = emu_to_cm(extent.get("cx"))
            spec["height_cm"] = emu_to_cm(extent.get("cy"))
        specs.append(spec)

        for drawing in list(para.findall(f".//{W}drawing")):
            parent = drawing.getparent()
            if parent is not None:
                parent.remove(drawing)

        run = etree.SubElement(para, f"{W}r")
        rpr = etree.SubElement(run, f"{W}rPr")
        sz = etree.SubElement(rpr, f"{W}sz")
        sz.set(f"{W}val", "28")
        text_node = etree.SubElement(run, f"{W}t")
        text_node.set(XML_SPACE, "preserve")
        text_node.text = spec["placeholder"]

    return specs


def collect_used_image_targets(zf, parsed) -> set[str]:
    """Return media filenames still referenced by remaining drawings."""
    used_rids = set()
    for tree in parsed.values():
        for blip in tree.iter(f"{A}blip"):
            rid = blip.get(f"{R}embed")
            if rid:
                used_rids.add(rid)

    used_targets = set()
    for name in zf.namelist():
        if not name.endswith(".rels") or "/_rels/" not in name:
            continue
        rels = etree.fromstring(zf.read(name))
        for rel in rels:
            rid = rel.get("Id")
            typ = rel.get("Type") or ""
            if rid in used_rids and typ.endswith("/image"):
                target = rel.get("Target")
                if target:
                    used_targets.add(target.split("/")[-1])
    return used_targets


def strip_unused_media(zf, xml_map: dict[str, bytes], keep_names: set[str]) -> dict[str, bytes | None]:
    """Drop word/media parts and image relationships that the template no longer uses."""
    updates = dict(xml_map)
    for name in zf.namelist():
        if name.startswith("word/media/") and Path(name).name not in keep_names:
            updates[name] = None

    for name in zf.namelist():
        if not (name.endswith(".rels") and "/_rels/" in name):
            continue
        rels = etree.fromstring(zf.read(name))
        changed = False
        for rel in list(rels):
            typ = rel.get("Type") or ""
            target = rel.get("Target") or ""
            if typ.endswith("/image") and target.split("/")[-1] not in keep_names:
                rels.remove(rel)
                changed = True
        if changed:
            updates[name] = etree.tostring(rels, xml_declaration=True, encoding="UTF-8", standalone=True)
    return updates


def rewrite_package(src: Path, dst: Path, xml_map: dict[str, bytes | None]) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    tmp = dst.with_suffix(".tmp.docx")
    with zipfile.ZipFile(src, "r") as zin, zipfile.ZipFile(tmp, "w") as zout:
        for item in zin.infolist():
            if item.filename in xml_map and xml_map[item.filename] is None:
                continue
            data = xml_map.get(item.filename, zin.read(item.filename))
            zout.writestr(item, data)
    tmp.replace(dst)


def load_replacements(path: Path) -> list[tuple[str, str]]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict) or not raw:
        raise SystemExit("Replacements JSON must be a non-empty object of {original: placeholder}")
    # Longer strings first so a short title does not match inside a longer sentence.
    pairs = sorted(raw.items(), key=lambda item: len(item[0]), reverse=True)
    return [(old, new) for old, new in pairs if old and new]


def extract_template(source: Path, output: Path, meta_path: Path, replacements: list[tuple[str, str]]) -> dict:
    xml_names = ["word/document.xml"]
    with zipfile.ZipFile(source) as zf:
        xml_names.extend(name for name in zf.namelist() if name.startswith("word/header") and name.endswith(".xml"))
        xml_names.extend(name for name in zf.namelist() if name.startswith("word/footer") and name.endswith(".xml"))
        parsed = {name: etree.fromstring(zf.read(name)) for name in xml_names}

    replacement_counts = {}
    for old, new in replacements:
        total = sum(replace_all_in_tree(tree, old, new) for tree in parsed.values())
        replacement_counts[old[:24]] = total
        if total == 0:
            print(f"Warning: not found: {old[:40]!r}")

    image_specs = replace_inline_images(parsed["word/document.xml"])

    with zipfile.ZipFile(source) as zf:
        keep_images = collect_used_image_targets(zf, parsed)
        xml_map = {
            name: etree.tostring(tree, xml_declaration=True, encoding="UTF-8", standalone=True)
            for name, tree in parsed.items()
        }
        xml_map = strip_unused_media(zf, xml_map, keep_images)
        rewrite_package(source, output, xml_map)

    meta = {
        "images": {item["name"]: {"width_cm": item.get("width_cm")} for item in image_specs},
        "replacements": replacement_counts,
    }
    meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    return meta


def main():
    parser = argparse.ArgumentParser(description="Extract a .docx template using a caller-supplied replacement map")
    parser.add_argument("source", help="Filled .docx used as the layout source")
    parser.add_argument("--replacements", required=True, help="UTF-8 JSON object: original text -> {{placeholder}}")
    parser.add_argument("--output", required=True, help="Output template .docx path")
    parser.add_argument("--meta", default=None, help="Output meta JSON path")
    args = parser.parse_args()

    source = Path(args.source).resolve()
    if not source.exists():
        print(f"Error: source not found: {source}")
        raise SystemExit(1)

    replacements = load_replacements(Path(args.replacements))
    output = Path(args.output).resolve()
    meta_path = Path(args.meta).resolve() if args.meta else output.with_name(output.stem + ".meta.json")
    meta = extract_template(source, output, meta_path, replacements)
    print(f"Template written: {output}")
    print(f"Meta written: {meta_path}")
    print(f"Inline images converted: {list(meta['images'])}")


if __name__ == "__main__":
    main()
