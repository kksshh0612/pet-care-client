<script>
import Header from './components/common/Header.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapState(['isLoggedIn']),
    isAuthPage() {
      return ['/login', '/signup'].includes(this.$route.path)
    }
  },
  methods: {
    ...mapActions(['checkLoginStatus']),
    handleLoginSuccess(userData) {
      this.$store.commit('setLoginStatus', true)
      this.$store.commit('setUserInfo', userData)
    }
  },
  async created() {
    await this.checkLoginStatus()
  }
}
</script>

<template>
  <div>
    <Header ref="header" v-if="!isAuthPage" />
    <router-view @login-success="handleLoginSuccess" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
