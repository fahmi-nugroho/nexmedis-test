import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'
import HomePage from '@/views/HomePage/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
    },
  ],
})

export default router
