<template>
  <div class="ai-tools-view">
    <header class="header">
      <h1>AI图片处理工具</h1>
      <nav class="nav">
        <router-link to="/ai-tools/background-replace" class="nav-item" active-class="active">
          AI换背景
        </router-link>
        <router-link to="/ai-tools/image-matting" class="nav-item" active-class="active">
          AI抠图
        </router-link>
        <router-link to="/ai-tools/super-resolution" class="nav-item" active-class="active">
          AI高清图片
        </router-link>
        <router-link to="/settings" class="nav-item settings" active-class="active">
          设置
        </router-link>
      </nav>
    </header>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// AI工具主视图组件
</script>

<style scoped>
.ai-tools-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.nav-item {
  padding: 10px 20px;
  text-decoration: none;
  color: #666;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid #ddd;
}

.nav-item:hover {
  color: #409eff;
  border-color: #409eff;
}

.nav-item.active {
  color: #409eff;
  border-color: #409eff;
  background-color: #ecf5ff;
}

.settings {
  background-color: #f5f5f5;
}

.main-content {
  min-height: 500px;
}
</style>