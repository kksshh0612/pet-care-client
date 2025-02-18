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

// Axios 기본 설정
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true  // CORS 요청 시 쿠키 포함
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// CORS 관련 설정
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true

// 응답 인터셉터 수정
axios.interceptors.response.use(
  response => response,
  error => {
    // 401 에러(인증 실패) 처리
    if (error.response?.status === 401) {
      // 현재 페이지가 로그인이 필요한 페이지인 경우에만 리다이렉션
      const authRequiredPages = ['/mypage', '/payment']
      const currentPath = router.currentRoute.value.path
      
      if (authRequiredPages.includes(currentPath)) {
        store.commit('setLoginStatus', false)
        store.commit('setUserInfo', null)
        router.push({
          path: '/login',
          query: { redirect: currentPath }
        })
      }
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
