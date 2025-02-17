import { createStore } from 'vuex'

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
        const response = await axios.get('/api/v1/member')
        if (response.status === 200) {
          commit('setLoginStatus', true)
          commit('setUserInfo', response.data)
          return true
        }
      } catch (error) {
        commit('setLoginStatus', false)
        commit('setUserInfo', null)
      }
      return false
    },
    async logout({ commit }) {
      try {
        await axios.post('/api/v1/member/logout')
        commit('setLoginStatus', false)
        commit('setUserInfo', null)
      } catch (error) {
        console.error('로그아웃 실패:', error)
      }
    }
  }
}) 