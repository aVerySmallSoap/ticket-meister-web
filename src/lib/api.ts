import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
})

api.interceptors.request.use( (config) => {
  const auth = useAuthStore()
  console.log(auth.accessToken)
  if(auth.accessToken){
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

let isRefreshing = false
let queue = []

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore()
    const originalRequest = error.config

    const url = originalRequest?.url || ""

    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/me") ||
      url.includes("/auth/refresh")

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          const newToken = await auth.refresh()
          queue.forEach((cb) => cb(newToken))
          queue = []
          isRefreshing = false

          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        } catch (e) {
          isRefreshing = false
          queue = []
          auth.accessToken = null
          auth.user = null
          throw e
        }
      }

      return new Promise((resolve) => {
        queue.push((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(api(originalRequest))
        })
      })
    }

    return Promise.reject(error)
  }
)

export default api
