# migrate.ps1 - Single directory migration (robocopy + mklink /J)
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File migrate.ps1 -Source "C:\..." -Target "D:\..."
#   powershell -NoProfile -ExecutionPolicy Bypass -File migrate.ps1 -Source "C:\..." -Target "D:\..." -DryRun
#
# Flow: robocopy copy -> rename source to .bak -> mklink /J junction -> verify -> delete .bak
# Junction is NTFS persistent symlink, programs are unaware, survives reboot.

param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Target,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

function Migrate-Dir {
    param(
        [string]$Source,
        [string]$Target,
        [switch]$DryRun
    )
    Write-Host ""
    Write-Host "------ Migrate ------"
    Write-Host "Source: $Source"
    Write-Host "Target: $Target"
    if ($DryRun) { Write-Host "[DRY-RUN] check only, no actual execution" }

    # 1. Source check
    if (-not (Test-Path -LiteralPath $Source)) {
        Write-Host "[SKIP] Source not exist"
        return @{ Status = 'Skip'; Reason = 'Source not exist' }
    }

    $item = Get-Item -LiteralPath $Source -Force
    if ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) {
        Write-Host "[SKIP] Source is already a junction"
        return @{ Status = 'Skip'; Reason = 'Already junction' }
    }

    # 2. Target check
    if (Test-Path -LiteralPath $Target) {
        $tItem = Get-Item -LiteralPath $Target -Force
        if ($tItem.Attributes -band [System.IO.FileAttributes]::ReparsePoint) {
            Write-Host "[SKIP] Target is a junction, abort"
            return @{ Status = 'Skip'; Reason = 'Target is junction' }
        }
        Write-Host "[WARN] Target exists, robocopy will merge"
    }
    else {
        if (-not $DryRun) { New-Item -ItemType Directory -Path $Target -Force | Out-Null }
    }

    # 3. robocopy
    Write-Host "[1/3] robocopy copying..."
    if ($DryRun) {
        Write-Host "[DRY-RUN] skip robocopy"
    }
    else {
        $rcArgs = @('"' + $Source + '"', '"' + $Target + '"',
            '/E', '/COPY:DAT', '/DCOPY:T', '/R:1', '/W:1', '/NFL', '/NDL', '/NP')
        $rc = Start-Process -FilePath 'robocopy.exe' -ArgumentList $rcArgs -NoNewWindow -Wait -PassThru
        # robocopy exit <=7 = success
        if ($rc.ExitCode -gt 7) {
            Write-Host ("[FAIL] robocopy exit code: {0}" -f $rc.ExitCode)
            return @{ Status = 'Fail'; Reason = "robocopy exit $($rc.ExitCode)" }
        }
        Write-Host ("[OK] robocopy done (exit {0})" -f $rc.ExitCode)
    }

    # 4. Rename source to .bak
    $bakPath = $Source + '.bak'
    if (-not $DryRun) {
        if (Test-Path -LiteralPath $bakPath) {
            Write-Host "[WARN] .bak exists, removing old bak"
            cmd /c "rmdir /s /q `"$bakPath`""
        }
        Write-Host "[2/3] Renaming source to .bak"
        try {
            $leaf = Split-Path $Source -Leaf
            Rename-Item -LiteralPath $Source -NewName ($leaf + '.bak') -Force
        }
        catch {
            Write-Host ("[FAIL-RENAME] Rename failed: {0}" -f $_)
            Write-Host "      Data copied to D, but source still in use. Keeping both."
            return @{ Status = 'FailRename'; Reason = "$_" }
        }
    }

    # 5. Create junction
    if (-not $DryRun) {
        Write-Host "[3/3] Creating junction"
        $mkCmd = 'mklink /J "' + $Source + '" "' + $Target + '"'
        $mkResult = cmd /c $mkCmd 2>&1
        Write-Host $mkResult
        if (-not (Test-Path -LiteralPath $Source)) {
            Write-Host "[FAIL] Junction creation failed, restoring .bak"
            $leaf = Split-Path $Source -Leaf
            Rename-Item -LiteralPath $bakPath -NewName $leaf -Force
            return @{ Status = 'Fail'; Reason = 'Junction failed' }
        }
        $verifyItem = Get-Item -LiteralPath $Source -Force
        if (-not ($verifyItem.Attributes -band [System.IO.FileAttributes]::ReparsePoint)) {
            Write-Host "[FAIL] Not a junction after mklink"
            return @{ Status = 'Fail'; Reason = 'Not junction after mklink' }
        }
        Write-Host "[OK] Junction verified"

        # 6. Delete .bak
        Write-Host "[cleanup] Removing .bak"
        cmd /c "rmdir /s /q `"$bakPath`""
        if (Test-Path -LiteralPath $bakPath) {
            Write-Host ("[WARN] .bak could not be removed (in use?), left at: {0}" -f $bakPath)
            return @{ Status = 'OkButBakRemains'; Reason = 'bak in use' }
        }
        Write-Host "[DONE] migrated successfully"
    }

    return @{ Status = 'Ok'; Reason = '' }
}

# Execute
$result = Migrate-Dir -Source $Source -Target $Target -DryRun:$DryRun

# Summary + C drive usage
Write-Host ""
Write-Host "==== Result ===="
Write-Host ("Status: {0} {1}" -f $result.Status, $result.Reason)

Write-Host ""
Write-Host "==== C Drive Usage ===="
$drive = Get-PSDrive C
$usedGB = [math]::Round($drive.Used / 1GB, 1)
$freeGB = [math]::Round($drive.Free / 1GB, 1)
$usedPct = [math]::Round($drive.Used / ($drive.Used + $drive.Free) * 100, 1)
Write-Host ("Used: {0} GB ({1}%) | Free: {2} GB" -f $usedGB, $usedPct, $freeGB)
