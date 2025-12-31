<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// 定义props
defineProps<{
  visible: boolean
}>()

// 定义事件
const emit = defineEmits<{
  close: []
  upload: [type: 'camera' | 'album']
}>()

// 关闭弹窗
const handleClose = () => {
  emit('close')
}

// 拍照上传
const handleCamera = () => {
  emit('upload', 'camera')
}

// 相册上传
const handleAlbum = () => {
  emit('upload', 'album')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="visible" class="modal-overlay" @click="handleClose">
      <div class="modal-container" @click.stop>
        <!-- 弹窗头部 -->
        <div class="modal-header">
          <h2 class="modal-title">AI图片识别</h2>
          <button class="close-btn" @click="handleClose">
            <span class="close-icon">✕</span>
          </button>
        </div>

        <!-- 流程展示区域 -->
        <div class="process-area">
          <div class="process-flow">
            <!-- 上传图片 -->
            <div class="flow-item">
              <div class="flow-icon-box">
                <span class="flow-icon">🖼️</span>
              </div>
              <p class="flow-text">上传图片</p>
            </div>

            <!-- 箭头 -->
            <div class="flow-arrow">
              <span>→</span>
            </div>

            <!-- 自动识别 -->
            <div class="flow-item">
              <div class="flow-text-box">
                <span class="flow-text-auto">自动识别</span>
              </div>
            </div>

            <!-- 箭头 -->
            <div class="flow-arrow">
              <span>→</span>
            </div>

            <!-- 生成Excel表格 -->
            <div class="flow-item">
              <div class="flow-icon-box">
                <span class="flow-icon excel">📊</span>
              </div>
              <p class="flow-text">生成Excel表格</p>
            </div>
          </div>
        </div>

        <!-- 底部按钮区域 -->
        <div class="button-area">
          <button class="action-btn camera-btn" @click="handleCamera">
            <span class="btn-icon">📷</span>
            <span class="btn-text">拍照上传</span>
          </button>
          <button class="action-btn album-btn" @click="handleAlbum">
            <span class="btn-icon">🖼️</span>
            <span class="btn-text">相册上传</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 弹窗过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(100%);
}

/* 遮罩层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 2000;
  padding: 0;
}

/* 弹窗容器 */
.modal-container {
  width: 100%;
  max-width: 600px;
  background: #2a2a2a;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
}

/* 弹窗头部 */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #999;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.close-icon {
  font-size: 20px;
  font-weight: bold;
}

/* 流程展示区域 */
.process-area {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 30px 20px;
  margin-bottom: 20px;
}

.process-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.flow-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.flow-icon-box {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.flow-text-box {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flow-icon {
  font-size: 36px;
}

.flow-icon.excel {
  font-size: 32px;
}

.flow-text-auto {
  color: #999;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
}

.flow-text {
  color: #ccc;
  font-size: 13px;
  text-align: center;
  margin: 0;
  line-height: 1.4;
}

.flow-arrow {
  color: #666;
  font-size: 20px;
  flex-shrink: 0;
}

/* 底部按钮区域 */
.button-area {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  height: 50px;
  border-radius: 25px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.camera-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.camera-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.album-btn {
  background: linear-gradient(135deg, #4A9EFF 0%, #357ABD 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);
}

.album-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.4);
}

.btn-icon {
  font-size: 20px;
}

.btn-text {
  font-size: 15px;
}

/* 响应式 */
@media (max-width: 480px) {
  .flow-icon-box {
    width: 70px;
    height: 70px;
  }
  
  .flow-icon {
    font-size: 30px;
  }
  
  .flow-text {
    font-size: 12px;
  }
  
  .flow-arrow {
    font-size: 16px;
  }
}
</style>
