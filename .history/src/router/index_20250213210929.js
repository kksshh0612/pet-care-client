import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import MemberLogin from '../components/MemberLogin.vue'
import SignUp from '../components/SignUp.vue'
import ServicePage from '../components/ServicePage.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/login',
    name: 'Login',
    component: MemberLogin
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/service',
    name: 'Service',
    component: ServicePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 