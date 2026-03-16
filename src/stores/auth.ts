import { defineStore } from 'pinia'
import api from '@/lib/api.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    user: null,
    initialized: false
  }),
  actions: {
    async login(email, password){
      const form = new FormData()
      form.append('username', email)
      form.append('password', password)

      const {data} = await api.post("/auth", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      this.accessToken = data.access_token
      await this.fetchMe()
      return data
    },

    async fetchMe(){
      const { data } = await api.get('/auth/me')
      this.user = data
    },

    async logout(){
      await api.post('/auth/logout')
      this.accessToken = null
      this.user = null
    },

    async refresh(){
      const {data} = await api.post('/auth/refresh')
      this.accessToken = data.access_token
      return data.access_token
    },

    async initialize() {
      try {
        const { data } = await api.get("/auth/me")
        this.user = data
      } catch (err) {
        if (err.response?.status === 401) {
          this.user = null
          return
        }
        throw err
      }
    }
  },
})
