import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import MemberLogin from './components/MemberLogin.vue'
import FindId from './components/FindId.vue'
import FindPassword from './components/FindPassword.vue'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./components/HelloWorld.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: MemberLogin
  },
  {
    path: '/find-id',
    name: 'FindId',
    component: FindId
  },
  {
    path: '/find-password',
    name: 'FindPassword',
    component: FindPassword
  }
]

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true // CORS 설정을 위해 필요

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
