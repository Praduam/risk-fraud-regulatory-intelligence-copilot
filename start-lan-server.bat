@echo off
title Risk Fraud Copilot LAN Server
cd /d "%~dp0"

echo ====================================================================
echo  Risk Fraud and Regulatory Intelligence Copilot - Standalone Server
echo ====================================================================
echo.

if not exist node_modules (
    echo [1/3] Installing dependencies...
    call npm install
)

echo [2/3] Building production bundle...
call npm run build

echo.
echo ====================================================================
echo  YOUR LOCALHOST AND WI-FI LAN ADDRESSES:
echo ====================================================================
echo.
echo  Local computer access:  http://localhost:3000
echo  Wi-Fi LAN access:       http://192.168.1.6:3000
echo.
echo  Note: Use http://192.168.1.6:3000 on mobile/other PCs connected to Wi-Fi.
echo  Keep this window open for the server to stay active.
echo ====================================================================
echo.

echo [3/3] Starting Standalone Web Server on Port 3000...
call npx --yes serve -s dist -l tcp://0.0.0.0:3000
pause
