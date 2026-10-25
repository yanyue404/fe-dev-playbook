# docx-template

按 `.docx` 模板生成或修改版式不固定的 Word 文档。文本占位符写作 `{{变量名}}`，图片占位符写作 `{{img_图片名}}`。

Fill or edit a Word document from a `.docx` template. This directory is a [Cursor Agent Skill](https://cursor.com/docs/skills); the scripts also run on their own.

内置示例是一份虚构周报，不含真实机构或个人信息。安装方式见仓库 [README](../README.md)。

## 环境

Python 3.10+。在本目录执行：

```bash
pip install -r requirements.txt
```

依赖为 python-docx、docxtpl、pillow、lxml。未预先安装时，脚本会用当前解释器尝试 `pip install`。

下面的命令都在 `docx-template/` 目录下执行。JSON 里的图片路径相对于当前工作目录。

## 占位符

| 类型 | 语法 | 示例 | 填写内容 |
| --- | --- | --- | --- |
| 文本 | `{{name}}` | `{{文档标题}}` | 字符串 |
| 图片 | `{{img_name}}` | `{{img_附图}}` | 图片文件路径 |

占位符要落在同一个 Word run 里，否则 Jinja2 读不到。扫描范围包括正文、表格、页眉页脚和文本框。

图片宽度读模板旁边的 `<模板名>.meta.json`，字段是 `images.<图片名>.width_cm`。没有这项时按 150mm 宽，并按裁掉近白边后的比例计算高度。未提供图片时写入 `[待插入图片: xxx]`，生成不会因此中断。未提供的文本写入 `[待填写: xxx]`。

## 生成

```bash
python scripts/generate.py assets/templates/weekly_report_template.docx --scan-only

python scripts/generate.py assets/templates/weekly_report_template.docx --text-data-file assets/examples/sample_text.json --img-data-file assets/examples/sample_img.json --output assets/examples/out.docx
```

| 参数 | 作用 |
| --- | --- |
| `--scan-only` | 只列出占位符 |
| `--text-data` / `--text-data-file` | 文本 JSON，键是占位符名 |
| `--img-data` / `--img-data-file` | 图片 JSON，键是去掉 `img_` 后的名字 |
| `--output` | 输出路径。省略时写到模板同目录，文件名加 `_generated` |
| `--open` | 用系统默认程序打开结果 |

中文或较长 JSON 写进文件再传，避免命令行转义。短 JSON 可以直接写 `--text-data "{\"文档标题\":\"示例\"}"`。

## 修改已有文档

未指定 `--output` 时覆盖原文件。

```bash
python scripts/modify.py <文件.docx> --scan

python scripts/modify.py <文件.docx> --fill-data-file <fill.json> --output <输出.docx>

python scripts/modify.py <文件.docx> --replace-file <replace.json> --output <输出.docx>
```

重填 JSON 里，图片键保留 `img_` 前缀，例如 `"img_附图": "assets/examples/sample_figure.png"`。文本替换 JSON 是 `{ "原文": "新文本" }`，替换发生在 run 内，以保留该处原有格式。

## 从已填文档抽出模板

替换表由调用者提供。仓库里的 `assets/examples/replacements.example.json` 只说明格式：左侧是文档中的原文，右侧是 `{{占位符}}`。

```bash
python scripts/extract_template.py <已填.docx> --replacements <map.json> --output <模板.docx>
```

正文里的嵌入图片会换成 `{{img_图片N}}`，宽度写入旁边的 `.meta.json`。可用 `--meta` 指定这份 JSON 的路径。

## 重新生成内置示例

```bash
python scripts/build_example_template.py
```

这会重写虚构周报模板、占位符清单、图片宽度和 `assets/examples/sample_figure.png`。

## 许可

[MIT](../LICENSE)
