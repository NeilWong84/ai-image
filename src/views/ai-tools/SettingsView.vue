<template>
  <div class="settings-view">
    <h2>API设置</h2>
    
    <div class="settings-card">
      <h3>RunningHub API密钥</h3>
      
      <form @submit.prevent="saveApiKey" class="api-key-form">
        <div class="form-group">
          <label for="api-key">API密钥:</label>
          <input
            id="api-key"
            v-model="apiKeyInput"
            type="password"
            placeholder="请输入您的RunningHub API密钥"
            :disabled="isChecking"
          />
        </div>
        
        <div class="form-actions">
          <button 
            type="submit" 
            class="btn-primary"
            :disabled="!apiKeyInput || isChecking"
          >
            {{ isChecking ? '验证中...' : '保存并验证' }}
          </button>
          
          <button 
            v-if="authStore.isAuthenticated" 
            type="button" 
            class="btn-secondary"
            @click="clearApiKey"
            :disabled="isChecking"
          >
            清除密钥
          </button>
        </div>
      </form>
      
      <div v-if="validationMessage" class="validation-message" :class="validationClass">
        {{ validationMessage }}
      </div>
      
      <div v-if="authStore.isAuthenticated" class="status-indicator success">
        ✅ API密钥已验证可用
      </div>
    </div>
    
    <div class="info-section">
      <h3>如何获取API密钥?</h3>
      <ol>
        <li>访问 <a href="https://www.runninghub.com" target="_blank">RunningHub官网</a></li>
        <li>注册或登录您的账户</li>
        <li>进入个人中心 -> API密钥管理</li>
        <li>创建新的API密钥或复制现有密钥</li>
        <li>将密钥粘贴到上方输入框中并保存</li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/modules/authStore'

const authStore = useAuthStore()

const apiKeyInput = ref(authStore.apiKey || '')
const isChecking = ref(false)
const validationMessage = ref('')
const validationClass = ref('')

// 保存API密钥
const saveApiKey = async () => {
  if (!apiKeyInput.value.trim()) return
  
  isChecking.value = true
  validationMessage.value = ''
  validationClass.value = ''
  
  try {
    // 设置密钥到store
    authStore.setApiToken(apiKeyInput.value.trim())
    
    // 验证密钥
    const isValid = await authStore.checkApiKey()
    
    if (isValid) {
      validationMessage.value = 'API密钥验证成功!'
      validationClass.value = 'success'
    } else {
      validationMessage.value = 'API密钥验证失败，请检查密钥是否正确'
      validationClass.value = 'error'
      authStore.clearApiToken()
    }
  } catch (error) {
    validationMessage.value = '验证过程中发生错误，请稍后重试'
    validationClass.value = 'error'
    authStore.clearApiToken()
  } finally {
    isChecking.value = false
  }
}

// 清除API密钥
const clearApiKey = () => {
  authStore.clearApiToken()
  apiKeyInput.value = ''
  validationMessage.value = 'API密钥已清除'
  validationClass.value = 'success'
}

// 组件挂载时检查当前密钥状态
onMounted(async () => {
  if (authStore.apiKey) {
    isChecking.value = true
    await authStore.checkApiKey()
    isChecking.value = false
  }
})
</script>

<style scoped>
.settings-view {
  max-width: 600px;
  margin: 0 auto;
}

.settings-view h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.settings-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.settings-card h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #409eff;
}

.form-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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

.btn-primary:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #666;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.btn-secondary:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.validation-message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 4px;
}

.validation-message.success {
  background-color: #f0f9eb;
  color: #67c23a;
  border: 1px solid #e1f3d8;
}

.validation-message.error {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fde2e2;
}

.status-indicator {
  margin-top: 16px;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
}

.status-indicator.success {
  background-color: #f0f9eb;
  color: #67c23a;
}

.info-section {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.info-section h3 {
  margin-top: 0;
  color: #333;
}

.info-section ol {
  padding-left: 20px;
}

.info-section li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.info-section a {
  color: #409eff;
  text-decoration: none;
}

.info-section a:hover {
  text-decoration: underline;
}
</style>