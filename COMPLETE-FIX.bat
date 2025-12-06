@echo off
echo ========================================
echo ColorFarmers - Complete Fix
echo ========================================
echo.
echo This will:
echo 1. Delete duplicate files
echo 2. Clear all caches
echo 3. Reinstall packages
echo 4. Fix internal server error
echo.
echo This may take 2-3 minutes...
echo.
pause
echo.

cd /d "%~dp0"

echo Step 1: Deleting duplicate .js files...
del /F /Q "app\layout.js" 2>nul
del /F /Q "components\ChatButton.js" 2>nul
del /F /Q "components\Chatbot.js" 2>nul
del /F /Q "components\Footer.js" 2>nul
del /F /Q "components\Navbar.js" 2>nul
del /F /Q "components\Notification.js" 2>nul
del /F /Q "components\admin\*.js" 2>nul
del /F /Q "components\pages\*.js" 2>nul
del /F /Q "lib\db.js" 2>nul
del /F /Q "lib\email.js" 2>nul
echo [OK] Duplicate files deleted

echo.
echo Step 2: Clearing caches...
rmdir /s /q ".next" 2>nul
rmdir /s /q "node_modules\.cache" 2>nul
echo [OK] Caches cleared

echo.
echo Step 3: Reinstalling packages...
echo This may take a minute...
call npm install
echo [OK] Packages reinstalled

echo.
echo ========================================
echo Fix Complete!
echo ========================================
echo.
echo Now run: npm run dev
echo.
echo If you still see errors:
echo 1. Close VS Code completely
echo 2. Reopen the project
echo 3. Run: npm run dev
echo.
pause
