import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import MemberLogin from '../components/MemberLogin.vue'
import SignUp from '../components/SignUp.vue'
import ServicePage from '../components/ServicePage.vue'
import MyPage from '../components/MyPage.vue'

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
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // 빈 경로는 부모 경로의 기본 컴포넌트를 의미
        component: MyPage
      },
      {
        path: 'pets',
        name: 'MyPets',
        component: MyPage
      },
      {
        path: 'edit',
        name: 'EditProfile',
        component: MyPage
      },
      {
        path: 'password',
        name: 'ChangePassword',
        component: MyPage
      },
      {
        path: 'withdraw',
        name: 'Withdraw',
        component: MyPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 