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
      meta: {
        requiresAuth: true,
      },
      component: HomePage,
    },
    { path: '/:pathMatch(.*)*', redirect: '/homepage' },
  ],
})

function isAuthenticated() {
  return localStorage.getItem('token') !== null
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else if (to.path == '/login') {
    if (isAuthenticated()) {
      next({
        path: '/homepage',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
