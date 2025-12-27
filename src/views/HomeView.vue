<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 用户积分
const userPoints = ref(5000)

// AI工坊功能列表
const aiFeatures = [
  {
    id: 1,
    icon: '📄',
    title: 'AI图片识别',
    description: '上传图片，识别，生成Excel',
    route: '/ai-tools/image-recognition'
  },
  {
    id: 2,
    icon: '🖼️',
    title: 'AI产品图',
    description: '一键作图，选择模版生成外观图',
    route: '/ai-tools/product-image'
  },
  {
    id: 3,
    icon: '🎭',
    title: 'AI模特图',
    description: '产品图配模特生成效果图',
    route: '/ai-tools/model-image'
  },
  {
    id: 4,
    icon: '💧',
    title: 'AI批量水印',
    description: '批量加水印-去水印-水印检测',
    route: '/ai-tools/watermark'
  },
  {
    id: 5,
    icon: '📋',
    title: 'AI产品详情页',
    description: '智能AI展图片内容',
    route: '/ai-tools/product-detail'
  }
]

// 导航到功能页面
const navigateToFeature = (route: string) => {
  // 由于部分功能尚未实现，暂时导航到AI工具页面
  router.push('/ai-tools')
}

// 充值功能
const recharge = () => {
  alert('充值功能即将上线')
}

// 记录功能
const viewRecords = () => {
  alert('记录功能即将上线')
}
</script>

<template>
  <div class="home-view">
    <div class="content-wrapper">
      <!-- 顶部积分栏 -->
      <div class="top-bar">
        <div class="point-card">
          <div class="icon-wrapper">
            <span class="icon">🪙</span>
          </div>
          <span class="points">{{ userPoints }}</span>
        </div>
        
        <div class="action-card" @click="recharge">
          <div class="icon-wrapper">
            <span class="icon">💳</span>
          </div>
          <span class="label">充值</span>
        </div>
        
        <div class="action-card" @click="viewRecords">
          <div class="icon-wrapper">
            <span class="icon">📝</span>
          </div>
          <span class="label">记录</span>
        </div>
      </div>

      <!-- AI工坊标题 -->
      <div class="workshop-header">
        <h1 class="workshop-title">AI工坊</h1>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="features-list">
      <div 
        v-for="feature in aiFeatures" 
        :key="feature.id"
        class="feature-item"
        @click="navigateToFeature(feature.route)"
      >
        <div class="feature-icon-box">
          <span class="feature-icon">{{ feature.icon }}</span>
        </div>
        <div class="feature-content">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.description }}</p>
        </div>
        <span class="arrow">›</span>
      </div>
    </div>

    <!-- 底部装饰区域 -->
    <div class="bottom-decoration">
      <div class="large-text">AI</div>
      <div class="slogan">
        <h2>敬请期待</h2>
        <p>更多外贸AI功能</p>
        <p class="sub-text">持续更新</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a1929 0%, #1a2f4a 50%, #0a1929 100%);
  color: #fff;
  padding: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
}

/* 内容包裹层 - 仅用于顶部区域 */
.content-wrapper {
  padding: 0 15px;
}

/* 背景装饰 */
.home-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(66, 153, 225, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(49, 130, 206, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* 顶部积分栏 */
.top-bar {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 15px 0;
  position: relative;
  z-index: 1;
}

.point-card,
.action-card {
  flex: 1;
  background: rgba(30, 64, 104, 0.6);
  border: 1px solid rgba(66, 153, 225, 0.3);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.point-card:hover,
.action-card:hover {
  background: rgba(40, 74, 114, 0.7);
  border-color: rgba(66, 153, 225, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
}

.icon {
  font-size: 24px;
}

.points {
  font-size: 20px;
  font-weight: bold;
  color: #4299e1;
}

.label {
  font-size: 14px;
  color: #a0aec0;
}

/* AI工坊标题 */
.workshop-header {
  margin: 0;
  padding: 20px 0 15px 0;
  position: relative;
  z-index: 1;
}

.workshop-title {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 10px rgba(66, 153, 225, 0.5);
}

/* 功能列表 */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin: 0;
  padding: 0 0 40px 0;
  position: relative;
  z-index: 1;
}

.feature-item {
  background: rgba(30, 64, 104, 0.4);
  border: none;
  border-bottom: 1px solid rgba(66, 153, 225, 0.1);
  border-radius: 0;
  padding: 16px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.feature-item:hover {
  background: rgba(40, 74, 114, 0.5);
  border-color: rgba(66, 153, 225, 0.5);
  transform: translateX(5px);
  box-shadow: 0 4px 20px rgba(66, 153, 225, 0.2);
}

.feature-icon-box {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
}

.feature-icon {
  font-size: 24px;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin: 0 0 4px 0;
}

.feature-desc {
  font-size: 12px;
  color: #a0aec0;
  margin: 0;
}

.arrow {
  font-size: 24px;
  color: #4299e1;
  font-weight: bold;
}

/* 底部装饰 */
.bottom-decoration {
  position: relative;
  margin-top: 60px;
  text-align: center;
  z-index: 1;
}

.large-text {
  font-size: 180px;
  font-weight: bold;
  background: linear-gradient(180deg, rgba(66, 153, 225, 0.3) 0%, rgba(66, 153, 225, 0.1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: -80px;
  opacity: 0.5;
}

.slogan {
  position: relative;
  z-index: 2;
}

.slogan h2 {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 10px 0;
  background: linear-gradient(90deg, #4299e1 0%, #63b3ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slogan p {
  font-size: 16px;
  color: #a0aec0;
  margin: 5px 0;
}

.sub-text {
  font-size: 14px;
  color: #718096;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-bar {
    flex-direction: row;
  }
  
  .large-text {
    font-size: 120px;
    margin-bottom: -50px;
  }
  
  .slogan h2 {
    font-size: 24px;
  }
}
</style>