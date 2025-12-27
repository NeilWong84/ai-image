// RunningHub ComfyUI API服务
import axios from 'axios'

// 创建axios实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.runninghub.com',
  timeout: 30000,
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem('runninghub_api_key')
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // API密钥无效，清除本地存储
      localStorage.removeItem('runninghub_api_key')
    }
    return Promise.reject(error)
  }
)

// API接口定义
export interface ApiKeyResponse {
  success: boolean
  message: string
  data?: {
    key: string
    expires_at: string
  }
}

export interface ImageProcessRequest {
  image: File
  operation: 'background_replace' | 'image_matting' | 'super_resolution'
  params?: Record<string, any>
}

export interface ImageProcessResponse {
  success: boolean
  message: string
  data?: {
    processed_image_url: string
    task_id: string
  }
}

export interface TaskStatusResponse {
  success: boolean
  message: string
  data?: {
    status: 'pending' | 'processing' | 'completed' | 'failed'
    result_url?: string
  }
}

// 设置API密钥
export const setApiKey = (key: string): void => {
  localStorage.setItem('runninghub_api_key', key)
}

// 获取API密钥
export const getApiKey = (): string | null => {
  return localStorage.getItem('runninghub_api_key')
}

// 验证API密钥
export const validateApiKey = async (): Promise<boolean> => {
  try {
    await apiClient.get('/api/v1/user/info')
    return true
  } catch (error) {
    return false
  }
}

// 处理图片
export const processImage = async (request: ImageProcessRequest): Promise<ImageProcessResponse> => {
  const formData = new FormData()
  formData.append('image', request.image)
  formData.append('operation', request.operation)
  
  if (request.params) {
    Object.keys(request.params).forEach(key => {
      formData.append(`params[${key}]`, request.params![key])
    })
  }

  try {
    const response = await apiClient.post<ImageProcessResponse>('/api/v1/image/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || '图片处理失败'
    }
  }
}

// 查询任务状态
export const getTaskStatus = async (taskId: string): Promise<TaskStatusResponse> => {
  try {
    const response = await apiClient.get<TaskStatusResponse>(`/api/v1/task/${taskId}`)
    return response.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || '查询任务状态失败'
    }
  }
}

export default apiClient