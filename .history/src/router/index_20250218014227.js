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
  // 로그인이 필요한 페이지에 접근할 때
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('로그인 필요한 페이지 접근')
    
    try {
      const isLoggedIn = await store.dispatch('checkLoginStatus')
      console.log('로그인 상태:', isLoggedIn)
      console.log('사용자 정보:', store.state.userInfo)

      if (!isLoggedIn) {
        console.log('비로그인 상태 - 로그인 페이지로 이동')
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        console.log('로그인 상태 - 페이지 접근 허용')
        next()
      }
    } catch (error) {
      console.error('로그인 체크 실패:', error)
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