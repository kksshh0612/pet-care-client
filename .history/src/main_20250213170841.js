import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import MemberLogin from './components/MemberLogin.vue'
import FindId from './components/FindId.vue'
import FindPassword from './components/FindPassword.vue'

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

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
