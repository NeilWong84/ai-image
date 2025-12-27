<template>
  <div class="image-matting-view">
    <h2>AI抠图</h2>
    
    <div class="tool-container">
      <div class="upload-section">
        <ImageUploader v-model="selectedImage" />
      </div>
      
      <div v-if="selectedImage" class="process-section">
        <div class="options">
          <div class="option-group">
            <label class="option-label">抠图模式:</label>
            <div class="radio-group">
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="mattingMode" 
                  value="auto" 
                />
                自动抠图
              </label>
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="mattingMode" 
                  value="portrait" 
                />
                人像抠图
              </label>
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="mattingMode" 
                  value="product" 
                />
                商品抠图
              </label>
            </div>
          </div>
        </div>
        
        <button 
          @click="processImage" 
          class="process-btn"
          :disabled="isProcessing"
        >
          {{ isProcessing ? '处理中...' : '开始抠图' }}
        </button>
      </div>
      
      <div v-if="processedImageUrl" class="result-section">
        <h3>处理结果</h3>
        <div class="image-comparison">
          <div class="image-container">
            <h4>原始图片</h4>
            <img :src="originalImageUrl" alt="Original" />
          </div>
          <div class="image-container">
            <h4>抠图后</h4>
            <img :src="processedImageUrl" alt="Processed" class="transparent-bg" />
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
const mattingMode = ref<'auto' | 'portrait' | 'product'>('auto')
const isProcessing = ref(false)
const processedImageUrl = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

// 原始图片URL
const originalImageUrl = computed(() => {
  if (!selectedImage.value) return null
  return URL.createObjectURL(selectedImage.value)
})

// 处理图片
const processImage = async () => {
  if (!selectedImage.value || !authStore.isAuthenticated) {
    return
  }
  
  isProcessing.value = true
  errorMessage.value = null
  processedImageUrl.value = null
  
  try {
    // 调用API处理图片
    const response = await processImage({
      image: selectedImage.value,
      operation: 'image_matting',
      params: {
        mode: mattingMode.value
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
  link.download = 'ai-matted-image.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 重置处理过程
const resetProcess = () => {
  processedImageUrl.value = null
  mattingMode.value = 'auto'
}
</script>

<style scoped>
.image-matting-view {
  max-width: 1000px;
  margin: 0 auto;
}

.image-matting-view h2 {
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
  margin-bottom: 15px;
}

.option-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #666;
}

.radio-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.radio-option input {
  cursor: pointer;
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

.transparent-bg {
  background-image: 
    linear-gradient(45deg, #ccc 25%, transparent 25%), 
    linear-gradient(-45deg, #ccc 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #ccc 75%), 
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
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