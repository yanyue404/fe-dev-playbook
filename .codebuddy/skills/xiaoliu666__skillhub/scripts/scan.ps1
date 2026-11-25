# scan.ps1 - Scan C drive for large directories
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scan.ps1
# Finds directories > 50MB, sorted by size descending

$ErrorActionPreference = 'SilentlyContinue'

function Get-DirSize {
    param([string]$Path)
    $sum = 0
    Get-ChildItem -Path $Path -Recurse -File -Force -ErrorAction SilentlyContinue |
        ForEach-Object { $sum += $_.Length }
    return $sum
}

function Scan-Dir {
    param([string]$Root, [string]$Label)
    Write-Host ""
    Write-Host "==== $Label : $Root ===="
    if (-not (Test-Path $Root)) {
        Write-Host "(not exist)"
        return
    }
    $results = @()
    Get-ChildItem -Path $Root -Force -Directory -ErrorAction SilentlyContinue | ForEach-Object {
        $size = Get-DirSize -Path $_.FullName
        if ($size -gt 50MB) {
            $results += [PSCustomObject]@{
                Name   = $_.Name
                SizeMB = [math]::Round($size / 1MB, 1)
                SizeGB = [math]::Round($size / 1GB, 2)
                Path   = $_.FullName
            }
        }
    }
    if ($results.Count -eq 0) {
        Write-Host "(no dir > 50MB)"
    }
    else {
        $results | Sort-Object SizeMB -Descending | Format-Table Name, SizeMB, SizeGB, Path -AutoSize
    }
}

# C drive usage
$drive = Get-PSDrive C
$totalGB = [math]::Round($drive.Used / 1GB + $drive.Free / 1GB, 1)
$usedGB = [math]::Round($drive.Used / 1GB, 1)
$freeGB = [math]::Round($drive.Free / 1GB, 1)
$usedPct = [math]::Round($drive.Used / ($drive.Used + $drive.Free) * 100, 1)
Write-Host "==== C Drive Usage ===="
Write-Host ("Total: {0} GB | Used: {1} GB ({2}%) | Free: {3} GB" -f $totalGB, $usedGB, $usedPct, $freeGB)

# D drive target space
$dDrive = Get-PSDrive D -ErrorAction SilentlyContinue
if ($dDrive) {
    $dFreeGB = [math]::Round($dDrive.Free / 1GB, 1)
    Write-Host ("D Drive Free: {0} GB" -f $dFreeGB)
}

# Scan three key directories
Scan-Dir -Root "$env:APPDATA" -Label "AppData\Roaming"
Scan-Dir -Root "$env:LOCALAPPDATA" -Label "AppData\Local"
Scan-Dir -Root "$env:USERPROFILE" -Label "User Profile"

# User profile hidden dot-folders
Write-Host ""
Write-Host "==== User Profile dot-folders ===="
$dotResults = @()
Get-ChildItem -Path $env:USERPROFILE -Force -Directory -Hidden -ErrorAction SilentlyContinue |
    Where-Object { $_.Name.StartsWith('.') } | ForEach-Object {
        $size = Get-DirSize -Path $_.FullName
        if ($size -gt 50MB) {
            $dotResults += [PSCustomObject]@{
                Name   = $_.Name
                SizeMB = [math]::Round($size / 1MB, 1)
                SizeGB = [math]::Round($size / 1GB, 2)
                Path   = $_.FullName
            }
        }
    }
if ($dotResults.Count -eq 0) {
    Write-Host "(no dot-dir > 50MB)"
}
else {
    $dotResults | Sort-Object SizeMB -Descending | Format-Table Name, SizeMB, SizeGB, Path -AutoSize
}
