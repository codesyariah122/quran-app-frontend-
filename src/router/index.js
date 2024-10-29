/**
 * @author Puji Ermanto <pujiermanto@gmail.com>
 * @since 2.0
 * @callback
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurahView from '../views/SurahView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/surah/:num',
    name: 'surah',
    component: SurahView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
