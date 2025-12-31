# AI图片处理平台

基于Vue 3的AI图片处理工具平台，集成RunningHub和LiblibArt API，提供全方位的AI图片处理能力。

## ✨ 功能特性

### AI工坊核心功能

#### 📄 AI图片识别
- 上传图片自动识别商品信息
- 智能提取货号、名称、规格等数据
- 一键导出Excel表格
- 支持拍照上传和相册上传

#### 🖼️ AI产品图
- 6种精美产品图模板可选（含1个定制模板入口）
- 智能背景图替换（支持无、白底图及多种背景）
- 灵活的附图配置
- 完整的产品信息填写表单
  - 货号、中文名、单价、箱数
  - 装箱数、体积、重量、材质
- 一键生成专业产品图

#### 🎭 AI模特图
- 产品图配模特生成效果图
- 支持上传产品白底图
- 多种模特类型选择（中国模特、欧美模特、日韩模特）
- 6种输出尺寸比例（原图、1:1、4:3、3:4、9:16、16:9）
- 智能生成产品展示效果图

#### 💧 AI批量水印
- 批量加水印/去水印功能
- 3种水印模板可选
- 水印内容自定义设置
  - 字体大小调节（0-2倍）
  - 透明度调节（0-1）
  - 文字颜色自定义
  - 文字角度调节（-180° 到 180°）
  - 文字间距调节（0-2000）
- 每个参数支持一键重置
- 支持上传图片水印

#### 📋 AI产品详情页
- 智能AI展图片内容
- （功能开发中）

#### 🔑 AI Key维护
- RunningHub API Key管理
- LiblibArt API Key管理
- 支持添加多个Key
- 支持设置默认Key
- 本地安全存储
- 实时保存修改

### 基础AI功能

- ✅ AI换背景：智能识别主体并更换背景，支持自定义背景描述
- ✅ AI抠图：精确抠图技术，支持人像、商品等多种场景
- ✅ AI高清图片：智能放大图片并增强细节，支持2x-4x无损放大

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 组合式API，响应式框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 下一代前端构建工具

### 状态与路由
- **Pinia** - Vue 3官方状态管理库
- **Vue Router** - 官方路由管理器

### HTTP与工具
- **Axios** - Promise based HTTP客户端
- **LocalStorage** - 本地数据持久化

### UI/UX
- 深色主题设计
- 响应式布局
- 流畅的动画过渡
- 移动端优先设计

## 📁 项目结构

```
ai-image-handle/
├── src/
│   ├── assets/              # 静态资源
│   │   ├── base.css
│   │   └── main.css
│   ├── components/          # 公共组件
│   │   ├── ai-tools/        # AI工具组件
│   │   │   └── ImageUploader.vue
│   │   └── ImageRecognitionModal.vue  # 图片识别弹窗
│   ├── views/               # 页面视图
│   │   ├── ai-tools/        # AI工具页面
│   │   │   ├── AIToolsView.vue           # AI工具主页
│   │   │   ├── ProductImageView.vue      # AI产品图
│   │   │   ├── ModelImageView.vue        # AI模特图
│   │   │   ├── WatermarkView.vue         # AI批量水印
│   │   │   ├── ImageRecognitionPreview.vue  # 图片识别预览
│   │   │   ├── ProductDetailView.vue     # 产品详情页
│   │   │   ├── KeyManagementView.vue     # Key维护
│   │   │   ├── BackgroundReplaceView.vue # AI换背景
│   │   │   ├── ImageMattingView.vue      # AI抠图
│   │   │   └── SuperResolutionView.vue   # AI高清
│   │   ├── HomeView.vue     # 首页
│   │   └── AboutView.vue    # 关于页
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── stores/              # Pinia状态管理
│   │   ├── modules/
│   │   │   └── authStore.ts
│   │   └── counter.ts
│   ├── services/            # API服务
│   │   └── api.ts
│   ├── utils/               # 工具函数
│   │   └── fileUtils.ts
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── dist/                    # 构建输出目录
├── CHANGELOG.md             # 更新日志
├── package.json             # 项目配置
├── vite.config.ts           # Vite配置
├── tsconfig.json            # TypeScript配置
└── README.md                # 项目说明
```

## 🚀 快速开始

### 环境要求

- **Node.js** >= 20.19.0 或 >= 22.12.0
- **npm** 或 **yarn**

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式运行

```bash
npm run dev
# 或
yarn dev
```

应用将在 `http://localhost:3000` 启动（支持外部IP访问）

### 构建生产版本

```bash
# 标准构建
npm run build

# H5端构建
npm run build:h5

# 移动端构建
npm run build:mobile

# APP端构建
npm run build:app
```

### 预览构建结果

```bash
npm run preview
```

# 🔑 配置API密钥

### 方式一：通过UI配置（推荐）

1. 启动应用后，点击首页的"AI Key维护"入口
2. 分别添加RunningHub和LiblibArt的API密钥
3. 为每个平台设置默认密钥
4. 点击"保存"按钮

### 方式二：获取API密钥

#### RunningHub
1. 访问 [RunningHub官网](https://www.runninghub.com) 注册账户
2. 在控制台获取API密钥
3. 在应用"AI Key维护"页面添加密钥

#### LiblibArt
1. 访问 [LiblibArt官网](https://www.liblibai.com) 注册账户
2. 在API设置中获取密钥
3. 在应用"AI Key维护"页面添加密钥

### Key管理功能

- ✅ 支持添加多个API Key
- ✅ 可设置默认Key（自动使用）
- ✅ 本地安全存储（localStorage）
- ✅ 实时修改和保存
- ✅ 删除保护（至少保留1个）

## 📱 多端支持

### 支持平台

- **H5端**：适用于桌面和移动浏览器
- **移动端Web**：优化的移动Web应用体验
- **APP端**：通过Cordova或Capacitor打包为原生应用

### 响应式设计

- 📱 移动优先设计
- 💻 桌面端适配（最大宽度800px居中）
- 🎨 统一的深色主题
- ⚡ 流畅的触摸交互

## 🔄 Git版本控制

项目已初始化Git仓库，支持完整的版本管理：

### 基本操作

```bash
# 查看状态
git status

# 添加更改
git add .

# 提交更改
git commit -m "描述更改内容"

# 查看提交历史
git log --oneline

# 推送到远程仓库
git push origin master
```

### 标签管理

```bash
# 创建标签
git tag -a v1.0.1 -m "版本说明"

# 推送标签
git push origin v1.0.1

# 查看所有标签
git tag -l
```

### 版本回滚

```bash
# 回滚到前一个版本
git reset --hard HEAD~1

# 回滚到指定提交
git reset --hard <commit-id>
```

## 🔌 API接口说明

### RunningHub ComfyUI API

项目集成RunningHub提供的AI图片处理能力：

```
POST /api/v1/image/process    # 图片处理接口
GET  /api/v1/task/:id         # 任务状态查询
GET  /api/v1/user/info        # 用户信息验证
```

### LiblibArt API

用于AI模特图等功能：

```
POST /api/generate            # AI生成接口
GET  /api/task/status/:id     # 任务状态
```

### API配置

在 `src/services/api.ts` 中配置API基础路径和请求拦截器。

## 📊 项目特点

### 用户体验

- 🎨 **统一设计语言**：深色主题 + 蓝色强调色
- 📐 **固定头部布局**：所有页面统一的头部导航
- 📜 **可滚动内容**：避免页面过长，优化浏览体验
- ⚡ **流畅动画**：悬停效果、过渡动画提升交互感
- 💎 **积分系统**：点数消耗机制，清晰展示

### 技术亮点

- 🔧 **TypeScript**：完整的类型定义，减少运行时错误
- 📦 **组件化**：高度复用的组件设计
- 💾 **本地存储**：Key和配置本地持久化
- 🔄 **懒加载路由**：按需加载，优化首屏速度
- 🎯 **代码分割**：自动优化打包体积

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解详细的版本更新历史。

### 最新版本 v1.0.1

- ✨ 新增AI产品图功能（模板、背景、附图、内容填写）
- ✨ 新增AI模特图功能
- ✨ 新增AI批量水印功能
- ✨ 新增AI图片识别功能
- ✨ 新增AI Key维护功能
- 🔧 优化页面布局和交互体验
- 🐛 修复多个UI问题

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🔗 相关链接

- [GitHub仓库](https://github.com/NeilWong84/ai-image)
- [RunningHub官网](https://www.runninghub.com)
- [LiblibArt官网](https://www.liblibai.com)
- [Vue 3文档](https://vuejs.org/)
- [Vite文档](https://vitejs.dev/)

## 💬 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/NeilWong84/ai-image/issues)
- 发送邮件至项目维护者

---

⭐ 如果这个项目对你有帮助，欢迎给个Star！