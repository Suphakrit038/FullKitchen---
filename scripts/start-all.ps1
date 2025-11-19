# Start json-server and Next.js dev in separate PowerShell windows, then open browser
param()

$project = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $project

Write-Host "Starting json-server in a new PowerShell window..."
Start-Process powershell -ArgumentList '-NoExit','-Command',"cd '$project'; npm run json-server"

Start-Sleep -Seconds 1
Write-Host "Starting Next.js dev in a new PowerShell window..."
Start-Process powershell -ArgumentList '-NoExit','-Command',"cd '$project'; npm run dev"

Start-Sleep -Seconds 4
Write-Host "Opening browser to http://localhost:3000"
Start-Process "http://localhost:3000"

Write-Host "All started. Two new PowerShell windows were opened (json-server, next dev). Close them to stop the servers." -ForegroundColor Green
