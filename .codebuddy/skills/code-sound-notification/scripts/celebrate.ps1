# 任务完成：停止循环 + 播放一次 celebration.wav
$sound = Join-Path $PSScriptRoot "..\sounds\celebration.wav"

# 停掉循环
Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" |
  Where-Object { $_.CommandLine -like '*PlayLooping*progress_loop*' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

# 同步播放庆祝音（约 2 秒）
try { (New-Object Media.SoundPlayer $sound).PlaySync() } catch { }
exit 0
