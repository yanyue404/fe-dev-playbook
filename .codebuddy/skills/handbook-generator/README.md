# Handbook Generator Skill 使用指南

## 目录结构

```
handbook-generator/
├── SKILL.md                 # Skill 描述和完整工作流指令（供 CodeBuddy AI 加载）
├── README.md                # 本文件，人类查阅使用的快速参考
├── scripts/
│   ├── generate.py          # 生成模式（模板填充 → 输出 .docx）
│   ├── modify.py            # 修改模式（占位符重填 / 文本查找替换）
│   └── utils.py             # 共享工具（依赖检测、占位符扫描、路径解析、文件打开）
├── assets/                  # 预留给模板资产文件
└── references/              # 预留给参考文档
```

## 核心功能

### 生成模式

**触发词**：生成手册、创建手册、generate handbook

**流程**：
1. 用户提供 .docx 模板文件路径
2. 脚本扫描模板中所有占位符，展示列表让用户逐个或批量填写
3. 图片占位符：优先从上下文推断 → 推断不了则询问 → 用户跳过则 `[待插入图片: xxx]` 占位
4. 填充生成 .docx 文件，自动打开

**命令**：
```bash
# 扫描占位符
python scripts/generate.py <模板路径> --scan-only

# 生成 handbook
python scripts/generate.py <模板路径> --text-data '{"变量名": "值"}' --img-data '{"图片名": "图片路径"}' --output <输出路径> --open
```

### 修改模式

**触发词**：修改手册、编辑手册、modify handbook

**两种修改方式**：

| 方式 | 说明 | 命令 |
|------|------|------|
| 占位符重填 | 重新填充模板中的 `{{xxx}}` 占位符 | `modify.py --fill-data` |
| 文本替换 | 查找指定文本并替换为新文本 | `modify.py --replace` |

**命令**：
```bash
# 扫描残留占位符
python scripts/modify.py <文件路径> --scan

# 占位符重填
python scripts/modify.py <文件路径> --fill-data '{"变量名": "新值", "img:图片名": "新图片路径"}' --output <输出路径> --open

# 文本替换
python scripts/modify.py <文件路径> --replace '{"旧文本": "新文本"}' --output <输出路径> --open
```

## 占位符语法

| 类型 | 语法 | 示例 | 用户需提供 |
|------|------|------|-----------|
| 文本 | `{{name}}` | `{{产品名称}}` | 纯文本字符串 |
| 图片 | `{{img_name}}` | `{{img_产品示意图}}` | 图片文件的完整路径 |

**注意事项**：
- 图片未提供时，生成 `[待插入图片: xxx]` 占位文本，不会报错
- `--fill-data` JSON 中图片变量键名需要带 `img_` 前缀，如 `"img_产品示意图": "D:/img.png"`
- 图片占位符使用下划线而非冒号，因为 Jinja2 不允许冒号出现在变量名中
- 修改模式下未指定 `--output` 时默认覆盖原文件

## 输出路径规则

- 用户指定 `--output` → 按指定路径保存
- 未指定 → 生成模式默认模板同目录 + `_generated` 后缀；修改模式默认覆盖原文件
- `--open` → 生成/修改完成后自动用系统默认应用打开文件

## 依赖环境

- Python 3.x
- python-docx、docxtpl（脚本首次运行时自动检测并安装，无需手动操作）
