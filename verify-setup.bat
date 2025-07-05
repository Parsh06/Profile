@echo off
echo 🔍 Verifying Parsh Portfolio Setup...
echo ==================================

REM Check if .env.local exists
if exist ".env.local" (
    echo ✅ Environment file exists
    findstr "GEMINI_API_KEY=" .env.local >nul
    if %errorlevel%==0 (
        echo ✅ Gemini API key configured
    ) else (
        echo ❌ Gemini API key not found in .env.local
    )
) else (
    echo ❌ .env.local file missing
)

REM Check if personal.json exists
if exist "data\personal.json" (
    echo ✅ Personal data file exists
) else (
    echo ❌ personal.json missing
)

REM Check if API route exists
if exist "app\api\chat\route.ts" (
    echo ✅ Chat API route exists
) else (
    echo ❌ Chat API route missing
)

REM Check main components
if exist "app\page.tsx" (
    echo ✅ app\page.tsx exists
) else (
    echo ❌ app\page.tsx missing
)

if exist "components\sections\chat-section.tsx" (
    echo ✅ components\sections\chat-section.tsx exists
) else (
    echo ❌ components\sections\chat-section.tsx missing
)

if exist "components\floating-nav.tsx" (
    echo ✅ components\floating-nav.tsx exists
) else (
    echo ❌ components\floating-nav.tsx missing
)

echo.
echo 🚀 To start the development server:
echo    npm run dev
echo.
echo 🌐 Your portfolio will be available at:
echo    http://localhost:3000
echo.
pause
