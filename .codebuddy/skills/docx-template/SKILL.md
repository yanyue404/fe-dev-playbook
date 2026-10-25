---
name: docx-template
description: 根据用户提供的 .docx 模板扫描 {{变量名}} 与 {{img_图片名}}，填写后生成或修改版式不固定的 Word 文档。当用户要按模板生成文档、填充占位符、修改已有 docx，或提到 docx 模板、word 模板时使用。
---

# Docx Template

## Overview

按用户给出的 `.docx` 模板生成或修改 Word 文档。版式、栏目都由模板决定，不预设固定文种。文本占位符写作 `{{变量名}}`，图片占位符写作 `{{img_图片名}}`（下划线，兼容 Jinja2）。

内置示例是一份虚构周报，只用来演示命令：

- 模板：`assets/templates/weekly_report_template.docx`
- 图片尺寸：`assets/templates/weekly_report_template.meta.json`
- 占位符清单：`assets/templates/placeholders.txt`
- 示例数据：`assets/examples/sample_text.json`

若用户给出的是已填好的文档而不是模板，用 `scripts/extract_template.py`。替换表只使用用户给出的原文。在原文档上替换，以保留版式。

## Workflow Decision Tree

```
用户要处理 Word 模板 → 判断意图
  ├── 按模板生成新文档 → 生成流程
  └── 改已有文档 → 修改流程
```

## Generate Flow (生成流程)

### Step 1: 获取模板文件路径

向用户要 `.docx` 模板的完整路径。文件必须存在且为 `.docx`。用户没准备模板、只想看流程时，用内置的 `assets/templates/weekly_report_template.docx`。

### Step 2: 扫描占位符

```bash
python scripts/generate.py --scan-only <template_path>
```

向用户展示：

- **Text Placeholders**: `{{变量名}}` — 文本
- **Image Placeholders**: `{{img_图片名}}` — 图片文件路径

### Step 3: 收集用户数据

逐个询问，或接受用户一次性给出的 JSON。

- 文本：用户提供的字符串
- 图片：
  1. 对话里上传的图片（如 `@image:xxx.hash.png`），到 `%TEMP%` 里按文件名查找
  2. 用户给出的本地路径，直接使用
  3. 两者都没有时，再问路径
  4. 用户说「跳过 / 没有 / 暂不提供」时，写入 `[待插入图片: xxx]`

整理为：

- text_data: `{"变量名1": "值1"}`
- img_data: `{"图片名1": "/path/to/image.png"}`

### Step 4: 生成文档

中文或较长 JSON 写入文件再传入，避免命令行转义：

```bash
python scripts/generate.py <template_path> --text-data-file <text.json> --img-data-file <img.json> --output <output_path> --open
```

短 JSON 也可以直接传入：

```bash
python scripts/generate.py <template_path> --text-data '{"文档标题":"示例"}' --output <output_path> --open
```

- `--output`：用户指定的输出路径；未指定时，保存在模板同目录，文件名加 `_generated`
- `--open`：完成后用系统默认程序打开
- 图片宽度读模板同名 `.meta.json` 里的 `images.<name>.width_cm`；没有这项时按 150mm 宽，并按裁边后的比例算高度

演示命令：

```bash
python scripts/generate.py assets/templates/weekly_report_template.docx --text-data-file assets/examples/sample_text.json --img-data-file assets/examples/sample_img.json --output assets/examples/out.docx
```

### Step 5: 确认与反馈

告诉用户生成成功，并给出输出文件路径。

## Modify Flow (修改流程)

用户要改已有文档时，先确认方式：

- **a. 占位符重填**：`scripts/modify.py --fill-data` 或 `--fill-data-file`
- **b. 文本替换**：`scripts/modify.py --replace` 或 `--replace-file`

### 占位符重填 (a)

```bash
python scripts/modify.py <docx_path> --fill-data-file <fill.json> --output <output_path> --open
```

fill JSON 里，图片键带 `img_` 前缀，例如 `"img_附图": "/path/to/image.png"`。

### 文本替换 (b)

```bash
python scripts/modify.py <docx_path> --replace-file <replace.json> --output <output_path> --open
```

- `--output`：未指定时覆盖原文件。覆盖前告诉用户
- `--open`：完成后打开文件

### 扫描残留占位符

```bash
python scripts/modify.py <docx_path> --scan
```

## Script Reference

| Script | Purpose | Key Commands |
|--------|---------|-------------|
| `scripts/generate.py` | 按模板生成文档 | `--scan-only`；`--text-data` / `--text-data-file`；`--img-data` / `--img-data-file`；`--output`；`--open` |
| `scripts/modify.py` | 修改已有文档 | `--scan`；`--fill-data` / `--fill-data-file`；`--replace` / `--replace-file`；`--output`；`--open` |
| `scripts/extract_template.py` | 从已填文档抽出模板 | 必填 `--replacements`（用户提供的原文到占位符映射）；`--output`；可选 `--meta` |
| `scripts/utils.py` | 共享工具 | 依赖检测与安装、占位符扫描（含页眉与文本框）、路径解析、打开文件 |

## Dependencies

- Python 3.10+
- python-docx、docxtpl、pillow、lxml。可预先执行 `pip install -r requirements.txt`（相对本技能目录）；未安装时，脚本启动时会用当前解释器自动安装

## Placeholder Syntax Summary

| Type | Syntax | Example | Value to Provide |
|------|--------|---------|------------------|
| Text | `{{name}}` | `{{文档标题}}` | 纯文本字符串 |
| Image | `{{img_name}}` | `{{img_附图}}` | 图片文件的完整路径 |

## Important Notes

- 扫描覆盖正文、表格、页眉页脚和文本框。占位符必须落在同一个 run 内，否则 Jinja2 无法渲染
- 模板里的 `{{img_xxx}}` 在 docxtpl 中的键名是 `img_xxx`（带 `img_` 前缀）
- 图片占位符用下划线，因为 Jinja2 不允许变量名里出现冒号
- 图片未提供时写入 `[待插入图片: xxx]`，不中断生成
- 文本替换在 run 级别执行，尽量保留原有格式
- 示例周报里的部门、人名和日期都是虚构的，不要当成用户的真实数据
