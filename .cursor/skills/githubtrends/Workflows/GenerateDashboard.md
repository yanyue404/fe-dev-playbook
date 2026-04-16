# GenerateDashboard Workflow

生成交互式数据可视化仪表板的工作流程。

## Description

这个工作流使用 GenerateDashboard.ts 工具从 GitHub 获取 trending 项目，并生成交互式 HTML 仪表板，支持：
- 项目卡片展示
- 语言分布饼图
- Stars 增长柱状图
- 技术新闻列表
- 实时筛选、排序、搜索功能

## When to Use

当用户请求以下任何内容时使用此工作流：
- "生成 GitHub trending 仪表板"
- "创建趋势网页"
- "生成可视化报告"
- "export trending dashboard"
- "生成交互式网页"

## Workflow Steps

### Step 1: 确定参数
向用户确认或推断以下参数：
- **时间周期**: daily (每日) 或 weekly (每周，默认)
- **编程语言**: 可选（如 TypeScript, Python, Go, Rust等）
- **项目数量**: 默认10个
- **包含新闻**: 是否包含技术新闻
- **新闻数量**: 默认10条
- **输出路径**: 默认 ./github-trends.html

### Step 2: 执行工具
运行 GenerateDashboard.ts 工具：

```bash
# 基本用法（本周，10个项目）
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts

# 指定语言和新闻
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts \
  --period weekly \
  --language TypeScript \
  --limit 20 \
  --include-news \
  --news-count 15 \
  --output ~/trends.html

# 每日趋势
bun ~/.claude/skills/GitHubTrends/Tools/GenerateDashboard.ts \
  --period daily \
  --output ~/daily-trends.html
```

### Step 3: 显示结果
工具会自动：
1. 获取 GitHub trending 数据
2. 获取技术新闻（如果启用）
3. 分析数据生成统计信息
4. 渲染 HTML 模板
5. 保存到指定路径

### Step 4: 验证和打开
生成的 HTML 文件包含：
- ✅ 响应式布局
- ✅ 项目卡片展示
- ✅ 语言分布饼图
- ✅ Stars 增长柱状图
- ✅ 实时筛选功能
- ✅ 排序功能
- ✅ 搜索功能
- ✅ 技术新闻列表

## Example Usage

### Example 1: 基本仪表板
```
User: "生成本周 GitHub trending 仪表板"

Assistant:
运行 GenerateDashboard 工具...
[执行命令，生成 /tmp/github-trends.html]
✅ 仪表板生成成功！已在浏览器中打开。
```

### Example 2: 包含新闻的仪表板
```
User: "生成 TypeScript 项目的每日趋势，包含新闻"

Assistant:
生成 TypeScript 每日趋势仪表板，包含技术新闻...
[执行命令：--period daily --language TypeScript --include-news]
✅ 仪表板已生成到 ~/Downloads/ts-daily-trends.html
```

### Example 3: 自定义输出
```
User: "生成一个包含 20 个项目的仪表板，保存到桌面"

Assistant:
生成 20 个项目的趋势仪表板...
[执行命令：--limit 20 --output ~/Desktop/github-trends.html]
✅ 完成！文件已保存到桌面
```

## Tool Options

| 参数 | 说明 | 默认值 | 可选值 |
|------|------|--------|--------|
| `--period` | 时间周期 | `weekly` | `daily`, `weekly` |
| `--language` | 编程语言筛选 | 全部 | TypeScript, Python, Go, Rust等 |
| `--limit` | 返回项目数量 | 10 | 任意正整数 |
| `--include-news` | 包含技术新闻 | false | - |
| `--news-count` | 新闻数量 | 10 | 任意正整数 |
| `--theme` | 主题 | `auto` | `light`, `dark`, `auto` |
| `--output` | 输出文件路径 | `./github-trends.html` | 任意路径 |

## Output Features

### 数据可视化
- **语言分布饼图**: 展示各编程语言的项目占比
- **Stars 增长柱状图**: 展示前 10 名项目的 stars 增长

### 交互功能
- **搜索**: 按项目名称或描述搜索
- **筛选**: 按编程语言筛选
- **排序**: 按排名、总 stars、周期内增长排序

### 响应式设计
- 支持桌面、平板、手机
- 使用 Tailwind CSS 构建美观界面
- GitHub 风格配色

## Error Handling

如果遇到错误：
1. **网络错误**: 检查网络连接，确保能访问 GitHub
2. **解析失败**: GitHub 页面结构可能变化，工具会显示调试信息
3. **文件写入失败**: 检查输出路径的写权限

## Voice Notification

执行此工作流时发送语音通知：

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "正在生成 GitHub Trending Dashboard..."}' \
  > /dev/null 2>&1 &
```

并输出文本通知：
```
Running the **GenerateDashboard** workflow from the **GitHubTrends** skill...
```

## Integration with Other Skills

- **Browser**: 验证生成的 HTML 页面效果
- **System**: 保存仪表板快照到 MEMORY/
- **OSINT**: 分析技术栈趋势

## Notes

- 数据每小时更新一次（GitHub trending 更新频率）
- 生成的 HTML 是完全独立的，无需服务器
- 所有依赖通过 CDN 加载（Tailwind CSS, Chart.js）
- 支持离线查看（图表已内嵌数据）

## Advanced Usage

### 批量生成
```bash
# 生成多个语言的仪表板
for lang in TypeScript Python Go Rust; do
  bun Tools/GenerateDashboard.ts \
    --language $lang \
    --output ~/trends-$lang.html
done
```

### 定时任务
```bash
# 每小时生成一次快照
# 添加到 crontab:
0 * * * * cd ~/.claude/skills/GitHubTrends && bun Tools/GenerateDashboard.ts --output ~/trends-$(date +%H).html
```

### 定制主题
通过修改 `Templates/dashboard.hbs` 可以自定义：
- 配色方案
- 布局结构
- 添加新的图表类型
- 添加新的交互功能