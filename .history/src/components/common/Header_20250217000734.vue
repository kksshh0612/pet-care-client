<template>
  <nav class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- 로고 -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-[#6C47FF]">돌봄</span>
          </router-link>
        </div>

        <!-- 우측 네비게이션 아이템 -->
        <div class="flex items-center space-x-4">
          <template v-if="isLoggedIn">
            <!-- 알림 아이콘 -->
            <button class="p-2 hover:bg-gray-100 rounded-full relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <!-- 프로필 이미지 및 마이페이지 링크 -->
            <div class="relative group">
              <router-link to="/mypage" class="relative w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity">
                <img 
                  :src="userInfo?.profileImage || '/default-profile.jpg'" 
                  alt="프로필"
                  class="w-full h-full object-cover"
                >
              </router-link>
              
              <!-- 드롭다운 메뉴 -->
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block">
                <router-link to="/mypage" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  마이페이지
                </router-link>
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </template>

          <template v-else>
            <router-link 
              to="/login" 
              class="px-4 py-1.5 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
            >
              로그인
            </router-link>
            <router-link 
              to="/signup" 
              class="px-4 py-1.5 border border-[#6C47FF] text-[#6C47FF] rounded-lg text-sm font-medium hover:bg-[#F3F0FF] transition-colors"
            >
              회원가입
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['isLoggedIn', 'userInfo'])
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/login')
    }
  }
}
</script> 