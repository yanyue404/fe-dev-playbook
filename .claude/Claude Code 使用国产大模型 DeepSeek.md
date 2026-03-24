### Windows 下安装 Claude Code

官方文档：<https://code.claude.com/docs/zh-CN/overview>

在 PowerShell 执行：

```powershell
irm https://claude.ai/install.ps1 | iex
```

安装成功后通常会看到：

- `Claude Code successfully installed`
- 版本号（例如 `2.1.81`）
- 安装路径（例如 `C:\Users\Administrator\.local\bin\claude.exe`）

---

### 为什么国内可能直接用不了

直接运行 `claude` 时，可能出现类似报错：

```text
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com
```

这是因为默认连接的是 Anthropic 官方服务，在部分网络环境下不可用。  
解决思路：把 Claude Code 的模型服务切到可用的国产模型（如 DeepSeek）。

---

### API 配置: 使用 cc-switch（推荐）

[cc-switch](https://github.com/farion1231/cc-switch)  是一个便捷的工具，可以快速切换 Claude Code 的 API 配置。

前往  [cc-switch GitHub Releases](https://github.com/farion1231/cc-switch/releases)  页面下载最新版本的安装包。

启动 cc-switch，点击右上角  **"+"** ，选择预设的 DeepSeek 供应商，并填写您的 DeepSeek API Key。

### 使用 DeepSeek 的完整步骤（新手版）

#### 1）准备 API Key

1. 打开 DeepSeek 平台：<https://platform.deepseek.com/usage>
2. 注册并登录账号
3. 创建并复制 API Key

然后在 Claude Code / CC-Switch 的模型配置里填入这个 Key。

#### 2）先充值，避免 402 报错

DeepSeek 是按量计费，不充值通常会报余额不足：

```text
API Error: 402 {"error":{"message":"Insufficient Balance"}}
```

建议先充值 `10-50` 元做测试（支付宝/微信均可）。

#### 3）设置模型名称

在 CC-Switch 图形界面里，把模型名配置为：(更适合纯代码任务、更省钱)

```text
deepseek-coder
```

配置完成后点击“添加”并保存。

#### 4）启用该配置

回到 CC-Switch 首页，点击“启用”。

#### 5）补充 `.claude.json`（建议）

在用户目录创建或编辑 `.claude.json`：

- macOS / Linux：`~/.claude.json`
- Windows：`C:\Users\你的用户名\.claude.json`

内容示例：

```json
{
  "hasCompletedOnboarding": true
}
```

#### 6）启动并验证

进入你的项目目录，运行：

```powershell
claude
```

随便输入一个问题（例如“分析下当前项目并给修改建议”），能正常返回内容就说明配置成功。

---

### 常见问题速查

- **有 Key 但还是报错**：先查余额，很多时候是没充值或余额用完。
- **模型无响应**：确认当前启用的是你刚配置的 DeepSeek 项。
- **配置不生效**：重开终端后再执行 `claude`，并检查 `.claude.json` 路径是否正确。

---

### 参考

- https://platform.minimaxi.com/docs/guides/text-ai-coding-tools#windows
