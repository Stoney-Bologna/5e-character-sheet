import { createRouter, createWebHistory } from 'vue-router'
import SheetView from '../views/SheetView.vue'
import SaveLoadView from '../views/SaveLoadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sheet',
      component: SheetView
    },
    {
      path: '/save-load',
      name: 'save-load',
      component: SaveLoadView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.  
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
