import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 根据模式设置不同的配置
  const isApp = mode === 'app'
  const isMobile = mode === 'mobile'
  
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    base: isApp ? './' : '/',
    build: {
      outDir: isApp ? 'dist-app' : isMobile ? 'dist-mobile' : 'dist',
      assetsDir: 'assets',
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name].[hash].[ext]'
            }
            return 'assets/[name].[hash].[ext]'
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version || '1.0.0'),
    },
  }
})
