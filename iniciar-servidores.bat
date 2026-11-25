@echo off
chcp 65001 >nul
title Inicializador - PPW II Atividade 4

echo ==============================================================
echo   Iniciando Aplicacao - PPW II Atividade 4 (GlitchTip na 8000)
echo ==============================================================
echo.

echo [1/2] Iniciando Backend (NestJS - porta 8001)...
start "ATV4 - Backend NestJS (8001)" cmd /k "cd /d "%~dp0ppw_test_server" && npm run start:dev"

echo [2/2] Iniciando Frontend (Next.js - porta 3000)...
start "ATV4 - Frontend Next.js (3000)" cmd /k "cd /d "%~dp0ppw_test_client" && npm run dev"

echo.
echo Servidores iniciados em janelas separadas!
echo  - GlitchTip: http://localhost:8000 (Docker/WSL)
echo  - Backend:   http://localhost:8001/emprestimos
echo  - Frontend:  http://localhost:3000/emprestimos
echo.
echo Aguardando 5 segundos para abrir no navegador...
timeout /t 5 /nobreak >nul
start "" "http://localhost:3000/emprestimos"
