#!/bin/bash
echo "===================================================================="
echo " Risk, Fraud & Regulatory Intelligence Copilot - Standalone Server"
echo "===================================================================="
echo ""
echo "Local Access:        http://localhost:3000"
echo "Network LAN Access:  http://[YOUR-LOCAL-IP-ADDRESS]:3000"
echo ""
echo " Note: This server runs independently of Antigravity IDE."
echo " Closing Antigravity will NOT stop this server as long as this"
echo " terminal window remains open."
echo ""
echo "Press Ctrl+C to stop the server at any time."
echo "===================================================================="
echo ""

if [ ! -d "node_modules" ]; then
    echo "[1/2] Installing dependencies..."
    npm install
fi

echo "[2/2] Launching Vite Server bound to 0.0.0.0:3000..."
npm run dev
