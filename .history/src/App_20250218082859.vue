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
  data() {
    return {
      isInitialized: false
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
    try {
      await this.checkLoginStatus()
    } finally {
      this.isInitialized = true
    }
  }
}
</script>

<template>
  <div>
    <Header ref="header" v-if="!isAuthPage" />
    <router-view @login-success="handleLoginSuccess" v-if="isInitialized"></router-view>
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C47FF]"></div>
    </div>
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
