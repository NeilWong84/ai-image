<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 已保存的次数
const savedCount = ref(5)

// 当前选中的tab
const currentTab = ref('attachment')

// 背景图列表
const backgrounds = [
  { id: 'none', name: '无', image: null },
  { id: 'white', name: '白底图', image: null },
  { id: 'bg2', name: '背景2', image: 'https://picsum.photos/400/400?random=1' },
  { id: 'bg3', name: '背景3', image: 'https://picsum.photos/400/400?random=2' },
  { id: 'bg4', name: '背景4', image: 'https://picsum.photos/400/400?random=3' },
  { id: 'bg5', name: '背景5', image: 'https://picsum.photos/400/400?random=4' },
]

// 选中的背景
const selectedBackground = ref('white')

// 附图列表
const attachments = [
  { id: 'none', name: '无', image: null },
  { id: 'white', name: '白底图', image: null },
  { id: 'bg2', name: '背景2', image: 'https://picsum.photos/400/400?random=20' },
  { id: 'bg3', name: '背景3', image: 'https://picsum.photos/400/400?random=21' },
  { id: 'bg4', name: '背景4', image: 'https://picsum.photos/400/400?random=22' },
  { id: 'bg5', name: '背景5', image: 'https://picsum.photos/400/400?random=23' },
]

// 选中的附图
const selectedAttachment = ref('white')

// 上传的图片
const uploadedImage = ref<string | null>(null)

// tabs配置
const tabs = [
  { key: 'background', label: '背景图' },
  { key: 'template', label: '产品图模板' },
  { key: 'attachment', label: '附图' },
  { key: 'content', label: '内容填写' },
]

// 产品图模板列表
const templates = [
  { 
    id: 'template1', 
    name: '已选择(模板1)', 
    image: 'https://picsum.photos/200/300?random=10',
    productName: '产品名',
    size: '27cm',
    sizeLabel: '放大',
    code: 'JR0421',
    additional: '210mm羊绒混纺85cm无边'
  },
  { 
    id: 'template2', 
    name: '模板2', 
    image: 'https://picsum.photos/200/300?random=11',
    productName: '产品名',
    size: '27cm',
    sizeLabel: '放大',
    code: 'JR0421',
    additional: '210mm羊绒混纺85cm无边'
  },
  { 
    id: 'template3', 
    name: '模板2', 
    image: 'https://picsum.photos/200/300?random=12',
    productName: '产品名',
    size: '27cm',
    sizeLabel: '放大',
    code: 'JR0421',
    additional: '210mm羊绒混纺85cm无边'
  },
  { 
    id: 'template4', 
    name: '模板3', 
    image: 'https://picsum.photos/200/300?random=13',
    productName: '产品名',
    size: '27cm',
    sizeLabel: '放大',
    code: 'JR0421',
    additional: '210mm羊绒混纺85cm无边'
  },
  { 
    id: 'template5', 
    name: '模板4', 
    image: 'https://picsum.photos/200/300?random=14',
    productName: '产品名',
    size: '27cm',
    sizeLabel: '放大',
    code: 'JR0421',
    additional: '210mm羊绒混纺85cm无边'
  },
  { 
    id: 'custom', 
    name: '定制模板',
    isCustom: true
  },
]

// 选中的模板
const selectedTemplate = ref('template1')

// 内容填写表单数据
const contentForm = ref({
  productCode: '6584-002',
  chineseName: '毛呗大衣咖啡色年轻漂亮',
  unitPrice: '128',
  boxCount: '24',
  packingCount: '12',
  volume: '0.1',
  weight: '0.6',
  material: '毛呗'
})

// 返回上一页
const goBack = () => {
  router.back()
}

// 查看记录
const viewRecords = () => {
  router.push('/product-detail')
}

// 保存
const handleSave = () => {
  savedCount.value++
  alert('保存成功！')
}

// 切换tab
const switchTab = (key: string) => {
  currentTab.value = key
}

// 选择背景
const selectBackground = (id: string) => {
  selectedBackground.value = id
}

// 选择模板
const selectTemplate = (id: string) => {
  if (id === 'custom') {
    alert('联系客服定制专属模板')
    return
  }
  selectedTemplate.value = id
}

// 选择附图
const selectAttachment = (id: string) => {
  selectedAttachment.value = id
}

// 触发文件上传
const triggerUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        uploadedImage.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// 一键抠图
const removeBackground = () => {
  alert('一键抠图功能开发中...')
}
</script>

<template>
  <div class="product-image-view">
    <!-- 固定头部 -->
    <header class="fixed-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">
          <span class="icon">‹</span>
        </button>
        <button class="record-btn" @click="viewRecords">
          <span class="text">记录</span>
        </button>
      </div>
      
      <h1 class="page-title">AI产品图</h1>
      
      <button class="save-btn" @click="handleSave">
        <span class="save-text">保存</span>
        <span class="badge">💎 {{ savedCount }}</span>
      </button>
    </header>

    <!-- 可滚动内容区域 -->
    <div class="scrollable-content">
      <!-- 上传区域 -->
      <div class="upload-area">
        <div v-if="!uploadedImage" class="upload-placeholder" @click="triggerUpload">
          <div class="upload-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M30 15L30 45M15 30L45 30" stroke="#666" stroke-width="3" stroke-linecap="round"/>
              <path d="M20 20L30 10L40 20" stroke="#666" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="upload-text">上传图片</p>
        </div>
        
        <div v-else class="uploaded-image-container">
          <img :src="uploadedImage" alt="Uploaded" class="uploaded-image" />
        </div>
        
        <button class="cutout-btn" @click="removeBackground">
          <span class="icon">✂️</span>
          <span>一键抠图</span>
        </button>
      </div>

      <!-- Tab导航 -->
      <div class="tabs-container">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-item"
            :class="{ active: currentTab === tab.key }"
            @click="switchTab(tab.key)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- 背景图选择 -->
      <div v-if="currentTab === 'background'" class="background-grid">
        <div
          v-for="bg in backgrounds"
          :key="bg.id"
          class="background-item"
          :class="{ selected: selectedBackground === bg.id }"
          @click="selectBackground(bg.id)"
        >
          <div v-if="bg.id === 'none'" class="empty-bg">
            <span class="empty-icon">🚫</span>
          </div>
          <div v-else-if="bg.id === 'white'" class="white-bg"></div>
          <img v-else :src="bg.image" :alt="bg.name" class="bg-image" />
          <p class="bg-name">{{ bg.name }}</p>
        </div>
      </div>

      <!-- 产品图模板 -->
      <div v-else-if="currentTab === 'template'" class="template-grid">
        <div
          v-for="template in templates"
          :key="template.id"
          class="template-item"
          :class="{ 
            selected: selectedTemplate === template.id,
            custom: template.isCustom 
          }"
          @click="selectTemplate(template.id)"
        >
          <!-- 定制模板 -->
          <div v-if="template.isCustom" class="custom-template">
            <div class="custom-content">
              <h3 class="custom-title">定制模板</h3>
              <p class="custom-subtitle">联系客服定制</p>
            </div>
          </div>
          
          <!-- 普通模板 -->
          <div v-else class="template-card">
            <div class="template-logo">logo</div>
            <div class="template-header">
              <span class="template-product-name">{{ template.productName }}</span>
            </div>
            <div class="template-images">
              <img :src="template.image" :alt="template.name" class="template-main-image" />
              <img :src="template.image" :alt="template.name" class="template-sub-image" />
            </div>
            <div class="template-info">
              <div class="size-info">
                <span class="size">{{ template.size }}</span>
                <span class="size-label">{{ template.sizeLabel }}</span>
              </div>
              <div class="additional-info">{{ template.additional }}</div>
            </div>
            <div class="template-code">{{ template.code }}</div>
          </div>
          
          <p class="template-name" v-if="!template.isCustom">{{ template.name }}</p>
        </div>
      </div>

      <!-- 内容填写 -->
      <div v-else-if="currentTab === 'content'" class="content-form">
        <!-- 货号 -->
        <div class="form-item">
          <label class="form-label">货    号：</label>
          <input 
            v-model="contentForm.productCode" 
            type="text" 
            class="form-input"
            placeholder="请输入货号"
          />
        </div>

        <!-- 中文名 -->
        <div class="form-item">
          <label class="form-label">中文名：</label>
          <input 
            v-model="contentForm.chineseName" 
            type="text" 
            class="form-input"
            placeholder="请输入中文名"
          />
        </div>

        <!-- 单价和箱数 -->
        <div class="form-row">
          <div class="form-item form-item-half">
            <label class="form-label">单    价：</label>
            <div class="price-input-wrapper">
              <span class="price-symbol">￥</span>
              <input 
                v-model="contentForm.unitPrice" 
                type="text" 
                class="form-input price-input"
                placeholder="请输入单价"
              />
            </div>
          </div>
          <div class="form-item form-item-half">
            <label class="form-label">箱数：</label>
            <input 
              v-model="contentForm.boxCount" 
              type="text" 
              class="form-input"
              placeholder="请输入箱数"
            />
          </div>
        </div>

        <!-- 规格信息 -->
        <div class="spec-grid">
          <div class="spec-item">
            <label class="spec-label">装箱数</label>
            <input 
              v-model="contentForm.packingCount" 
              type="text" 
              class="spec-input"
            />
          </div>
          <div class="spec-item">
            <label class="spec-label">体积</label>
            <input 
              v-model="contentForm.volume" 
              type="text" 
              class="spec-input"
            />
          </div>
          <div class="spec-item">
            <label class="spec-label">重量</label>
            <input 
              v-model="contentForm.weight" 
              type="text" 
              class="spec-input"
            />
          </div>
          <div class="spec-item">
            <label class="spec-label">材质</label>
            <input 
              v-model="contentForm.material" 
              type="text" 
              class="spec-input"
            />
          </div>
        </div>
      </div>

      <!-- 附图 -->
      <div v-else-if="currentTab === 'attachment'" class="attachment-grid">
        <div
          v-for="attachment in attachments"
          :key="attachment.id"
          class="attachment-item"
          :class="{ selected: selectedAttachment === attachment.id }"
          @click="selectAttachment(attachment.id)"
        >
          <div v-if="attachment.id === 'none'" class="empty-attachment">
            <span class="empty-icon">🚫</span>
          </div>
          <div v-else-if="attachment.id === 'white'" class="white-attachment"></div>
          <img v-else :src="attachment.image" :alt="attachment.name" class="attachment-image" />
          <p class="attachment-name">{{ attachment.name }}</p>
        </div>
      </div>

      <!-- 其他tab内容占位 -->
      <div v-else class="tab-content-placeholder">
        <p>{{ tabs.find(t => t.key === currentTab)?.label }} 功能开发中...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-image-view {
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
  position: relative;
  padding-top: 60px; /* 为固定头部留出空间 */
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

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
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

.record-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  padding: 8px 12px;
  transition: color 0.3s ease;
}

.record-btn:hover {
  color: #4A9EFF;
}

.page-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #4A9EFF;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 15px;
}

.badge {
  font-size: 14px;
}

/* 可滚动内容 */
.scrollable-content {
  overflow-y: auto;
  height: calc(100vh - 60px);
  -webkit-overflow-scrolling: touch;
}

/* 上传区域 */
.upload-area {
  background: #2a2a2a;
  margin: 15px;
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.upload-placeholder {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #444;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-placeholder:hover {
  border-color: #4A9EFF;
  background: rgba(74, 158, 255, 0.05);
}

.upload-icon {
  margin-bottom: 15px;
}

.upload-text {
  color: #999;
  font-size: 16px;
  margin: 0;
}

.uploaded-image-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  border-radius: 8px;
}

.uploaded-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.cutout-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  backdrop-filter: blur(10px);
}

.cutout-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

/* Tab导航 */
.tabs-container {
  background: #000;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs {
  display: flex;
  width: 100%;
}

.tab-item {
  flex: 1;
  background: none;
  border: none;
  color: #999;
  padding: 15px 0;
  cursor: pointer;
  font-size: 15px;
  white-space: nowrap;
  position: relative;
  transition: color 0.3s ease;
  text-align: center;
}

.tab-item.active {
  color: #fff;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #4A9EFF;
  border-radius: 3px 3px 0 0;
}

/* 背景图网格 */
.background-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 15px;
}

.background-item {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.background-item.selected {
  border-color: #4A9EFF;
  box-shadow: 0 0 15px rgba(74, 158, 255, 0.3);
}

.empty-bg,
.white-bg,
.bg-image {
  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2a2a2a;
}

.empty-bg {
  font-size: 40px;
}

.white-bg {
  background: #fff;
}

.bg-name {
  text-align: center;
  padding: 8px;
  font-size: 13px;
  color: #ccc;
  margin: 0;
  background: #1a1a1a;
}

/* 产品图模板网格 */
.template-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
}

.template-item {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  background: #2a2a2a;
}

.template-item.selected {
  border-color: #4A9EFF;
  box-shadow: 0 0 15px rgba(74, 158, 255, 0.3);
}

.template-item.custom {
  border-color: transparent;
}

.template-item:hover {
  transform: translateY(-2px);
}

/* 定制模板 */
.custom-template {
  aspect-ratio: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.custom-content {
  text-align: center;
}

.custom-title {
  color: #ff4444;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.custom-subtitle {
  color: #999;
  font-size: 13px;
  margin: 0;
}

/* 普通模板卡片 */
.template-card {
  background: #fff;
  aspect-ratio: 0.7;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.template-logo {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #4A9EFF;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  z-index: 1;
}

.template-header {
  background: #4A9EFF;
  color: #fff;
  padding: 8px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
}

.template-images {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: #f5f5f5;
  position: relative;
}

.template-main-image {
  width: 55%;
  height: 100%;
  object-fit: contain;
}

.template-sub-image {
  width: 30%;
  height: 60%;
  object-fit: contain;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.template-info {
  padding: 8px;
  background: #fff;
  border-top: 1px solid #e5e5e5;
}

.size-info {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.size {
  color: #333;
  font-size: 13px;
  font-weight: 600;
}

.size-label {
  color: #666;
  font-size: 11px;
}

.additional-info {
  color: #999;
  font-size: 10px;
  line-height: 1.3;
}

.template-code {
  background: #333;
  color: #fff;
  padding: 6px 8px;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.template-name {
  text-align: center;
  padding: 10px 8px;
  font-size: 13px;
  color: #ccc;
  margin: 0;
  background: #1a1a1a;
}

/* 内容填写表单 */
.content-form {
  padding: 20px 15px;
}

.form-item {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.form-item-half {
  flex: 1;
  margin-bottom: 0;
}

.form-label {
  display: block;
  color: #999;
  font-size: 14px;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  padding: 12px 15px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #4A9EFF;
  background: #333;
}

.form-input::placeholder {
  color: #666;
}

.price-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.price-symbol {
  color: #ff4444;
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
}

.price-input {
  flex: 1;
  color: #ff4444;
  font-weight: 600;
  padding-left: 10px;
}

/* 规格信息网格 */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 25px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spec-label {
  color: #999;
  font-size: 13px;
  margin-bottom: 8px;
  white-space: nowrap;
}

.spec-input {
  width: 100%;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 8px;
  text-align: center;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.spec-input:focus {
  border-color: #4A9EFF;
  background: #333;
}

/* 附图网格 */
.attachment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
}

.attachment-item {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  background: #2a2a2a;
}

.attachment-item.selected {
  border-color: #4A9EFF;
  box-shadow: 0 0 15px rgba(74, 158, 255, 0.3);
}

.attachment-item:hover {
  transform: translateY(-2px);
}

.empty-attachment,
.white-attachment,
.attachment-image {
  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
}

.empty-attachment {
  font-size: 60px;
  background: #2a2a2a;
}

.white-attachment {
  background: #fff;
}

.attachment-name {
  text-align: center;
  padding: 10px 8px;
  font-size: 13px;
  color: #ccc;
  margin: 0;
  background: #1a1a1a;
}

/* Tab内容占位 */
.tab-content-placeholder {
  padding: 60px 15px;
  text-align: center;
  color: #666;
}

/* 响应式 */
@media (max-width: 480px) {
  .background-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .template-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .attachment-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .spec-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  
  .spec-input {
    font-size: 14px;
    padding: 10px 5px;
  }
}

@media (min-width: 768px) {
  .background-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .template-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .attachment-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .spec-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>