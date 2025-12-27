@echo off
chcp 65001 > nul

echo AI图片处理平台多端部署脚本
echo =========================

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: Node.js 未安装，请先安装 Node.js
    pause
    exit /b 1
)

REM 检查npm是否安装
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: npm 未安装，请先安装 npm
    pause
    exit /b 1
)

echo.
echo 请选择部署目标:
echo 1) H5端 (Web)
echo 2) APP端 (Cordova/Capacitor)
echo 3) 移动端 (PWA)
echo 4) 全部构建
echo.

set /p target="请输入选项 (1-4): "

REM 安装依赖
echo.
echo 正在安装依赖...
npm install

if "%target%"=="1" (
    echo.
    echo 正在构建H5端...
    npm run build:h5
    echo.
    echo H5端构建完成，输出目录: dist/
    goto end
)

if "%target%"=="2" (
    echo.
    echo 正在构建APP端...
    npm run build:app
    echo.
    echo APP端构建完成，输出目录: dist-app/
    goto end
)

if "%target%"=="3" (
    echo.
    echo 正在构建移动端...
    npm run build:mobile
    echo.
    echo 移动端构建完成，输出目录: dist-mobile/
    goto end
)

if "%target%"=="4" (
    echo.
    echo 正在构建所有平台...
    npm run build:h5
    npm run build:mobile
    npm run build:app
    echo.
    echo 所有平台构建完成
    echo - H5端: dist/
    echo - 移动端: dist-mobile/
    echo - APP端: dist-app/
    goto end
)

echo.
echo 无效选项
pause
exit /b 1

:end
echo.
echo 部署完成！
pause