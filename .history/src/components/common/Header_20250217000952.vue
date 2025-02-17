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
              <button class="relative w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C47FF] focus:ring-offset-2">
                <img 
                  :src="userInfo?.profileImage || '/default-profile.jpg'" 
                  alt="프로필"
                  class="w-full h-full object-cover"
                >
              </button>
              
              <!-- 드롭다운 메뉴 -->
              <div class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 transform opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-200 origin-top-right">
                <!-- 프로필 정보 섹션 -->
                <div class="px-4 py-3 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">
                    {{ userInfo?.name || '사용자' }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ userInfo?.email }}
                  </p>
                </div>
                
                <!-- 메뉴 아이템들 -->
                <div class="py-1">
                  <router-link 
                    to="/mypage" 
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#F3F0FF] hover:text-[#6C47FF] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    마이페이지
                  </router-link>
                  
                  <button 
                    @click="handleLogout"
                    class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    로그아웃
                  </button>
                </div>
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
      try {
        await this.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('로그아웃 실패:', error)
      }
    }
  }
}
</script>

<style scoped>
.group:hover .group-hover\:visible {
  visibility: visible;
}

.group .invisible {
  visibility: hidden;
}
</style> 