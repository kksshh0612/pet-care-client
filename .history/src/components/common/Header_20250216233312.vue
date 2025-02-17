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
              <span v-if="hasNotifications" class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- 프로필 이미지 및 마이페이지 링크 -->
            <router-link to="/mypage" class="relative w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity">
              <img 
                :src="userProfileImage || '/default-profile.jpg'" 
                alt="프로필"
                class="w-full h-full object-cover"
              >
            </router-link>
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
import axios from 'axios'

export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      userProfileImage: null,
      hasNotifications: false
    }
  },
  async created() {
    // 페이지 로드 시 로그인 상태 확인
    try {
      const response = await axios.get('http://localhost:8080/api/auth/check', {
        withCredentials: true
      })
      if (response.data.isLoggedIn) {
        this.isLoggedIn = true
        this.userProfileImage = response.data.user.profileImage
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error)
    }
  }
}
</script> 