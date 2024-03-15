import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ArtisteInfo from '@/views/ArtistInfo.vue'
import TitreInfo from '@/views/TitleInfo.vue'
import AboutView from '@/views/AboutView.vue'

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
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ]
})

export default router