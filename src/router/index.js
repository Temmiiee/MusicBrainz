import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import ArtisteInfo from '@/components/ArtisteInfo.vue'
import TitreInfo from '@/components/TitreInfo.vue'
import SearchResult from '@/components/SearchResult.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/artiste',
      name: 'artiste',
      component: ArtisteInfo
    },
    {
      path: '/titre',
      name: 'titre',
      component: TitreInfo
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResult
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
  ]
})

export default router
