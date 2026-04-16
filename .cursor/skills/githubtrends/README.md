# GitHubTrends Skill

**快速发现GitHub上最受欢迎的开源项目，生成可视化仪表板！**

## 功能特性

### 基础功能
- ✅ 获取每日/每周热门项目列表
- ✅ 按编程语言筛选（TypeScript, Python, Go, Rust等）
- ✅ 自定义返回项目数量
- ✅ 显示Star总数和周期增长
- ✅ 无需GitHub API token

### 可视化仪表板 🆕
- ✨ **交互式HTML** - 生成交互式网页仪表板
- 📊 **数据可视化** - 语言分布饼图、Stars增长柱状图
- 📰 **技术新闻** - 集成 Hacker News 最新资讯
- 🔍 **实时筛选** - 按语言筛选、排序、搜索
- 📱 **响应式设计** - 支持桌面、平板、手机
- 🎨 **美观界面** - Tailwind CSS + GitHub 风格

## 快速开始

### 查看本周热门项目（默认）

```bash
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly
```

### 查看今日热门项目

```bash
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts daily
```

### 按语言筛选

```bash
# TypeScript热门项目
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --language=TypeScript

# Python热门项目
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --language=Python

# Go热门项目
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly -l=Go
```

### 指定返回数量

```bash
# 返回20个项目
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --limit=20

# 组合使用：返回15个TypeScript项目
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --language=TypeScript --limit=15
```

---

## 生成可视化仪表板 🆕

### 基本用法

```bash
# 生成本周趋势仪表板（默认）
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts
```

### 包含技术新闻

```bash
# 生成包含 Hacker News 的仪表板
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts --include-news
```

### 高级选项

```bash
# 生成 TypeScript 项目每日仪表板，包含 15 条新闻
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts \
  --period daily \
  --language TypeScript \
  --limit 20 \
  --include-news \
  --news-count 15 \
  --output ~/Downloads/ts-daily-trends.html
```

### 仪表板功能

生成的 HTML 文件包含：
- **统计概览** - 总项目数、总 stars、top 项目
- **语言分布图** - 饼图展示各语言占比
- **Stars 增长图** - 柱状图展示增长趋势
- **项目卡片** - 美观的卡片式项目展示
- **技术新闻** - Hacker News 最新资讯
- **交互功能** - 筛选、排序、搜索
- **响应式** - 自适应各种屏幕尺寸

---

## 输出示例

```markdown
# GitHub Trending Projects - Weekly (2026-01-19)

📊 **Total:** 10 projects | **Language:** All | **Period:** Weekly

---

## 1. vercel/next.js - ⭐ 125,342 (+1,234 this week)
**Language:** TypeScript
**Description:** The React Framework for the Web
**URL:** https://github.com/vercel/next.js

## 2. microsoft/vscode - ⭐ 160,890 (+987 this week)
**Language:** TypeScript
**Description:** Visual Studio Code
**URL:** https://github.com/microsoft/vscode

...
```

## 参数说明

| 参数 | 说明 | 默认值 | 可选值 |
|------|------|--------|--------|
| `period` | 时间周期 | `weekly` | `daily`, `weekly` |
| `--language` | 编程语言筛选 | 全部 | TypeScript, Python, Go, Rust, Java等 |
| `--limit` | 返回项目数量 | 10 | 任意正整数 |

## 支持的语言

常用的编程语言都可以作为筛选条件：
- **TypeScript** - TypeScript项目
- **JavaScript** - JavaScript项目
- **Python** - Python项目
- **Go** - Go语言项目
- **Rust** - Rust项目
- **Java** - Java项目
- **C++** - C++项目
- **Ruby** - Ruby项目
- **Swift** - Swift项目
- **Kotlin** - Kotlin项目

## Skill 触发词

当你说以下任何内容时，这个skill会被触发：

- "show github trends" / "github trending"
- "显示热门项目" / "看看有什么热门项目"
- "weekly trending" / "本周热门项目"
- "daily trending" / "今日热门项目"
- "TypeScript trending" / "Python trending"
- "what's hot on github" / "github上什么最火"

## 技术实现

- **数据源**: GitHub官方trending页面 (https://github.com/trending)
- **解析方式**: HTML解析提取项目信息
- **认证**: 无需GitHub API token
- **更新频率**: 每小时更新一次

## 目录结构

```
~/.claude/skills/GitHubTrends/
├── SKILL.md              # Skill主文件
├── README.md             # 使用文档（本文件）
├── Tools/
│   └── GetTrending.ts    # 获取trending数据的工具
└── Workflows/
    └── GetTrending.md    # 工作流文档
```

## 注意事项

1. **网络要求**: 需要能访问GitHub官网
2. **更新频率**: 数据每小时更新，不是实时
3. **解析准确性**: GitHub页面结构变化可能影响解析，如遇问题请检查 `/tmp/github-trending-debug-*.html`
4. **语言参数**: 不区分大小写，`--language=typescript` 和 `--language=TypeScript` 效果相同

## 已知问题

- GitHub trending页面的HTML结构复杂，某些项目的URL和名称可能解析不完整
- 如果GitHub页面结构变化，工具可能需要更新解析逻辑

## 未来改进

- [ ] 支持保存历史数据用于趋势分析
- [ ] 按stars范围筛选（1k+, 10k+, 100k+）
- [ ] 更智能的HTML解析（使用HTML解析库而非正则）
- [ ] 集成到其他skill的自动化工作流

## 贡献

如果发现问题或有改进建议，欢迎提出！

---

**Made with ❤️ by 老王**