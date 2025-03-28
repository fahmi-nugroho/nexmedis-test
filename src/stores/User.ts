import { apiBasePost, apiBaseGet, apiBasePut, apiBaseDelete } from '@/utils/Api'
import { defineStore } from 'pinia'

type TUserPayload = {
  name: string
  job: string
}

export const useUserStore = defineStore('user', {
  state: () => ({}),
  getters: {},
  actions: {
    async listUser(page: number) {
      const response = await apiBaseGet(`/users?page=${page}`, {})
      return response
    },
    async createUser(payload: TUserPayload) {
      const response = await apiBasePost(`/users`, payload)
      return response
    },
    async editUser(id: number, payload: TUserPayload) {
      const response = await apiBasePut(`/users/${id}`, payload)
      return response
    },
    async deleteUser(id: number) {
      const response = await apiBaseDelete(`/users/${id}`, {})
      return response
    },
  },
})
