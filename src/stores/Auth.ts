import { apiBasePost } from '@/utils/Api'
import { defineStore } from 'pinia'
import { app } from '@/main'

type TLoginPayload = {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  getters: {},
  actions: {
    async loginApi(payload: TLoginPayload) {
      app.config.globalProperties.$toast.add({
        severity: 'success',
        summary: 'Login Success',
        life: 3000,
      })
      const response = await apiBasePost('/login', payload)
      localStorage.setItem('token', `Bearer ${response.token}`)

      return response
    },
  },
})
