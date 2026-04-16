---
name: GitHubTrends
description: 显示GitHub热门项目趋势，生成可视化仪表板。USE WHEN github trends, trending projects, hot repositories, popular github projects, generate dashboard, create webpage.
version: 2.0.0
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/skills/CORE/USER/SKILLCUSTOMIZATIONS/GitHubTrends/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

# GitHubTrends - GitHub热门项目趋势

**快速发现GitHub上最受欢迎的开源项目。**

---

## Philosophy

GitHub trending是发现优质开源项目的最佳途径。这个skill让老王我能快速获取当前最热门的项目列表，按时间周期（每日/每周）和编程语言筛选，帮助发现值得学习和贡献的项目。

---

## Quick Start

```bash
# 查看本周最热门的项目（默认）
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly

# 查看今日最热门的项目
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts daily

# 按语言筛选
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --language=TypeScript
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --language=Python

# 指定显示数量
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --limit=20
```

---

## When to Use This Skill

**Core Triggers - Use this skill when user says:**

### Direct Requests
- "show github trends" 或 "github trending"
- "显示热门项目" 或 "看看有什么热门项目"
- "what's trending on github" 或 "github hot projects"
- "本周热门项目" 或 "weekly trending"
- "今日热门项目" 或 "daily trending"

### Discovery Requests
- "discover popular projects" 或 "发现热门项目"
- "show repositories trending" 或 "显示trending仓库"
- "github上什么最火" 或 "what's hot on github"
- "找点好项目看看" 或 "find good projects"

### Language-Specific
- "TypeScript trending projects" 或 "TypeScript热门项目"
- "Python trending" 或 "Python热门项目"
- "show trending Rust projects" 或 "显示Rust热门项目"
- "Go语言热门项目" 或 "trending Go projects"

### Dashboard & Visualization
- "生成 GitHub trending 仪表板" 或 "generate trending dashboard"
- "创建趋势网页" 或 "create trending webpage"
- "生成交互式报告" 或 "generate interactive report"
- "export trending dashboard" 或 "导出仪表板"
- "可视化 GitHub 趋势" 或 "visualize github trends"

---

## Core Capabilities

### 获取趋势列表
- **每日趋势** - 过去24小时最热门项目
- **每周趋势** - 过去7天最热门项目（默认）
- **语言筛选** - 按编程语言过滤（TypeScript, Python, Go, Rust等）
- **自定义数量** - 指定返回项目数量（默认10个）

### 生成可视化仪表板 🆕
- **交互式HTML** - 生成交互式网页仪表板
- **数据可视化** - 语言分布饼图、Stars增长柱状图
- **技术新闻** - 集成 Hacker News 技术资讯
- **实时筛选** - 按语言筛选、排序、搜索功能
- **响应式设计** - 支持桌面、平板、手机

### 项目信息
- 项目名称和描述
- Star数量和变化
- 编程语言
- 项目URL

---

## Tool Usage

### GetTrending.ts

**Location:** `Tools/GetTrending.ts`

**功能：** 从GitHub获取trending项目列表

**参数：**
- `period` - 时间周期：`daily` 或 `weekly`（默认：weekly）
- `--language` - 编程语言筛选（可选）
- `--limit` - 返回项目数量（默认：10）

**使用示例：**
```bash
# 基本用法
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly

# 带参数
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --language=TypeScript --limit=15

# 简写
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts daily -l=Python
```

**实现方式：**
使用 GitHub官方trending页面：https://github.com/trending
通过 fetch API 读取页面内容并解析

---

### GenerateDashboard.ts 🆕

**Location:** `Tools/GenerateDashboard.ts`

**功能：** 生成交互式数据可视化仪表板HTML文件

**参数：**
- `--period` - 时间周期：`daily` 或 `weekly`（默认：weekly）
- `--language` - 编程语言筛选（可选）
- `--limit` - 返回项目数量（默认：10）
- `--include-news` - 包含技术新闻
- `--news-count` - 新闻数量（默认：10）
- `--output` - 输出文件路径（默认：./github-trends.html）

**使用示例：**
```bash
# 基本用法 - 生成本周仪表板
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts

# 包含技术新闻
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts --include-news

# TypeScript 项目每日仪表板
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts \
  --period daily \
  --language TypeScript \
  --limit 20 \
  --include-news \
  --output ~/ts-daily.html
```

**实现方式：**
- 获取 GitHub trending 项目数据
- 获取 Hacker News 技术新闻
- 使用 Handlebars 模板引擎渲染 HTML
- 集成 Tailwind CSS 和 Chart.js
- 生成完全独立的 HTML 文件（通过 CDN 加载依赖）

---

## Output Format

```markdown
# GitHub Trending Projects - Weekly (2025-01-19)

## 1. vercel/next.js - ⭐ 125,342 (+1,234 this week)
**Language:** TypeScript
**Description:** The React Framework for the Web
**URL:** https://github.com/vercel/next.js

## 2. microsoft/vscode - ⭐ 160,890 (+987 this week)
**Language:** TypeScript
**Description:** Visual Studio Code
**URL:** https://github.com/microsoft/vscode

...

---
📊 Total: 10 projects | Language: All | Period: Weekly
```

---

## Supported Languages

常用编程语言筛选：
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

---

## Workflow Integration

这个skill可以被其他skill调用：
- **OSINT** - 在调查技术栈时发现热门工具
- **Research** - 研究特定语言生态系统的趋势
- **System** - 发现有用的PAI相关项目

---

## Technical Notes

**数据来源：** GitHub官方trending页面
**更新频率：** 每小时更新一次
**无需认证：** 使用公开页面，无需GitHub API token
**解析方式：** 通过HTML解析提取项目信息

**错误处理：**
- 网络错误会显示友好提示
- 解析失败会返回原始HTML供调试
- 支持的语言参数不区分大小写

---

## Future Enhancements

可能的未来功能：
- 支持月度趋势（如果GitHub提供）
- 按stars范围筛选（1k+, 10k+, 100k+）
- 保存历史数据用于趋势分析
- 集成到其他skill的自动化工作流

---

## Voice Notification

**When executing a workflow, do BOTH:**

1. **Send voice notification:**
   ```bash
   curl -s -X POST http://localhost:8888/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Running the GitHubTrends workflow"}' \
     > /dev/null 2>&1 &
   ```

2. **Output text notification:**
   ```
   Running the **GitHubTrends** workflow...
   ```

**Full documentation:** `~/.claude/skills/CORE/SkillNotifications.md`