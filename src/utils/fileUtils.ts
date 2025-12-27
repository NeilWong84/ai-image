// 文件处理工具函数

// 检查文件类型是否为图片
export const isImageFile = (file: File): boolean => {
  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  return acceptedImageTypes.includes(file.type)
}

// 检查文件大小是否符合要求 (默认最大10MB)
export const isFileSizeValid = (file: File, maxSizeInMB: number = 10): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

// 将文件转换为Base64格式
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

// 从URL下载图片并返回Blob
export const downloadImageAsBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`下载图片失败: ${response.status} ${response.statusText}`)
  }
  return await response.blob()
}

// 从Blob创建File对象
export const blobToFile = (blob: Blob, filename: string): File => {
  return new File([blob], filename, { type: blob.type })
}

// 获取文件扩展名
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}