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
        if (response.data) {
          commit('setLoginStatus', true)
          commit('setUserInfo', response.data)
          return true
        }
        return false
      } catch (error) {
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