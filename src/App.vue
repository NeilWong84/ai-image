<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/modules/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">AI图片处理平台</h1>
        <nav class="main-nav">
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/ai-tools">AI工具</RouterLink>
          <RouterLink to="/settings">设置</RouterLink>
        </nav>
        <div class="auth-status">
          <span v-if="authStore.isAuthenticated" class="authenticated">✅ 已连接</span>
          <span v-else class="not-authenticated">❌ 未连接</span>
        </div>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <p>© 2025 AI图片处理平台 - 基于RunningHub ComfyUI技术</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
  padding: 1rem 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.app-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.main-nav a {
  text-decoration: none;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.main-nav a:hover {
  color: #409eff;
  background-color: #ecf5ff;
}

.main-nav a.router-link-exact-active {
  color: #409eff;
  background-color: #ecf5ff;
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.authenticated {
  color: #67c23a;
}

.not-authenticated {
  color: #f56c6c;
}

.app-main {
  flex: 1;
  padding: 2rem 0;
}

.app-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #eaeaea;
  padding: 1rem 2rem;
  text-align: center;
  color: #666;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-nav {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}
</style>
