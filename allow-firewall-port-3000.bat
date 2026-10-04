@echo off
title Allow Port 3000 in Windows Firewall
echo ====================================================================
echo  Adding Windows Firewall Rule for Port 3000 (LAN Access)
echo ====================================================================
echo.
echo Right-click this script and select "Run as administrator" if prompt fails.
echo.
netsh advfirewall firewall add rule name="Risk Copilot LAN Port 3000" dir=in action=allow protocol=TCP localport=3000
echo.
echo Done! Port 3000 inbound access enabled in Windows Firewall.
pause
