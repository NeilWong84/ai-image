<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Key数据接口
interface ApiKey {
  id: string
  name: string
  key: string
  isDefault: boolean
}

// RunningHub Keys
const runningHubKeys = ref<ApiKey[]>([
  { id: '1', name: 'RunningHub Key 1', key: '', isDefault: true }
])

// LiblibArt Keys
const liblibArtKeys = ref<ApiKey[]>([
  { id: '1', name: 'LiblibArt Key 1', key: '', isDefault: true }
])

// 当前编辑的key
const editingKeyType = ref<'runninghub' | 'liblibArt' | null>(null)
const editingKeyId = ref<string | null>(null)

// 从localStorage加载数据
onMounted(() => {
  loadKeysFromStorage()
})

// 加载存储的keys
const loadKeysFromStorage = () => {
  const savedRunningHubKeys = localStorage.getItem('runningHubKeys')
  const savedLiblibArtKeys = localStorage.getItem('liblibArtKeys')
  
  if (savedRunningHubKeys) {
    runningHubKeys.value = JSON.parse(savedRunningHubKeys)
  }
  
  if (savedLiblibArtKeys) {
    liblibArtKeys.value = JSON.parse(savedLiblibArtKeys)
  }
}

// 保存keys到localStorage
const saveKeysToStorage = () => {
  localStorage.setItem('runningHubKeys', JSON.stringify(runningHubKeys.value))
  localStorage.setItem('liblibArtKeys', JSON.stringify(liblibArtKeys.value))
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 添加RunningHub Key
const addRunningHubKey = () => {
  const newId = Date.now().toString()
  runningHubKeys.value.push({
    id: newId,
    name: `RunningHub Key ${runningHubKeys.value.length + 1}`,
    key: '',
    isDefault: runningHubKeys.value.length === 0
  })
}

// 添加LiblibArt Key
const addLiblibArtKey = () => {
  const newId = Date.now().toString()
  liblibArtKeys.value.push({
    id: newId,
    name: `LiblibArt Key ${liblibArtKeys.value.length + 1}`,
    key: '',
    isDefault: liblibArtKeys.value.length === 0
  })
}

// 删除RunningHub Key
const deleteRunningHubKey = (id: string) => {
  if (runningHubKeys.value.length <= 1) {
    alert('至少需要保留一个Key')
    return
  }
  
  const index = runningHubKeys.value.findIndex(k => k.id === id)
  if (index > -1) {
    const wasDefault = runningHubKeys.value[index].isDefault
    runningHubKeys.value.splice(index, 1)
    
    // 如果删除的是默认key，设置第一个为默认
    if (wasDefault && runningHubKeys.value.length > 0) {
      runningHubKeys.value[0].isDefault = true
    }
    
    saveKeysToStorage()
  }
}

// 删除LiblibArt Key
const deleteLiblibArtKey = (id: string) => {
  if (liblibArtKeys.value.length <= 1) {
    alert('至少需要保留一个Key')
    return
  }
  
  const index = liblibArtKeys.value.findIndex(k => k.id === id)
  if (index > -1) {
    const wasDefault = liblibArtKeys.value[index].isDefault
    liblibArtKeys.value.splice(index, 1)
    
    // 如果删除的是默认key，设置第一个为默认
    if (wasDefault && liblibArtKeys.value.length > 0) {
      liblibArtKeys.value[0].isDefault = true
    }
    
    saveKeysToStorage()
  }
}

// 设置RunningHub默认Key
const setRunningHubDefault = (id: string) => {
  runningHubKeys.value.forEach(k => {
    k.isDefault = k.id === id
  })
  saveKeysToStorage()
}

// 设置LiblibArt默认Key
const setLiblibArtDefault = (id: string) => {
  liblibArtKeys.value.forEach(k => {
    k.isDefault = k.id === id
  })
  saveKeysToStorage()
}

// 保存所有设置
const saveAll = () => {
  saveKeysToStorage()
  alert('保存成功！')
}
</script>

<template>
  <div class="key-management-view">
    <!-- 固定头部 -->
    <header class="fixed-header">
      <button class="back-btn" @click="goBack">
        <span class="icon">‹</span>
      </button>
      <h1 class="title">AI Key维护</h1>
      <button class="save-btn" @click="saveAll">
        <span class="save-text">保存</span>
      </button>
    </header>

    <div class="scrollable-content">
      <!-- RunningHub Keys -->
      <div class="key-section">
        <div class="section-header">
          <h2 class="section-title">RunningHub API Keys</h2>
          <button class="add-btn" @click="addRunningHubKey">
            <span class="plus-icon">+</span>
            <span>添加</span>
          </button>
        </div>

        <div class="keys-list">
          <div 
            v-for="keyItem in runningHubKeys" 
            :key="keyItem.id"
            class="key-item"
          >
            <div class="key-header">
              <input 
                v-model="keyItem.name" 
                type="text" 
                class="key-name-input"
                placeholder="Key名称"
                @blur="saveKeysToStorage"
              />
              <button 
                v-if="runningHubKeys.length > 1"
                class="delete-btn" 
                @click="deleteRunningHubKey(keyItem.id)"
              >
                <span class="delete-icon">×</span>
              </button>
            </div>

            <div class="key-input-group">
              <input 
                v-model="keyItem.key" 
                type="text" 
                class="key-input"
                placeholder="请输入RunningHub API Key"
                @blur="saveKeysToStorage"
              />
            </div>

            <div class="key-footer">
              <label class="default-checkbox">
                <input 
                  type="radio" 
                  :name="'runninghub-default'"
                  :checked="keyItem.isDefault"
                  @change="setRunningHubDefault(keyItem.id)"
                />
                <span class="checkbox-label">设为默认</span>
              </label>
              <span v-if="keyItem.isDefault" class="default-badge">默认</span>
            </div>
          </div>
        </div>
      </div>

      <!-- LiblibArt Keys -->
      <div class="key-section">
        <div class="section-header">
          <h2 class="section-title">LiblibArt API Keys</h2>
          <button class="add-btn" @click="addLiblibArtKey">
            <span class="plus-icon">+</span>
            <span>添加</span>
          </button>
        </div>

        <div class="keys-list">
          <div 
            v-for="keyItem in liblibArtKeys" 
            :key="keyItem.id"
            class="key-item"
          >
            <div class="key-header">
              <input 
                v-model="keyItem.name" 
                type="text" 
                class="key-name-input"
                placeholder="Key名称"
                @blur="saveKeysToStorage"
              />
              <button 
                v-if="liblibArtKeys.length > 1"
                class="delete-btn" 
                @click="deleteLiblibArtKey(keyItem.id)"
              >
                <span class="delete-icon">×</span>
              </button>
            </div>

            <div class="key-input-group">
              <input 
                v-model="keyItem.key" 
                type="text" 
                class="key-input"
                placeholder="请输入LiblibArt API Key"
                @blur="saveKeysToStorage"
              />
            </div>

            <div class="key-footer">
              <label class="default-checkbox">
                <input 
                  type="radio" 
                  :name="'liblibArt-default'"
                  :checked="keyItem.isDefault"
                  @change="setLiblibArtDefault(keyItem.id)"
                />
                <span class="checkbox-label">设为默认</span>
              </label>
              <span v-if="keyItem.isDefault" class="default-badge">默认</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="tips-section">
        <h3 class="tips-title">💡 使用说明</h3>
        <ul class="tips-list">
          <li>可以添加多个API Key，系统会自动使用默认Key</li>
          <li>每个平台至少需要保留一个Key</li>
          <li>修改后请点击右上角"保存"按钮</li>
          <li>API Key会安全保存在本地浏览器中</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.key-management-view {
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
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
  justify-content: space-between;
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
  min-width: 40px;
}

.back-btn .icon {
  font-size: 28px;
  line-height: 1;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.save-btn {
  background: #4A9EFF;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background: #3d8ae6;
  box-shadow: 0 2px 10px rgba(74, 158, 255, 0.3);
}

/* 可滚动内容 */
.scrollable-content {
  overflow-y: auto;
  height: calc(100vh - 60px);
  -webkit-overflow-scrolling: touch;
  padding: 20px 15px;
}

/* Key区域 */
.key-section {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(74, 158, 255, 0.2);
  border: 1px solid #4A9EFF;
  border-radius: 20px;
  color: #4A9EFF;
  padding: 6px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: rgba(74, 158, 255, 0.3);
  box-shadow: 0 2px 8px rgba(74, 158, 255, 0.3);
}

.plus-icon {
  font-size: 18px;
  font-weight: bold;
}

/* Keys列表 */
.keys-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.key-item {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.key-item:hover {
  border-color: rgba(74, 158, 255, 0.3);
  box-shadow: 0 2px 10px rgba(74, 158, 255, 0.1);
}

.key-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.key-name-input {
  flex: 1;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  padding: 10px 12px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
}

.key-name-input:focus {
  border-color: #4A9EFF;
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
}

.delete-btn {
  width: 32px;
  height: 32px;
  background: rgba(255, 68, 68, 0.2);
  border: 1px solid #ff4444;
  border-radius: 50%;
  color: #ff4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: rgba(255, 68, 68, 0.3);
  transform: scale(1.1);
}

.delete-icon {
  font-size: 24px;
  line-height: 1;
}

.key-input-group {
  margin-bottom: 12px;
}

.key-input {
  width: 100%;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  outline: none;
  transition: all 0.3s ease;
}

.key-input:focus {
  border-color: #4A9EFF;
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
}

.key-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.default-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.default-checkbox input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #4A9EFF;
}

.checkbox-label {
  color: #999;
  font-size: 14px;
}

.default-badge {
  background: linear-gradient(135deg, #4A9EFF 0%, #3d8ae6 100%);
  color: #fff;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

/* 使用说明 */
.tips-section {
  background: rgba(74, 158, 255, 0.1);
  border: 1px solid rgba(74, 158, 255, 0.3);
  border-radius: 12px;
  padding: 15px;
  margin-top: 20px;
}

.tips-title {
  font-size: 16px;
  font-weight: 600;
  color: #4A9EFF;
  margin: 0 0 10px 0;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
  color: #999;
  font-size: 13px;
  line-height: 1.8;
}

.tips-list li {
  margin-bottom: 5px;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .scrollable-content {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
