<template>
  <div class="background-replace-view">
    <h2>AI换背景</h2>
    
    <div class="tool-container">
      <div class="upload-section">
        <ImageUploader v-model="selectedImage" />
      </div>
      
      <div v-if="selectedImage" class="process-section">
        <div class="prompt-input">
          <label for="background-prompt">背景描述:</label>
          <textarea
            id="background-prompt"
            v-model="backgroundPrompt"
            placeholder="请输入您想要的背景描述，例如：沙滩、森林、办公室等"
            rows="3"
          ></textarea>
        </div>
        
        <button 
          @click="processImage" 
          class="process-btn"
          :disabled="isProcessing || !backgroundPrompt.trim()"
        >
          {{ isProcessing ? '处理中...' : '开始处理' }}
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
            <h4>换背景后</h4>
            <img :src="processedImageUrl" alt="Processed" />
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
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/modules/authStore'
import { processImage, getTaskStatus } from '@/services/api'
import { fileToBase64 } from '@/utils/fileUtils'
import ImageUploader from '@/components/ai-tools/ImageUploader.vue'

const authStore = useAuthStore()

const selectedImage = ref<File | null>(null)
const backgroundPrompt = ref('')
const isProcessing = ref(false)
const taskId = ref<string | null>(null)
const processedImageUrl = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

// 原始图片URL
const originalImageUrl = computed(() => {
  if (!selectedImage.value) return null
  return URL.createObjectURL(selectedImage.value)
})

// 处理图片
const processImage = async () => {
  if (!selectedImage.value || !backgroundPrompt.value.trim() || !authStore.isAuthenticated) {
    return
  }
  
  isProcessing.value = true
  errorMessage.value = null
  processedImageUrl.value = null
  
  try {
    // 调用API处理图片
    const response = await processImage({
      image: selectedImage.value,
      operation: 'background_replace',
      params: {
        prompt: backgroundPrompt.value.trim()
      }
    })
    
    if (response.success && response.data) {
      taskId.value = response.data.task_id
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
  link.download = 'ai-background-replaced-image.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 重置处理过程
const resetProcess = () => {
  processedImageUrl.value = null
  taskId.value = null
  backgroundPrompt.value = ''
}

// 监听认证状态
watch(() => authStore.isAuthenticated, (newVal) => {
  if (!newVal && selectedImage.value) {
    errorMessage.value = '请先在设置页面配置有效的API密钥'
  }
})
</script>

<style scoped>
.background-replace-view {
  max-width: 1000px;
  margin: 0 auto;
}

.background-replace-view h2 {
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

.prompt-input {
  margin-bottom: 20px;
}

.prompt-input label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #666;
}

.prompt-input textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  resize: vertical;
}

.prompt-input textarea:focus {
  outline: none;
  border-color: #409eff;
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