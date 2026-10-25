# 启动循环播放 progress_loop.wav（用于等待用户确认时提醒）
# 先停掉已有循环，再后台启动新的独立进程（命令行含 PlayLooping 特征，供 stop-loop.ps1 精确匹配）
$sound = Join-Path $PSScriptRoot "..\sounds\progress_loop.wav"

# 清理旧循环进程
Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" |
  Where-Object { $_.CommandLine -like '*PlayLooping*progress_loop*' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

# 后台启动循环播放进程（hold 30 分钟，等待被 stop 脚本终止）
$cmd = "(New-Object Media.SoundPlayer '$sound').PlayLooping(); Start-Sleep -Seconds 1800"
Start-Process powershell -WindowStyle Hidden -ArgumentList @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', $cmd)
