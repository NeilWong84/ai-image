<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 已保存的次数
const savedCount = ref(5)

// 当前选中的主tab（加水印/去水印）
const currentMainTab = ref('add')

// 当前选中的底部tab（水印模板/内容填写）
const currentBottomTab = ref('content')

// 水印模板列表
const watermarkTemplates = [
  { 
    id: 'none', 
    name: '无',
    icon: '👁️'
  },
  { 
    id: 'default', 
    name: '默认模板',
    icon: '👁️',
    watermarks: ['水印', '水印', '水印', '水印', '水印', '水印', '水印', '水印', '水印']
  },
  { 
    id: 'template1', 
    name: '模板1',
    icon: '👁️',
    watermarks: ['水印', '水印', '水印', '水印', '水印', '水印', '水印', '水印', '水印']
  }
]

// 选中的水印模板
const selectedTemplate = ref('default')

// 上传的图片
const uploadedImage = ref<string | null>('https://picsum.photos/600/600?random=30')

// 水印内容设置
const watermarkContent = ref('水印内容')
const fontSize = ref(0.5)
const opacity = ref(0.5)
const textColor = ref('#ff6b6b')
const textAngle = ref(-45.05)
const textSpacing = ref(1000)

// 默认值，用于重置
const defaultValues = {
  fontSize: 0.5,
  opacity: 0.5,
  textColor: '#ff6b6b',
  textAngle: -45.05,
  textSpacing: 1000
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 保存
const handleSave = () => {
  savedCount.value++
  alert('保存成功！')
}

// 切换主tab
const switchMainTab = (key: string) => {
  currentMainTab.value = key
}

// 切换底部tab
const switchBottomTab = (key: string) => {
  currentBottomTab.value = key
}

// 选择水印模板
const selectTemplate = (id: string) => {
  selectedTemplate.value = id
}

// 预览模板
const previewTemplate = (id: string) => {
  alert(`预览模板：${id}`)
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

// 上传水印图片
const uploadWatermarkImage = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        // 这里可以处理水印图片
        alert('水印图片上传成功！')
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// 重置单个值
const resetValue = (key: string) => {
  switch(key) {
    case 'fontSize':
      fontSize.value = defaultValues.fontSize
      break
    case 'opacity':
      opacity.value = defaultValues.opacity
      break
    case 'textColor':
      textColor.value = defaultValues.textColor
      break
    case 'textAngle':
      textAngle.value = defaultValues.textAngle
      break
    case 'textSpacing':
      textSpacing.value = defaultValues.textSpacing
      break
  }
}
</script>

<template>
  <div class="watermark-view">
    <!-- 固定头部 -->
    <header class="fixed-header">
      <button class="back-btn" @click="goBack">
        <span class="icon">‹</span>
      </button>
      
      <div class="header-tabs">
        <button
          class="header-tab"
          :class="{ active: currentMainTab === 'add' }"
          @click="switchMainTab('add')"
        >
          加水印
        </button>
        <button
          class="header-tab"
          :class="{ active: currentMainTab === 'remove' }"
          @click="switchMainTab('remove')"
        >
          去水印
        </button>
      </div>
      
      <button class="save-btn" @click="handleSave">
        <span class="save-text">保存</span>
        <span class="badge">💎 {{ savedCount }}</span>
      </button>
    </header>

    <!-- 可滚动内容区域 -->
    <div class="scrollable-content">
      <!-- 图片预览区域 -->
      <div class="preview-area" @click="triggerUpload">
        <div v-if="uploadedImage" class="preview-container">
          <img :src="uploadedImage" alt="Preview" class="preview-image" />
          
          <!-- 水印层 -->
          <div v-if="selectedTemplate !== 'none'" class="watermark-layer">
            <div 
              v-for="(mark, index) in watermarkTemplates.find(t => t.id === selectedTemplate)?.watermarks"
              :key="index"
              class="watermark-text"
              :style="{ 
                top: `${(Math.floor(index / 3) * 25 + 12)}%`, 
                left: `${((index % 3) * 33 + 16)}%` 
              }"
            >
              {{ mark }}
            </div>
          </div>
        </div>
        
        <div v-else class="upload-placeholder">
          <p class="upload-text">点击上传图片</p>
        </div>
      </div>

      <!-- 底部Tab导航 -->
      <div class="bottom-tabs-container">
        <div class="bottom-tabs">
          <button
            class="bottom-tab-item"
            :class="{ active: currentBottomTab === 'template' }"
            @click="switchBottomTab('template')"
          >
            水印模板
          </button>
          <button
            class="bottom-tab-item"
            :class="{ active: currentBottomTab === 'content' }"
            @click="switchBottomTab('content')"
          >
            内容填写
          </button>
        </div>
      </div>

      <!-- 水印模板选择 -->
      <div v-if="currentBottomTab === 'template'" class="template-grid">
        <div
          v-for="template in watermarkTemplates"
          :key="template.id"
          class="template-card"
          :class="{ selected: selectedTemplate === template.id }"
          @click="selectTemplate(template.id)"
        >
          <button 
            v-if="template.id !== 'none'"
            class="preview-icon"
            @click.stop="previewTemplate(template.id)"
          >
            {{ template.icon }}
          </button>
          
          <div v-if="template.id === 'none'" class="empty-template">
            <span class="empty-icon">🚫</span>
          </div>
          
          <div v-else class="template-preview">
            <div 
              v-for="(mark, index) in template.watermarks"
              :key="index"
              class="template-watermark"
              :style="{ 
                top: `${(Math.floor(index / 3) * 33 + 10)}%`, 
                left: `${((index % 3) * 33 + 10)}%` 
              }"
            >
              {{ mark }}
            </div>
          </div>
          
          <p class="template-name">{{ template.name }}</p>
        </div>
      </div>

      <!-- 内容填写 -->
      <div v-else-if="currentBottomTab === 'content'" class="content-form">
        <!-- 水印内容输入 -->
        <div class="form-row">
          <input 
            v-model="watermarkContent" 
            type="text" 
            class="content-input"
            placeholder="水印内容"
          />
          <button class="upload-btn" @click="uploadWatermarkImage">
            <span class="plus-icon">+</span>
            <span class="upload-text">上传图片</span>
          </button>
        </div>

        <!-- 字体大小 -->
        <div class="slider-control">
          <label class="control-label">字体大小</label>
          <input 
            v-model.number="fontSize" 
            type="range" 
            min="0" 
            max="2" 
            step="0.01"
            class="slider"
          />
          <span class="value-display">{{ Number(fontSize).toFixed(2) }}</span>
          <button class="reset-btn" @click="resetValue('fontSize')">
            <span class="reset-icon">↻</span>
          </button>
        </div>

        <!-- 透明度 -->
        <div class="slider-control">
          <label class="control-label">透明度</label>
          <input 
            v-model.number="opacity" 
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            class="slider"
          />
          <span class="value-display">{{ Number(opacity).toFixed(2) }}</span>
          <button class="reset-btn" @click="resetValue('opacity')">
            <span class="reset-icon">↻</span>
          </button>
        </div>

        <!-- 文字颜色 -->
        <div class="slider-control">
          <label class="control-label">文字颜色</label>
          <input 
            v-model="textColor" 
            type="color" 
            class="color-picker"
          />
          <div class="color-preview" :style="{ background: textColor }"></div>
          <button class="reset-btn" @click="resetValue('textColor')">
            <span class="reset-icon">↻</span>
          </button>
        </div>

        <!-- 文字角度 -->
        <div class="slider-control">
          <label class="control-label">文字角度</label>
          <input 
            v-model.number="textAngle" 
            type="range" 
            min="-180" 
            max="180" 
            step="0.01"
            class="slider"
          />
          <span class="value-display">{{ Number(textAngle).toFixed(2) }}</span>
          <button class="reset-btn" @click="resetValue('textAngle')">
            <span class="reset-icon">↻</span>
          </button>
        </div>

        <!-- 文字间距 -->
        <div class="slider-control">
          <label class="control-label">文字间距</label>
          <input 
            v-model.number="textSpacing" 
            type="range" 
            min="0" 
            max="2000" 
            step="10"
            class="slider"
          />
          <span class="value-display">{{ Number(textSpacing) }}</span>
          <button class="reset-btn" @click="resetValue('textSpacing')">
            <span class="reset-icon">↻</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.watermark-view {
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
  justify-content: space-between;
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
  min-width: 40px;
  flex-shrink: 0;
}

.back-btn .icon {
  font-size: 32px;
  line-height: 1;
}

.header-tabs {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  max-width: 200px;
}

.header-tab {
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 10px;
  transition: color 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.header-tab.active {
  color: #fff;
  font-weight: 500;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #4A9EFF;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;
  white-space: nowrap;
}

.save-text {
  display: inline;
}

.badge {
  font-size: 13px;
}

/* 可滚动内容 */
.scrollable-content {
  overflow-y: auto;
  height: calc(100vh - 60px);
  -webkit-overflow-scrolling: touch;
}

/* 图片预览区域 */
.preview-area {
  background: #2a2a2a;
  margin: 15px;
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
}

.preview-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.watermark-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.watermark-text {
  position: absolute;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  transform: rotate(-45deg);
  white-space: nowrap;
}

.upload-placeholder {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #444;
  border-radius: 8px;
}

.upload-text {
  color: #999;
  font-size: 16px;
  margin: 0;
}

/* 底部Tab导航 */
.bottom-tabs-container {
  background: #000;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.bottom-tabs {
  display: flex;
  width: 100%;
}

.bottom-tab-item {
  flex: 1;
  background: none;
  border: none;
  color: #999;
  padding: 15px 0;
  cursor: pointer;
  font-size: 15px;
  white-space: nowrap;
  position: relative;
  transition: color 0.3s ease;
  text-align: center;
}

.bottom-tab-item.active {
  color: #fff;
}

.bottom-tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #4A9EFF;
  border-radius: 3px 3px 0 0;
}

/* 模板网格 */
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 15px;
}

.template-card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  background: #2a2a2a;
  position: relative;
}

.template-card.selected {
  border-color: #4A9EFF;
  box-shadow: 0 0 15px rgba(74, 158, 255, 0.3);
}

.template-card:hover {
  transform: translateY(-2px);
}

.preview-icon {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  font-size: 16px;
}

.preview-icon:hover {
  background: rgba(0, 0, 0, 0.8);
}

.empty-template {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
}

.empty-icon {
  font-size: 50px;
}

.template-preview {
  aspect-ratio: 1;
  position: relative;
  background: #3a3a3a;
}

.template-watermark {
  position: absolute;
  color: rgba(255, 255, 255, 0.3);
  font-size: 10px;
  transform: rotate(-45deg);
  white-space: nowrap;
}

.template-name {
  text-align: center;
  padding: 10px 8px;
  font-size: 13px;
  color: #ccc;
  margin: 0;
  background: #1a1a1a;
}

/* 内容填写表单 */
.content-form {
  padding: 15px;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.content-input {
  flex: 1;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  padding: 12px 15px;
  outline: none;
}

.content-input::placeholder {
  color: #666;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #999;
  padding: 12px 15px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  background: #333;
  border-color: #4A9EFF;
}

.plus-icon {
  font-size: 20px;
  font-weight: bold;
}

.upload-text {
  font-size: 14px;
}

/* 滑块控件 */
.slider-control {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.control-label {
  min-width: 80px;
  color: #ccc;
  font-size: 14px;
}

.slider {
  flex: 1;
  height: 6px;
  background: linear-gradient(to right, #4A9EFF 0%, #4A9EFF 50%, #555 50%, #555 100%);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.color-picker {
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
}

.color-preview {
  width: 80px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.value-display {
  min-width: 60px;
  text-align: right;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.reset-btn {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: #4A9EFF;
  color: #4A9EFF;
}

.reset-icon {
  font-size: 18px;
  font-weight: bold;
}

/* 内容填写占位 */
.content-placeholder {
  padding: 60px 15px;
  text-align: center;
  color: #666;
}

/* 响应式 */
@media (max-width: 480px) {
  .template-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  
  .watermark-text {
    font-size: 12px;
  }
}

@media (min-width: 768px) {
  .template-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
