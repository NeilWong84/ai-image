# AI图片处理平台

基于RunningHub ComfyUI的AI图片处理工具，支持AI换背景、AI抠图、AI高清图片等功能。

## 功能特性

- ✅ AI换背景：智能识别主体并更换背景，支持自定义背景描述
- ✅ AI抠图：精确抠图技术，支持人像、商品等多种场景
- ✅ AI高清图片：智能放大图片并增强细节，支持2x-4x无损放大
- ✅ API密钥管理：安全存储和管理RunningHub API密钥

## 技术栈

- Vue 3
- TypeScript
- Pinia (状态管理)
- Vue Router (路由)
- Axios (HTTP请求)
- Vite (构建工具)

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
│   └── ai-tools/    # AI工具相关组件
├── services/        # API服务
├── stores/          # Pinia状态管理
│   └── modules/     # 状态模块
├── utils/           # 工具函数
├── views/           # 页面视图
│   └── ai-tools/    # AI工具页面
├── router/          # 路由配置
└── main.ts          # 应用入口
```

## 安装与运行

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- npm

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
# H5端构建
npm run build:h5

# 移动端构建
npm run build:mobile

# APP端构建
npm run build:app
```

## 配置API密钥

1. 访问 [RunningHub官网](https://www.runninghub.com) 注册账户
2. 获取API密钥
3. 在应用设置页面输入API密钥并验证

## 多端部署

本项目支持多端部署：

- **H5端**：适用于桌面和移动浏览器
- **APP端**：通过Cordova或Capacitor打包为原生应用
- **移动端**：优化的移动Web应用

## Git版本控制

项目已初始化Git仓库，支持版本管理和回滚：

```bash
# 查看状态
git status

# 提交更改
git add .
git commit -m "描述更改"

# 查看提交历史
git log

# 回滚到前一个版本
git reset --hard HEAD~1
```

## API接口说明

项目通过RunningHub ComfyUI API提供AI图片处理能力：

- `/api/v1/image/process` - 图片处理接口
- `/api/v1/task/:id` - 任务状态查询接口
- `/api/v1/user/info` - 用户信息验证接口

## 许可证

MIT