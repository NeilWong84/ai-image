<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="product-detail-view">
    <!-- 固定头部 -->
    <header class="fixed-header">
      <button class="back-btn" @click="goBack">
        <span class="icon">‹</span>
      </button>
      <h1 class="title">AI产品详情页</h1>
    </header>

    <!-- 内容区域 -->
    <div class="content-area">
      <div class="dev-container">
        <div class="icon-box">
          <span class="dev-icon">🚧</span>
        </div>
        <h2 class="dev-title">功能开发中</h2>
        <p class="dev-desc">该功能正在紧锣密鼓地开发中</p>
        <p class="dev-desc">敬请期待</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-view {
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
  position: relative;
  padding-top: 60px;
}

/* 固定头部 */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #000;
  display: flex;
  align-items: center;
  padding: 0 15px;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  margin-right: 10px;
}

.back-btn .icon {
  font-size: 32px;
  line-height: 1;
}

.title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  flex: 1;
  text-align: center;
  margin-right: 48px;
}

/* 内容区域 */
.content-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 40px 20px;
}

.dev-container {
  text-align: center;
  max-width: 400px;
}

.icon-box {
  margin-bottom: 30px;
}

.dev-icon {
  font-size: 80px;
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.dev-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #fff;
}

.dev-desc {
  font-size: 16px;
  color: #999;
  margin: 10px 0;
  line-height: 1.6;
}
</style>
