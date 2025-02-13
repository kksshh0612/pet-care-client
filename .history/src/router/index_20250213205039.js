import { createRouter, createWebHistory } from 'vue-router'
import MemberLogin from '../components/MemberLogin.vue'
import SignUp from '../components/SignUp.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: MemberLogin
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 