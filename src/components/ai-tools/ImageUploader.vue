<template>
  <div class="image-uploader">
    <div 
      class="upload-area" 
      :class="{ 'drag-over': isDragOver }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input 
        ref="fileInputRef"
        type="file" 
        accept="image/*" 
        @change="handleFileSelect"
        class="file-input"
      />
      
      <div v-if="!previewUrl" class="upload-placeholder">
        <div class="upload-icon">📁</div>
        <p>点击选择图片或拖拽图片到此处</p>
        <p class="hint">支持 JPG、PNG、WEBP 格式，大小不超过 10MB</p>
      </div>
      
      <div v-else class="preview-container">
        <img :src="previewUrl" alt="Preview" class="preview-image" />
        <button type="button" class="change-btn" @click.stop="triggerFileInput">
          更换图片
        </button>
      </div>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { isImageFile, isFileSizeValid } from '@/utils/fileUtils'

interface Props {
  modelValue?: File | null
}

interface Emits {
  (e: 'update:modelValue', value: File | null): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const previewUrl = ref<string | null>(null)
const error = ref<string | null>(null)

// 触发文件选择
const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

// 处理文件选择
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    validateAndSetFile(file)
  }
}

// 处理拖拽事件
const handleDragOver = () => {
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0]
    validateAndSetFile(file)
  }
}

// 验证并设置文件
const validateAndSetFile = (file: File) => {
  error.value = null
  
  // 检查文件类型
  if (!isImageFile(file)) {
    error.value = '请选择有效的图片文件 (JPG、PNG、WEBP)'
    return
  }
  
  // 检查文件大小
  if (!isFileSizeValid(file)) {
    error.value = '图片大小不能超过 10MB'
    return
  }
  
  // 设置文件并生成预览
  emit('update:modelValue', file)
  generatePreview(file)
}

// 生成预览图
const generatePreview = (file: File) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  
  previewUrl.value = URL.createObjectURL(file)
}

// 监听modelValue变化
watch(() => props.modelValue, (newFile) => {
  if (!newFile) {
    // 清除预览
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = null
    }
    // 清除文件输入
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
})

// 组件卸载时清理
// onUnmounted(() => {
//   if (previewUrl.value) {
//     URL.revokeObjectURL(previewUrl.value)
//   }
// })
</script>

<style scoped>
.image-uploader {
  width: 100%;
}

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: #409eff;
  background-color: #f5f9ff;
}

.file-input {
  display: none;
}

.upload-placeholder {
  color: #999;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hint {
  font-size: 0.875rem;
  color: #ccc;
  margin-top: 0.5rem;
}

.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.change-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.change-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

.error-message {
  color: #f56c6c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
}
</style>