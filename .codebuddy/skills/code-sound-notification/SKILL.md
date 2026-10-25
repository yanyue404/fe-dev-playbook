---
name: setup-sound-notifications
description: Windows 环境下的代码助手声音通知系统。等待用户确认时循环播放提醒音，任务完成时播放庆祝音。用于管理（启用/禁用/调整）声音通知配置。
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Glob
---

# 代码助手声音通知（Windows 版）

在 CodeBuddy / Claude Code 会话中提供音频反馈：等待输入时循环提醒，任务完成时庆祝。

## 声音资源

SND01 "sine" 音效包（snd.dev，正弦波设计）。文件已内置在本 skill 中，**无需下载**：

- `sounds/progress_loop.wav` — 等待用户确认时的循环提醒音
- `sounds/celebration.wav` — 任务完成庆祝音

## 当前配置（Windows 已安装）

音频文件：`~\.codebuddy\skills\code-sound-notification\sounds\`
播放脚本：`~\.codebuddy\skills\code-sound-notification\scripts\`
Hooks 配置：`~\.claude\settings.json` 的 `hooks` 字段

### 事件与行为

| Hook 事件 | 触发时机 | 行为 |
|-----------|---------|------|
| `Notification` | 助手需要用户确认/输入 | `start-loop.ps1` 后台循环播放 progress_loop |
| `PostToolUse` | 用户批准、工具执行后 | `stop-loop.ps1` 停止循环 |
| `UserPromptSubmit` | 用户提交新消息 | `stop-loop.ps1` 停止循环 |
| `Stop` | 助手完成回复 | `celebrate.ps1` 停循环 + 播放一次 celebration |

### 脚本原理（Windows 实现）

- 播放：`System.Media.SoundPlayer`（PowerShell 内置，wav 原生支持）
- 循环：独立后台 powershell 进程执行 `PlayLooping()` + `Start-Sleep 1800` 挂住
- 停止：`Get-CimInstance` 按命令行特征 `*PlayLooping*progress_loop*` **精确匹配**循环进程后 `Stop-Process`（不会误杀其他 powershell）

## 手动操作

### 验证声音

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "$HOME\.codebuddy\skills\code-sound-notification\scripts\celebrate.ps1"
```

应听到庆祝音。重启 CodeBuddy / Claude Code 后 hooks 生效。

### 停止声音通知（停用本功能）

本功能默认开启。要停止使用，删除 `~\.claude\settings.json`（及 `~\.codebuddy\settings.json`，若已镜像配置）中的 `hooks` 字段，然后重启 CodeBuddy / Claude Code 生效。

若只是想临时停用，把 `hooks` 字段整段注释掉或备份改名（如 `settings.json.bak`）即可，之后恢复回来就重新启用。

### 调整循环时长

`start-loop.ps1` 中 `Start-Sleep -Seconds 1800`（默认 30 分钟自动停止兜底）。

### 彻底卸载

删除两个 settings.json 的 `hooks` 字段，删除本 skill 目录，重启生效。

## 注意事项

- 仅支持 Windows（PowerShell 5+）；macOS/Linux 需换用 afplay/aplay
- hooks 全局生效（所有项目的会话）
- 若与其他 skill 的 hooks 共存，合并时只追加条目，勿整段覆盖
