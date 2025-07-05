@echo off
title Parsh Portfolio - Development Servers

echo Starting Parsh's Portfolio Development Environment...
echo.

REM Start the Flask backend in a new window
echo Starting Flask Backend Server (Port 5000)...
start "Flask Backend" cmd /k "cd backend && python app.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start the Next.js frontend
echo Starting Next.js Frontend Server (Port 3000)...
npm run dev

pause
