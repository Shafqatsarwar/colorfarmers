@echo off
echo Deleting duplicate layout.js file...
cd app
if exist layout.js (
    del /F /Q layout.js
    echo layout.js deleted successfully!
) else (
    echo layout.js not found.
)
cd ..
echo Done!
pause
