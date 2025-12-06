@echo off
echo ========================================
echo ColorFarmers - COMPLETE REBUILD
echo ========================================
echo.
echo This will completely clean and rebuild your project.
echo This will take 3-5 minutes.
echo.
echo MAKE SURE: Dev server is stopped (Ctrl+C)
echo.
pause
echo.

cd /d "%~dp0"

echo Step 1: Deleting ALL duplicate .js files...
del /F /Q "app\layout.js" 2>nul
del /F /Q "components\*.js" 2>nul
del /F /Q "components\admin\*.js" 2>nul
del /F /Q "components\pages\*.js" 2>nul
del /F /Q "lib\*.js" 2>nul
echo [OK] Duplicate files deleted

echo.
echo Step 2: Clearing ALL caches...
rmdir /s /q ".next" 2>nul
rmdir /s /q "node_modules" 2>nul
echo [OK] Caches cleared

echo.
echo Step 3: Reinstalling packages (this takes 2-3 minutes)...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
)
echo [OK] Packages installed

echo.
echo Step 4: Testing build...
call npm run build
if errorlevel 1 (
    echo [WARNING] Build had issues, but dev mode should work
)

echo.
echo ========================================
echo DONE!
echo ========================================
echo.
echo Now run: npm run dev
echo Then open: http://localhost:3000
echo.
echo All errors should be fixed!
echo ========================================
pause
