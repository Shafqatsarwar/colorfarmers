cls# ColorFarmers - Complete Fix Script
# Run this in PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ColorFarmers - Complete Fix" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to project directory
Set-Location "d:\Panaverse\colorfarmers"

Write-Host "Step 1: Deleting duplicate .js files..." -ForegroundColor Yellow

# Delete specific duplicate files
$filesToDelete = @(
    "app\layout.js",
    "components\ChatButton.js",
    "components\Chatbot.js",
    "components\Footer.js",
    "components\Navbar.js",
    "components\Notification.js",
    "lib\db.js",
    "lib\email.js"
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  Deleted: $file" -ForegroundColor Green
    }
}

# Delete all .js files in specific directories
Get-ChildItem "components\admin\*.js" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem "components\pages\*.js" -ErrorAction SilentlyContinue | Remove-Item -Force

Write-Host "  [OK] Duplicate files deleted" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Clearing caches..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "  [OK] .next cache cleared" -ForegroundColor Green
}

if (Test-Path "node_modules") {
    Write-Host "  Deleting node_modules (this takes a minute)..." -ForegroundColor Yellow
    Remove-Item "node_modules" -Recurse -Force
    Write-Host "  [OK] node_modules deleted" -ForegroundColor Green
}
Write-Host ""

Write-Host "Step 3: Reinstalling packages..." -ForegroundColor Yellow
Write-Host "  This will take 2-3 minutes..." -ForegroundColor Gray
npm install

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DONE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Now run: npm run dev" -ForegroundColor Yellow
Write-Host "Then open: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
