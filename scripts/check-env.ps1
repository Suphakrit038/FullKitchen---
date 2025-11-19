# Preflight checks for FullKitchen
# Exit code 0 = OK, 1 = problem

Write-Host "Running FullKitchen preflight checks..."

$errors = @()

function Check-Command($cmd, $name) {
    try {
        $out = & $cmd 2>$null
        return $true
    } catch {
        $null = $errors += "$name not found or not runnable."
        return $false
    }
}

if (-not (Check-Command 'node -v' 'Node.js')) {
    $errors += 'Install Node.js (LTS 18/20 recommended): https://nodejs.org'
}
if (-not (Check-Command 'npm -v' 'npm')) {
    $errors += 'npm not found. Ensure npm is available.'
}

if (-not (Test-Path "./package.json")) {
    $errors += 'package.json not found in current folder. Run from project root.'
}

if (-not (Test-Path "./node_modules")) {
    $errors += 'Dependencies appear not installed. Run `npm install`.'
}

# Check ports 3000 and 3001
foreach ($p in @(3000,3001)) {
    $line = netstat -aon | Select-String ":$p\s"
    if ($line) { $errors += "Port $p appears in use (netstat shows a listener)." }
}

if ($errors.Count -eq 0) {
    Write-Host "Preflight checks passed. You can run `npm run start:all` to start both services." -ForegroundColor Green
    exit 0
} else {
    Write-Host "Preflight checks found issues:" -ForegroundColor Yellow
    $errors | ForEach-Object { Write-Host "- $_" }
    exit 1
}
