<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 上传的图片
const uploadedImage = ref<string | null>(null)

// 产品名称
const productName = ref('')

// 产品描述
const productDescription = ref('')

// 选中的模特类型
const selectedModel = ref('中国模特')

// 模特选项
const modelOptions = ['中国模特', '欧美模特', '日韩模特']

// 选中的输出尺寸
const selectedRatio = ref('original')

// 输出尺寸选项
const ratioOptions = [
  { id: 'original', label: '原图\n比例' },
  { id: '1:1', label: '1:1' },
  { id: '4:3', label: '4:3' },
  { id: '3:4', label: '3:4' },
  { id: '9:16', label: '9:16' },
  { id: '16:9', label: '16:9' }
]

// 返回上一页
const goBack = () => {
  router.back()
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

// 选择输出尺寸
const selectRatio = (ratioId: string) => {
  selectedRatio.value = ratioId
}

// 一键生成
const handleGenerate = () => {
  if (!uploadedImage.value) {
    alert('请先上传产品白底图')
    return
  }
  if (!productName.value.trim()) {
    alert('请输入产品名称')
    return
  }
  alert('开始生成AI模特图...')
}
</script>

<template>
  <div class="model-image-view">
    <!-- 固定头部 -->
    <header class="fixed-header">
      <button class="back-btn" @click="goBack">
        <span class="icon">‹</span>
      </button>
      <h1 class="title">AI模特图</h1>
    </header>

    <!-- 可滚动内容区域 -->
    <div class="scrollable-content">
      <!-- 上传图片 -->
      <div class="section">
        <h2 class="section-title">上传图片</h2>
        <div class="upload-area" @click="triggerUpload">
          <div v-if="uploadedImage" class="preview-container">
            <img :src="uploadedImage" alt="Preview" class="preview-image" />
          </div>
          <div v-else class="upload-placeholder">
            <span class="upload-icon">📤</span>
            <p class="upload-text">上传产品白底图</p>
          </div>
        </div>
      </div>

      <!-- 产品名称 -->
      <div class="section">
        <h2 class="section-title">产品名称</h2>
        <input
          v-model="productName"
          type="text"
          class="text-input"
          placeholder="例如：全息影像投影仪"
        />
      </div>

      <!-- 产品描述 -->
      <div class="section">
        <h2 class="section-title">产品描述</h2>
        <textarea
          v-model="productDescription"
          class="textarea-input"
          placeholder="描述产品的主要卖点、使用场景或带来的感受，用于AI判断生成图片内容的关键词"
          rows="4"
        ></textarea>
      </div>

      <!-- 模特 -->
      <div class="section">
        <h2 class="section-title">模特</h2>
        <select v-model="selectedModel" class="select-input">
          <option v-for="option in modelOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <!-- 输出尺寸 -->
      <div class="section">
        <h2 class="section-title">输出尺寸</h2>
        <div class="ratio-grid">
          <button
            v-for="ratio in ratioOptions"
            :key="ratio.id"
            class="ratio-btn"
            :class="{ active: selectedRatio === ratio.id }"
            @click="selectRatio(ratio.id)"
          >
            {{ ratio.label }}
          </button>
        </div>
      </div>

      <!-- 一键生成按钮 -->
      <div class="generate-section">
        <button class="generate-btn" @click="handleGenerate">
          <span class="btn-text">一键生成</span>
          <span class="btn-badge">💎10点</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.model-image-view {
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
  margin-right: 48px; /* 平衡返回按钮的宽度 */
}

/* 可滚动内容 */
.scrollable-content {
  overflow-y: auto;
  height: calc(100vh - 60px);
  -webkit-overflow-scrolling: touch;
  padding-bottom: 30px;
}

/* 通用区块样式 */
.section {
  padding: 15px;
}

.section-title {
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 12px 0;
  color: #fff;
}

/* 上传区域 */
.upload-area {
  background: #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.3s ease;
}

.upload-area:hover {
  background: #333;
}

.upload-placeholder {
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.upload-icon {
  font-size: 48px;
  opacity: 0.5;
}

.upload-text {
  font-size: 15px;
  color: #999;
  margin: 0;
}

.preview-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 文本输入框 */
.text-input {
  width: 100%;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  padding: 12px 15px;
  outline: none;
  box-sizing: border-box;
}

.text-input::placeholder {
  color: #666;
}

/* 多行文本输入框 */
.textarea-input {
  width: 100%;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  padding: 12px 15px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  box-sizing: border-box;
}

.textarea-input::placeholder {
  color: #666;
}

/* 下拉选择框 */
.select-input {
  width: 100%;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  padding: 12px 15px;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  padding-right: 40px;
  box-sizing: border-box;
}

.select-input option {
  background: #2a2a2a;
  color: #fff;
}

/* 尺寸比例网格 */
.ratio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.ratio-btn {
  background: #2a2a2a;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: pre-line;
  line-height: 1.4;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70px;
}

.ratio-btn:hover {
  background: #333;
  border-color: rgba(74, 158, 255, 0.5);
}

.ratio-btn.active {
  background: rgba(74, 158, 255, 0.2);
  border-color: #4A9EFF;
  color: #4A9EFF;
}

/* 生成按钮区域 */
.generate-section {
  padding: 20px 15px;
}

.generate-btn {
  width: 100%;
  background: linear-gradient(135deg, #4A9EFF 0%, #357ABD 100%);
  border: none;
  border-radius: 25px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);
}

.generate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.4);
}

.generate-btn:active {
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
  .ratio-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  .ratio-btn {
    font-size: 13px;
    min-height: 60px;
  }
}

@media (min-width: 768px) {
  .ratio-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
