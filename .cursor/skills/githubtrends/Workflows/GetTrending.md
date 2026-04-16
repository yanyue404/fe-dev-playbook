# GetTrending Workflow

获取GitHub trending项目列表的工作流程。

## Description

这个工作流使用 GetTrending.ts 工具从GitHub获取当前最热门的项目列表，支持按时间周期（每日/每周）和编程语言筛选。

## When to Use

当用户请求以下任何内容时使用此工作流：
- "show github trends" / "github trending"
- "显示热门项目" / "看看有什么热门项目"
- "weekly trending" / "本周热门项目"
- "daily trending" / "今日热门项目"
- "TypeScript trending" / "Python trending" / 按语言筛选
- "what's hot on github" / "github上什么最火"

## Workflow Steps

### Step 1: 确定参数
向用户确认或推断以下参数：
- **时间周期**: daily (每日) 或 weekly (每周，默认)
- **编程语言**: 可选（如 TypeScript, Python, Go, Rust等）
- **项目数量**: 默认10个

### Step 2: 执行工具
运行 GetTrending.ts 工具：

```bash
# 基本用法（本周，全部语言，10个项目）
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly

# 指定语言
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --language=TypeScript

# 指定数量
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts weekly --limit=20

# 组合参数
bun ~/.claude/skills/GitHubTrends/Tools/GetTrending.ts daily --language=Python --limit=15
```

### Step 3: 显示结果
工具会自动格式化输出，包括：
- 项目排名
- 项目名称
- Star总数和周期内增长
- 编程语言
- 项目描述
- GitHub URL

### Step 4: 后续操作（可选）
根据用户需求，可以：
- 打开某个项目页面
- 使用其他skill进一步分析项目
- 将结果保存到文件供后续参考

## Integration with Other Skills

- **OSINT**: 在调查技术栈时发现热门工具
- **Research**: 研究特定语言生态系统的趋势
- **Browser**: 打开项目页面进行详细分析

## Notes

- 数据每小时更新一次
- 无需GitHub API token
- 使用公开的GitHub trending页面
- 支持的语言参数不区分大小写