# Запусти на СВОЁМ ПК (PowerShell), когда в Timeweb Firewall разрешён SSH с твоего IP или с 0.0.0.0/0.
# Папка проекта: jelez beton

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot
$env:VPS_HOST = "186.246.1.187"
$env:VPS_USER = "root"
$env:VPS_PASS = Read-Host "Root-пароль VPS (из панели Timeweb)"

if (-not $env:VPS_PASS) { Write-Error "Пароль пустой"; exit 1 }

Write-Host "Деплой 10–25 минут, не закрывай окно..."
python (Join-Path $PSScriptRoot "run_remote_bootstrap.py")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Готово. Открой: http://jbi.com.kg/ и http://jbi.com.kg/admin"
Write-Host "Логин: admin@jelez-beton.ru / admin12345 — смени пароль."
