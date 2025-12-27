<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 已保存的次数
const savedCount = ref(5)

// 当前选中的tab
const currentTab = ref('background')

// 背景图列表
const backgrounds = [
  { id: 'none', name: '无', image: null },
  { id: 'white', name: '白底图', image: null },
  { id: 'bg2', name: '背景2', image: 'https://picsum.photos/400/400?random=1' },
  { id: 'bg3', name: '背景3', image: 'https://picsum.photos/400/400?random=2' },
  { id: 'bg4', name: '背景4', image: 'https://picsum.photos/400/400?random=3' },
  { id: 'bg5', name: '背景5', image: 'https://picsum.photos/400/400?random=4' },
]

// 选中的背景
const selectedBackground = ref('white')

// 上传的图片
const uploadedImage = ref<string | null>(null)

// tabs配置
const tabs = [
  { key: 'background', label: '背景图' },
  { key: 'template', label: '产品图模板' },
  { key: 'attachment', label: '附图' },
  { key: 'content', label: '内容填写' },
]

// 返回上一页
const goBack = () => {
  router.back()
}

// 保存
const handleSave = () => {
  savedCount.value++
  alert('保存成功！')
}

// 切换tab
const switchTab = (key: string) => {
  currentTab.value = key
}

// 选择背景
const selectBackground = (id: string) => {
  selectedBackground.value = id
}

// 触发文件上传
const triggerUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadedImage.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// 一键抠图
const removeBackground = () => {
  alert('一键抠图功能开发中...')
}
</script>

<template>
  <div class="product-image-view">
    <!-- 固定头部 -->
    <header class="fixed-header">
      <button class="back-btn" @click="goBack">
        <span class="icon">‹</span>
        <span class="text">记录</span>
      </button>
      
      <h1 class="page-title">AI产品图</h1>
      
      <button class="save-btn" @click="handleSave">
        <span class="save-text">保存</span>
        <span class="badge">💎 {{ savedCount }}</span>
      </button>
    </header>

    <!-- 可滚动内容区域 -->
    <div class="scrollable-content">
      <!-- 上传区域 -->
      <div class="upload-area">
        <div v-if="!uploadedImage" class="upload-placeholder" @click="triggerUpload">
          <div class="upload-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M30 15L30 45M15 30L45 30" stroke="#666" stroke-width="3" stroke-linecap="round"/>
              <path d="M20 20L30 10L40 20" stroke="#666" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="upload-text">上传图片</p>
        </div>
        
        <div v-else class="uploaded-image-container">
          <img :src="uploadedImage" alt="Uploaded" class="uploaded-image" />
        </div>
        
        <button class="cutout-btn" @click="removeBackground">
          <span class="icon">✂️</span>
          <span>一键抠图</span>
        </button>
      </div>

      <!-- Tab导航 -->
      <div class="tabs-container">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-item"
            :class="{ active: currentTab === tab.key }"
            @click="switchTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- 背景图选择 -->
      <div v-if="currentTab === 'background'" class="background-grid">
        <div
          v-for="bg in backgrounds"
          :key="bg.id"
          class="background-item"
          :class="{ selected: selectedBackground === bg.id }"
          @click="selectBackground(bg.id)"
        >
          <div v-if="bg.id === 'none'" class="empty-bg">
            <span class="empty-icon">🚫</span>
          </div>
          <div v-else-if="bg.id === 'white'" class="white-bg"></div>
          <img v-else :src="bg.image" :alt="bg.name" class="bg-image" />
          <p class="bg-name">{{ bg.name }}</p>
        </div>
      </div>

      <!-- 其他tab内容占位 -->
      <div v-else class="tab-content-placeholder">
        <p>{{ tabs.find(t => t.key === currentTab)?.label }} 功能开发中...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-image-view {
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
  position: relative;
  padding-top: 60px; /* 为固定头部留出空间 */
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
  justify-content: space-between;
  padding: 0 15px;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
}

.back-btn .icon {
  font-size: 28px;
  line-height: 1;
}

.page-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #4A9EFF;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 15px;
}

.badge {
  font-size: 14px;
}

/* 可滚动内容 */
.scrollable-content {
  overflow-y: auto;
  height: calc(100vh - 60px);
  -webkit-overflow-scrolling: touch;
}

/* 上传区域 */
.upload-area {
  background: #2a2a2a;
  margin: 15px;
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.upload-placeholder {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #444;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-placeholder:hover {
  border-color: #4A9EFF;
  background: rgba(74, 158, 255, 0.05);
}

.upload-icon {
  margin-bottom: 15px;
}

.upload-text {
  color: #999;
  font-size: 16px;
  margin: 0;
}

.uploaded-image-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  border-radius: 8px;
}

.uploaded-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.cutout-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  backdrop-filter: blur(10px);
}

.cutout-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

/* Tab导航 */
.tabs-container {
  background: #000;
  padding: 0 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs {
  display: flex;
  gap: 20px;
}

.tab-item {
  background: none;
  border: none;
  color: #999;
  padding: 15px 0;
  cursor: pointer;
  font-size: 15px;
  white-space: nowrap;
  position: relative;
  transition: color 0.3s ease;
}

.tab-item.active {
  color: #fff;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #4A9EFF;
  border-radius: 3px 3px 0 0;
}

/* 背景图网格 */
.background-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 15px;
}

.background-item {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.background-item.selected {
  border-color: #4A9EFF;
  box-shadow: 0 0 15px rgba(74, 158, 255, 0.3);
}

.empty-bg,
.white-bg,
.bg-image {
  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
}

.empty-bg {
  font-size: 40px;
}

.white-bg {
  background: #fff;
}

.bg-name {
  text-align: center;
  padding: 8px;
  font-size: 13px;
  color: #ccc;
  margin: 0;
  background: #1a1a1a;
}

/* Tab内容占位 */
.tab-content-placeholder {
  padding: 60px 15px;
  text-align: center;
  color: #666;
}

/* 响应式 */
@media (max-width: 480px) {
  .background-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .background-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>