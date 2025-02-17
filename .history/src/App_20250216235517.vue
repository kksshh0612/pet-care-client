<script>
import Header from './components/common/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    isAuthPage() {
      return ['/login', '/signup'].includes(this.$route.path)
    }
  }
}
</script>

<template>
  <div>
    <Header ref="header" v-if="!isAuthPage" />
    <router-view />
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
