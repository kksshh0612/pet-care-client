<script>
export default {
  name: 'App',
  computed: {
    isLoginPage() {
      return this.$route.path === '/login'
    }
  }
}
</script>

<template>
  <div>
    <!-- 네비게이션 바 -->
    <nav v-if="!isLoginPage" class="p-4 flex justify-end">
      <router-link 
        to="/login" 
        class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
      >
        로그인
      </router-link>
    </nav>

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
