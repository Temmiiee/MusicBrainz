import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArtistInfo from '../views/ArtistInfo.vue'
import TitleInfo from '../views/TitleInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/artist/:id',
    name: 'ArtistInfo',
    component: ArtistInfo
  },
  {
    path: '/title/:id',
    name: 'TitleInfo',
    component: TitleInfo
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router