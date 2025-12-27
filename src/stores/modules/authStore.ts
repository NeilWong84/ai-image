import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setApiKey, getApiKey, validateApiKey } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const apiKey = ref<string | null>(getApiKey())
  const isAuthenticated = ref<boolean>(!!apiKey.value)
  const isChecking = ref<boolean>(false)

  // 设置API密钥
  const setApiToken = (token: string) => {
    apiKey.value = token
    isAuthenticated.value = true
    setApiKey(token)
  }

  // 清除API密钥
  const clearApiToken = () => {
    apiKey.value = null
    isAuthenticated.value = false
    localStorage.removeItem('runninghub_api_key')
  }

  // 验证API密钥
  const checkApiKey = async () => {
    if (!apiKey.value) {
      isAuthenticated.value = false
      return false
    }

    isChecking.value = true
    try {
      const isValid = await validateApiKey()
      isAuthenticated.value = isValid
      if (!isValid) {
        clearApiToken()
      }
      return isValid
    } finally {
      isChecking.value = false
    }
  }

  return {
    apiKey,
    isAuthenticated,
    isChecking,
    setApiToken,
    clearApiToken,
    checkApiKey
  }
})