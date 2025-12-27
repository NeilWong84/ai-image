<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 移动端优化 */
body {
  /* 禁止双击缩放 */
  touch-action: manipulation;
  /* 禁止长按选择文本 */
  -webkit-user-select: none;
  user-select: none;
  /* 优化移动端点击延迟 */
  -webkit-tap-highlight-color: transparent;
}

/* APP容器全屏 */
.app-container {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  /* 移动端滚动优化 */
  -webkit-overflow-scrolling: touch;
}

/* 适配安全区域（针对刘海屏等） - 仅顶部和底部 */
@supports (padding: max(0px)) {
  .app-container {
    padding-top: max(0px, env(safe-area-inset-top));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}

/* 响应式字体大小 */
@media screen and (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  html {
    font-size: 12px;
  }
}

/* 横屏适配 */
@media screen and (orientation: landscape) and (max-height: 500px) {
  .app-container {
    height: auto;
    min-height: 100vh;
  }
}

/* APP端适配 */
@media screen and (max-width: 768px) {
  /* 隐藏滚动条但保持滚动功能 */
  .app-container::-webkit-scrollbar {
    display: none;
  }
  
  .app-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* 超大屏幕适配 */
@media screen and (min-width: 1920px) {
  html {
    font-size: 18px;
  }
}
</style>
