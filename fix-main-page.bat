@echo off
echo ========================================
echo ColorFarmers - Main Page 404 Fix
echo ========================================
echo.
echo This script will:
echo 1. Delete duplicate layout.js file
echo 2. Clear Next.js cache
echo 3. Prepare for fresh start
echo.
echo ========================================
echo.

echo Step 1: Deleting duplicate layout.js...
cd /d "%~dp0"
if exist "app\layout.js" (
    del /F /Q "app\layout.js"
    echo [OK] layout.js deleted successfully!
) else (
    echo [INFO] layout.js not found (already deleted?)
)
echo.

echo Step 2: Clearing Next.js cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo [OK] .next cache cleared!
) else (
    echo [INFO] .next folder not found
)
echo.

echo ========================================
echo Fix Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Open: http://localhost:3000
echo 3. Your main page should work now!
echo.
echo ========================================
pause
