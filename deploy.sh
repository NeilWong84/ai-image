#!/bin/bash

# AI图片处理平台多端部署脚本

echo "AI图片处理平台多端部署脚本"
echo "========================="

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "错误: Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "错误: npm 未安装，请先安装 npm"
    exit 1
fi

# 读取部署目标
echo "请选择部署目标:"
echo "1) H5端 (Web)"
echo "2) APP端 (Cordova/Capacitor)"
echo "3) 移动端 (PWA)"
echo "4) 全部构建"

read -p "请输入选项 (1-4): " target

# 安装依赖
echo "正在安装依赖..."
npm install

case $target in
    1)
        echo "正在构建H5端..."
        npm run build:h5
        echo "H5端构建完成，输出目录: dist/"
        ;;
    2)
        echo "正在构建APP端..."
        npm run build:app
        echo "APP端构建完成，输出目录: dist-app/"
        ;;
    3)
        echo "正在构建移动端..."
        npm run build:mobile
        echo "移动端构建完成，输出目录: dist-mobile/"
        ;;
    4)
        echo "正在构建所有平台..."
        npm run build:h5
        npm run build:mobile
        npm run build:app
        echo "所有平台构建完成"
        echo "- H5端: dist/"
        echo "- 移动端: dist-mobile/"
        echo "- APP端: dist-app/"
        ;;
    *)
        echo "无效选项"
        exit 1
        ;;
esac

echo "部署完成！"