<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 预览的图片
const previewImage = ref<string | null>('https://picsum.photos/800/1200?random=40')

// 返回上一页
const goBack = () => {
  router.back()
}

// 导出Excel
const exportExcel = () => {
  alert('导出Excel功能开发中...')
}
</script>

<template>
  <div class="preview-view">
    <!-- 固定头部 -->
    <header class="fixed-header">
      <button class="back-btn" @click="goBack">
        <span class="icon">‹</span>
      </button>
      <h1 class="title">预览</h1>
    </header>

    <!-- 可滚动内容区域 -->
    <div class="scrollable-content">
      <!-- 图片预览区域 -->
      <div v-if="previewImage" class="image-preview">
        <img :src="previewImage" alt="Preview" class="preview-img" />
      </div>
      <div v-else class="empty-preview">
        <p class="empty-text">暂无图片</p>
      </div>
    </div>

    <!-- 底部固定按钮 -->
    <div class="fixed-footer">
      <button class="export-btn" @click="exportExcel">
        <span class="btn-text">导出Excel</span>
        <span class="btn-badge">💎 5点</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.preview-view {
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
  position: relative;
  padding-top: 60px;
  padding-bottom: 80px;
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
  margin-right: 48px; /* 平衡返回按钮的宽度 */
}

/* 可滚动内容 */
.scrollable-content {
  overflow-y: auto;
  height: calc(100vh - 140px);
  -webkit-overflow-scrolling: touch;
  padding: 15px;
}

/* 图片预览区域 */
.image-preview {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.preview-img {
  width: 100%;
  height: auto;
  display: block;
}

/* 空状态 */
.empty-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.empty-text {
  color: #666;
  font-size: 15px;
}

/* 底部固定按钮 */
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: #1a1a1a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
}

.export-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #4A9EFF 0%, #357ABD 100%);
  border: none;
  border-radius: 25px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.4);
}

.export-btn:active {
  transform: translateY(0);
}

.btn-text {
  font-size: 16px;
}

.btn-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 480px) {
  .scrollable-content {
    padding: 10px;
  }
}
</style>
