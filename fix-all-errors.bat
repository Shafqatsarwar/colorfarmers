@echo off
echo ========================================
echo ColorFarmers - Complete Fix Script
echo ========================================
echo.
echo This script will:
echo 1. Delete ALL duplicate .js files
echo 2. Clear Next.js cache
echo 3. Prepare for fresh start
echo.
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Deleting duplicate files in app directory...
if exist "app\layout.js" (
    del /F /Q "app\layout.js"
    echo [OK] app\layout.js deleted
) else (
    echo [INFO] app\layout.js not found
)

echo.
echo Step 2: Deleting duplicate files in components...
if exist "components\ChatButton.js" del /F /Q "components\ChatButton.js"
if exist "components\Chatbot.js" del /F /Q "components\Chatbot.js"
if exist "components\Footer.js" del /F /Q "components\Footer.js"
if exist "components\Navbar.js" del /F /Q "components\Navbar.js"
if exist "components\Notification.js" del /F /Q "components\Notification.js"
echo [OK] Component duplicates checked

echo.
echo Step 3: Deleting duplicate files in components\admin...
if exist "components\admin\AdminLayout.js" del /F /Q "components\admin\AdminLayout.js"
if exist "components\admin\Dashboard.js" del /F /Q "components\admin\Dashboard.js"
if exist "components\admin\OrdersManagement.js" del /F /Q "components\admin\OrdersManagement.js"
if exist "components\admin\ProductsManagement.js" del /F /Q "components\admin\ProductsManagement.js"
if exist "components\admin\ReviewsManagement.js" del /F /Q "components\admin\ReviewsManagement.js"
echo [OK] Admin component duplicates checked

echo.
echo Step 4: Deleting duplicate files in components\pages...
if exist "components\pages\About.js" del /F /Q "components\pages\About.js"
if exist "components\pages\Contact.js" del /F /Q "components\pages\Contact.js"
if exist "components\pages\Home.js" del /F /Q "components\pages\Home.js"
if exist "components\pages\Login.js" del /F /Q "components\pages\Login.js"
if exist "components\pages\MyOrders.js" del /F /Q "components\pages\MyOrders.js"
if exist "components\pages\Order.js" del /F /Q "components\pages\Order.js"
if exist "components\pages\Rates.js" del /F /Q "components\pages\Rates.js"
if exist "components\pages\Reviews.js" del /F /Q "components\pages\Reviews.js"
if exist "components\pages\Signup.js" del /F /Q "components\pages\Signup.js"
if exist "components\pages\StartToday.js" del /F /Q "components\pages\StartToday.js"
echo [OK] Page component duplicates checked

echo.
echo Step 5: Deleting duplicate files in lib...
if exist "lib\db.js" del /F /Q "lib\db.js"
if exist "lib\email.js" del /F /Q "lib\email.js"
echo [OK] Lib duplicates checked

echo.
echo Step 6: Clearing Next.js cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo [OK] .next cache cleared
) else (
    echo [INFO] .next folder not found
)

echo.
echo ========================================
echo Fix Complete!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Fill in .env.local with required values:
echo    - NEXT_PUBLIC_EMAILJS_SERVICE_ID
echo    - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
echo    - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
echo    - NEXT_PUBLIC_ADMIN_PASSWORD
echo.
echo 2. STOP the dev server (Ctrl+C)
echo.
echo 3. Start fresh:
echo    npm run dev
echo.
echo 4. Hard refresh browser (Ctrl+Shift+R)
echo.
echo See .env.local.template for help!
echo ========================================
pause
