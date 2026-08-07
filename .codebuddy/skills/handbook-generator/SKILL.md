---
name: handbook-generator
description: 根据用户提供的 .docx 模板文件，扫描 {{变量名}} 和 {{img_图片名}} 占位符后让用户逐个或批量填写数据，生成格式化 handbook 文档；也支持对已有 handbook 进行占位符重填或指定段落文本替换。触发关键词："生成手册"、"修改手册"、"创建手册"、"编辑手册"、"生成 handbook"、"修改 handbook"、"创建 handbook"、"编辑 handbook"、"generate handbook"、"modify handbook"。当用户提到这些关键词时使用此 skill。
---

# Handbook Generator

## Overview

根据用户提供的 .docx 模板文件生成或修改 handbook 文档。模板中使用 `{{变量名}}` 标记文本占位符，使用 `{{img_图片名}}` 标记图片占位符（下划线而非冒号，兼容 Jinja2 语法），脚本扫描后让用户填写数据，最终输出格式化的 .docx 文件。

## Workflow Decision Tree

```
用户触发关键词 → 判断意图
  ├── "生成手册" / "创建手册" / "generate handbook" → 生成流程
  └── "修改手册" / "编辑手册" / "modify handbook" → 修改流程
```

## Generate Flow (生成流程)

### Step 1: 获取模板文件路径

询问用户提供 .docx 模板文件的完整路径。模板文件必须存在且为 .docx 格式。

### Step 2: 扫描占位符

使用 `scripts/generate.py --scan-only <template_path>` 扫描模板中的所有占位符，向用户展示结果列表：

- **Text Placeholders**: `{{变量名}}` — 需用户提供文本值
- **Image Placeholders**: `{{img_图片名}}` — 需用户提供图片文件路径

### Step 3: 收集用户数据

逐个询问用户每个占位符的值：

- 文本占位符：用户直接提供文本内容
- 图片占位符：
  1. 若用户在对话中上传了图片（如 `@image:xxx.hash.png`），自动在 `%TEMP%` 目录（Windows: `C:\Users\Administrator\AppData\Local\Temp`）中搜索该图片文件名获取完整路径
  2. 若用户在对话中提到了本地图片路径，直接使用该路径
  3. 以上都无法获取时，询问用户提供图片路径
  4. 用户说"跳过/没有/暂不提供"则用 `[待插入图片: xxx]` 占位文本代替

将收集到的数据整理为 JSON 格式：
- text_data: `{"变量名1": "值1", "变量名2": "值2"}`
- img_data: `{"图片名1": "D:/path/to/image.png", "图片名2": "D:/path/to/other.png"}`

### Step 4: 生成 handbook

执行生成命令：

```bash
python scripts/generate.py <template_path> --text-data '{"..."}' --img-data '{"..."}' --output <output_path> --open
```

- `--output`: 用户指定输出路径；若未指定，默认保存到模板同目录，文件名加 `_generated` 后缀
- `--open`: 生成完成后自动打开文件

### Step 5: 确认与反馈

向用户确认生成成功，告知输出文件路径。

## Modify Flow (修改流程)

### 判断修改类型

用户说"修改手册"时，确认修改方式：

- **a. 占位符重填**: 使用 `scripts/modify.py --fill-data` 重填模板中的占位符
- **b. 文本替换**: 使用 `scripts/modify.py --replace` 进行指定文本的查找替换

### 占位符重填 (a)

流程同生成流程的 Step 2-4，但使用 `modify.py --fill-data`：

```bash
python scripts/modify.py <docx_path> --fill-data '{"变量名1": "新值1", "img_图片名1": "D:/new/image.png"}' --output <output_path> --open
```

注意 fill_data JSON 中图片变量以 `img_` 为前缀键。

### 文本替换 (b)

用户指定要替换的文本对（旧文本 → 新文本），执行：

```bash
python scripts/modify.py <docx_path> --replace '{"旧文本1": "新文本1", "旧文本2": "新文本2"}' --output <output_path> --open
```

- `--output`: 用户指定输出路径；若未指定，默认覆盖原文件
- `--open`: 修改完成后自动打开文件

### 扫描残留占位符

若用户想查看文档中还有哪些未填充的占位符：

```bash
python scripts/modify.py <docx_path> --scan
```

## Script Reference

| Script | Purpose | Key Commands |
|--------|---------|-------------|
| `scripts/generate.py` | 生成 handbook | `--scan-only` 扫描占位符；`--text-data` / `--img-data` 填充数据；`--output` 输出路径；`--open` 自动打开 |
| `scripts/modify.py` | 修改 handbook | `--scan` 扫描残留占位符；`--fill-data` 重填占位符；`--replace` 文本替换；`--output` 输出路径；`--open` 自动打开 |
| `scripts/utils.py` | 共享工具函数 | 依赖检测/安装、占位符扫描、路径解析、文件打开 |

## Dependencies

脚本首次运行时自动检测并安装 `python-docx` 和 `docxtpl`（无需手动安装）。要求系统有 Python 3.x 环境。

## Placeholder Syntax Summary

| Type | Syntax | Example | Value to Provide |
|------|--------|---------|------------------|
| Text | `{{name}}` | `{{产品名称}}` | 纯文本字符串 |
| Image | `{{img_name}}` | `{{img_产品示意图}}` | 图片文件的完整路径 |

## Important Notes

- 模板中的 `{{img_xxx}}` 占位符在 docxtpl 渲染时对应键名为 `img_xxx`（带 img_ 前缀）
- 图片占位符使用下划线而非冒号，因为 Jinja2 不允许冒号出现在变量名中
- 图片未提供时，生成 `[待插入图片: xxx]` 占位文本，不会报错
- 文本替换在 run 级别执行，尽量保留原有格式样式
- 修改模式下未指定 `--output` 时默认覆盖原文件，提醒用户注意
