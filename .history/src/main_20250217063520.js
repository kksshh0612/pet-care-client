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
axios.defaults.withCredentials = true  // 세션 쿠키 전송 허용
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// CORS 관련 설정
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true

// 응답 인터셉터 추가
axios.interceptors.response.use(
  response => response,
  error => {
    // 401 에러(인증 실패)시 로그인 페이지로 리다이렉션
    if (error.response?.status === 401) {
      store.commit('setLoginStatus', false)
      store.commit('setUserInfo', null)
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
