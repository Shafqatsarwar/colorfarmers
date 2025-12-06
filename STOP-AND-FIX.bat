@echo off
echo ========================================
echo STOP! Read This First
echo ========================================
echo.
echo Before running this script:
echo 1. STOP your dev server (press Ctrl+C in the terminal where npm run dev is running)
echo 2. Close VS Code (optional but recommended)
echo.
pause
echo.
echo Starting cleanup...
echo.

cd /d "%~dp0"

echo Deleting all duplicate .js files...
del /F /Q "app\layout.js" 2>nul
del /F /Q "components\*.js" 2>nul
del /F /Q "components\admin\*.js" 2>nul
del /F /Q "components\pages\*.js" 2>nul
del /F /Q "lib\db.js" 2>nul
del /F /Q "lib\email.js" 2>nul
echo [OK] Duplicate files deleted

echo.
echo Clearing Next.js cache...
rmdir /s /q ".next" 2>nul
echo [OK] Cache cleared

echo.
echo ========================================
echo Done! Now:
echo ========================================
echo.
echo 1. Run: npm run dev
echo 2. Wait for server to start
echo 3. Hard refresh browser (Ctrl+Shift+R)
echo.
echo All errors should be gone!
echo ========================================
pause
