<template>
  <div class="super-resolution-view">
    <h2>AI高清图片</h2>
    
    <div class="tool-container">
      <div class="upload-section">
        <ImageUploader v-model="selectedImage" />
      </div>
      
      <div v-if="selectedImage" class="process-section">
        <div class="options">
          <div class="option-group">
            <label class="option-label">放大倍数:</label>
            <div class="slider-container">
              <input 
                type="range" 
                v-model.number="scaleFactor" 
                min="2" 
                max="4" 
                step="1"
                class="scale-slider"
              />
              <span class="scale-value">{{ scaleFactor }}x</span>
            </div>
          </div>
          
          <div class="option-group">
            <label class="option-label">降噪强度:</label>
            <div class="slider-container">
              <input 
                type="range" 
                v-model.number="denoiseStrength" 
                min="0" 
                max="100" 
                step="10"
                class="denoise-slider"
              />
              <span class="denoise-value">{{ denoiseStrength }}%</span>
            </div>
          </div>
        </div>
        
        <button 
          @click="processImage" 
          class="process-btn"
          :disabled="isProcessing"
        >
          {{ isProcessing ? '处理中...' : '开始高清化' }}
        </button>
      </div>
      
      <div v-if="processedImageUrl" class="result-section">
        <h3>处理结果</h3>
        <div class="image-comparison">
          <div class="image-container">
            <h4>原始图片</h4>
            <img :src="originalImageUrl" alt="Original" />
            <div class="image-info">尺寸: {{ originalWidth }} x {{ originalHeight }}</div>
          </div>
          <div class="image-container">
            <h4>高清化后</h4>
            <img :src="processedImageUrl" alt="Processed" />
            <div class="image-info">尺寸: {{ processedWidth }} x {{ processedHeight }}</div>
          </div>
        </div>
        
        <div class="result-actions">
          <button @click="downloadImage" class="btn-primary">下载图片</button>
          <button @click="resetProcess" class="btn-secondary">重新处理</button>
        </div>
      </div>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/modules/authStore'
import { processImage, getTaskStatus } from '@/services/api'
import ImageUploader from '@/components/ai-tools/ImageUploader.vue'

const authStore = useAuthStore()

const selectedImage = ref<File | null>(null)
const scaleFactor = ref<number>(2)
const denoiseStrength = ref<number>(50)
const isProcessing = ref(false)
const processedImageUrl = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

// 图片尺寸信息
const originalWidth = ref(0)
const originalHeight = ref(0)
const processedWidth = ref(0)
const processedHeight = ref(0)

// 原始图片URL
const originalImageUrl = computed(() => {
  if (!selectedImage.value) return null
  return URL.createObjectURL(selectedImage.value)
})

// 获取图片尺寸
const getImageDimensions = (imageUrl: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = imageUrl
  })
}

// 处理图片
const processImage = async () => {
  if (!selectedImage.value || !authStore.isAuthenticated) {
    return
  }
  
  isProcessing.value = true
  errorMessage.value = null
  processedImageUrl.value = null
  
  try {
    // 获取原始图片尺寸
    if (originalImageUrl.value) {
      const dimensions = await getImageDimensions(originalImageUrl.value)
      originalWidth.value = dimensions.width
      originalHeight.value = dimensions.height
      processedWidth.value = dimensions.width * scaleFactor.value
      processedHeight.value = dimensions.height * scaleFactor.value
    }
    
    // 调用API处理图片
    const response = await processImage({
      image: selectedImage.value,
      operation: 'super_resolution',
      params: {
        scale: scaleFactor.value,
        denoise: denoiseStrength.value
      }
    })
    
    if (response.success && response.data) {
      // 轮询任务状态
      await pollTaskStatus(response.data.task_id)
    } else {
      errorMessage.value = response.message || '图片处理失败'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '图片处理过程中发生错误'
  } finally {
    isProcessing.value = false
  }
}

// 轮询任务状态
const pollTaskStatus = async (taskId: string) => {
  const maxAttempts = 30 // 最大轮询次数
  let attempts = 0
  
  const poll = async () => {
    attempts++
    try {
      const response = await getTaskStatus(taskId)
      
      if (response.success && response.data) {
        switch (response.data.status) {
          case 'completed':
            processedImageUrl.value = response.data.result_url || null
            break
          case 'failed':
            errorMessage.value = '图片处理失败'
            break
          case 'processing':
          case 'pending':
            if (attempts < maxAttempts) {
              setTimeout(poll, 2000) // 2秒后继续轮询
            } else {
              errorMessage.value = '处理超时，请稍后重试'
            }
            break
        }
      } else {
        errorMessage.value = response.message || '查询任务状态失败'
      }
    } catch (error: any) {
      if (attempts < maxAttempts) {
        setTimeout(poll, 2000)
      } else {
        errorMessage.value = error.message || '查询任务状态时发生错误'
      }
    }
  }
  
  poll()
}

// 下载图片
const downloadImage = () => {
  if (!processedImageUrl.value) return
  
  const link = document.createElement('a')
  link.href = processedImageUrl.value
  link.download = 'ai-super-resolution-image.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 重置处理过程
const resetProcess = () => {
  processedImageUrl.value = null
  scaleFactor.value = 2
  denoiseStrength.value = 50
}
</script>

<style scoped>
.super-resolution-view {
  max-width: 1000px;
  margin: 0 auto;
}

.super-resolution-view h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.tool-container {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.upload-section {
  margin-bottom: 30px;
}

.process-section {
  margin-bottom: 30px;
}

.options {
  margin-bottom: 20px;
}

.option-group {
  margin-bottom: 20px;
}

.option-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #666;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.scale-slider,
.denoise-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
}

.scale-slider::-webkit-slider-thumb,
.denoise-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #409eff;
  cursor: pointer;
}

.scale-value,
.denoise-value {
  min-width: 40px;
  text-align: center;
  font-weight: 500;
  color: #333;
}

.process-btn {
  padding: 12px 24px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.process-btn:hover:not(:disabled) {
  background-color: #66b1ff;
}

.process-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.result-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.image-comparison {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.image-container {
  flex: 1;
  min-width: 300px;
}

.image-container h4 {
  margin-top: 0;
  margin-bottom: 10px;
  text-align: center;
  color: #666;
}

.image-container img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 4px;
}

.image-info {
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.result-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #66b1ff;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #666;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.error-message {
  color: #f56c6c;
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
}
</style>