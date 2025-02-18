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
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 라우터 가드 설정
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 로그인 상태 체크를 위해 store의 상태를 갱신
    try {
      await store.dispatch('checkLoginStatus')  // 서버에서 로그인 상태 확인
      const isLoggedIn = store.state.isLoggedIn

      if (!isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router 