param(
    [int]$Port = 8000
)

$siteDir = Join-Path $PSScriptRoot "..\site"

if (-not (Test-Path $siteDir)) {
    Write-Host "Pasta 'site' não encontrada em $siteDir" -ForegroundColor Red
    exit 1
}

Set-Location $siteDir

$pythonCmd = Get-Command py -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
    $pythonCmd = Get-Command python3 -ErrorAction SilentlyContinue
}
if (-not $pythonCmd) {
    Write-Host "Python não encontrado. Instale o Python (python.org) ou use outro servidor estático de sua preferência." -ForegroundColor Red
    exit 1
}

$url = "http://localhost:$Port"
Write-Host "Servindo '$siteDir' em $url"
Write-Host "Pressione Ctrl+C para parar o servidor."

Start-Process $url
& $pythonCmd.Name -m http.server $Port
