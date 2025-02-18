import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    isLoggedIn: false,
    userInfo: null
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLoggedIn = status
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async checkLoginStatus({ commit }) {
      try {
        const response = await axios.get('/api/v1/members/me')
        console.log('사용자 정보 조회 응답:', response.data) // 응답 데이터 확인
        
        if (response.data) {
          commit('setLoginStatus', true)
          commit('setUserInfo', response.data)
          return true
        } else {
          commit('setLoginStatus', false)
          commit('setUserInfo', null)
          return false
        }
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error.response || error)
        commit('setLoginStatus', false)
        commit('setUserInfo', null)
        return false
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/api/v1/member/logout')
        commit('setLoginStatus', false)
        commit('setUserInfo', null)
        return true
      } catch (error) {
        console.error('로그아웃 실패:', error)
        return false
      }
    }
  }
}) 