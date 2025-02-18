import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import MemberLogin from '../components/MemberLogin.vue'
import SignUp from '../components/SignUp.vue'
import ServicePage from '../components/ServicePage.vue'
import MyPage from '../components/MyPage.vue'
import Payment from '../components/Payment.vue'
import AdminPage from '../components/AdminPage.vue'
import store from '../store'

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
    meta: { requiresAuth: true }
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 라우터 가드 설정
router.beforeEach(async (to, from, next) => {
  // 로그인이 필요한 페이지 목록
  const authRequired = ['/mypage']
  
  // 현재 페이지가 로그인이 필요한 페이지인지 확인
  const requiresAuth = authRequired.includes(to.path)
  
  // 로그인이 필요한 페이지에 접근하려고 할 때
  if (requiresAuth) {
    const isLoggedIn = await store.dispatch('checkLoginStatus')
    if (!isLoggedIn) {
      // 로그인 페이지로 리다이렉션하고 원래 가려고 했던 페이지 정보를 함께 전달
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  
  // 이미 로그인된 상태에서 로그인/회원가입 페이지 접근 시 메인 페이지로 리다이렉션
  if (['/login', '/signup'].includes(to.path) && store.state.isLoggedIn) {
    next('/')
    return
  }
  
  next()
})

export default router 