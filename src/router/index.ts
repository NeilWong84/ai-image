import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/ai-tools',
      name: 'ai-tools',
      component: () => import('../views/ai-tools/AIToolsView.vue'),
      children: [
        {
          path: 'background-replace',
          name: 'background-replace',
          component: () => import('../views/ai-tools/BackgroundReplaceView.vue'),
        },
        {
          path: 'image-matting',
          name: 'image-matting',
          component: () => import('../views/ai-tools/ImageMattingView.vue'),
        },
        {
          path: 'super-resolution',
          name: 'super-resolution',
          component: () => import('../views/ai-tools/SuperResolutionView.vue'),
        },
        {
          path: '',
          redirect: 'background-replace',
        },
      ],
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/ai-tools/SettingsView.vue'),
    },
  ],
})

export default router
