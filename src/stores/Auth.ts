import { apiBasePost } from '@/utils/Api'
import { defineStore } from 'pinia'
import { app } from '@/main'

type LoginPayload = {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  getters: {},
  actions: {
    async loginApi(payload: LoginPayload) {
      app.config.globalProperties.$toast.add({
        severity: 'success',
        summary: 'Login Success',
        life: 3000,
      })
      const response = await apiBasePost('/login', payload)

      // localStorage.setItem('access_token', `Bearer ${response.payload.token}`)
      // localStorage.setItem('permission', JSON.stringify(response.payload.permissions))
      // localStorage.setItem('user', JSON.stringify(response.payload.user))

      return response
    },
  },
})
