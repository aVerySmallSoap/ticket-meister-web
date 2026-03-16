import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth.ts'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
const auth = useAuthStore(pinia)

await auth.initialize()
app.use(router)

app.mount('#app')
