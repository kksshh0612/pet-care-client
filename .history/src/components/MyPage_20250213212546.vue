<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F3F0FF]/30 to-white">
    <!-- 사이드바 토글 버튼 -->
    <button 
      @click="toggleSidebar"
      :class="[
        'fixed top-20 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 z-50 transition-all duration-300',
        isSidebarOpen ? 'left-[260px]' : 'left-4'
      ]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="!isSidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- 사이드바 -->
    <div 
      :class="[
        'fixed top-16 left-0 h-full w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out z-40',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
      ]"
    >
      <nav class="p-6 space-y-2">
        <router-link 
          v-for="menu in sideMenus" 
          :key="menu.path"
          :to="menu.path"
          class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-[#F3F0FF] hover:text-[#6C47FF] transition-colors"
          :class="{ 'bg-[#F3F0FF] text-[#6C47FF]': currentPath === menu.path }"
        >
          <span class="text-sm font-bold">{{ menu.name }}</span>
        </router-link>
      </nav>
    </div>

    <!-- 메인 컨텐츠 -->
    <main 
      :class="[
        'pt-24 min-h-screen transition-all duration-300',
        isSidebarOpen ? 'ml-64' : 'ml-0'
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 프로필 섹션 -->
        <section class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
            <!-- 프로필 이미지 -->
            <div class="relative group">
              <div class="w-32 h-32 rounded-full overflow-hidden">
                <img 
                  :src="userInfo.profileImage || '/default-profile.jpg'" 
                  alt="프로필 이미지"
                  class="w-full h-full object-cover"
                >
              </div>
              <button class="absolute bottom-0 right-0 bg-[#6C47FF] text-white p-2 rounded-full shadow-lg hover:bg-[#5835FF] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <!-- 회원 정보 -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <h1 class="text-2xl font-bold text-gray-900">{{ userInfo.name }}</h1>
                <!-- 펫시터 인증 뱃지 -->
                <div v-if="userInfo.isPetSitter" 
                     class="flex items-center px-3 py-1 bg-[#F3F0FF] rounded-full"
                     :title="`인증된 ${userInfo.petSitterLevel} 펫시터입니다`">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       class="h-5 w-5 text-[#6C47FF] mr-1" 
                       fill="none" 
                       viewBox="0 0 24 24" 
                       stroke="currentColor">
                    <path stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span class="text-sm font-bold text-[#6C47FF]">
                    {{ userInfo.petSitterLevel === 'PROFESSIONAL' ? '전문 펫시터' : 
                       userInfo.petSitterLevel === 'INTERMEDIATE' ? '중급 펫시터' : '초급 펫시터' }}
                  </span>
                </div>
              </div>
              <div class="space-y-2 text-gray-600">
                <p class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ userInfo.email }}
                </p>
                <p class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ userInfo.phone }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 반려동물 섹션 -->
        <section class="bg-white rounded-2xl shadow-lg p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">내 반려동물</h2>
            <button class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors">
              반려동물 추가
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="pet in userPets" :key="pet.id" 
                 class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="relative pb-[75%]">
                <img :src="pet.image" :alt="pet.name" 
                     class="absolute inset-0 w-full h-full object-cover">
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">{{ pet.name }}</h3>
                <p class="text-sm text-gray-600">{{ pet.breed }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    return {
      isSidebarOpen: true,
      currentPath: '/mypage',
      sideMenus: [
        { name: '내 펫 관리', path: '/mypage/pets' },
        { name: '회원정보 수정', path: '/mypage/edit' },
        { name: '비밀번호 변경', path: '/mypage/password' },
        { name: '회원 탈퇴', path: '/mypage/withdraw' }
      ],
      userInfo: {
        name: '김민서',
        email: 'minseo@example.com',
        phone: '010-1234-5678',
        profileImage: '/profile.jpg',
        isPetSitter: true,
        petSitterLevel: 'PROFESSIONAL'
      },
      userPets: [
        {
          id: 1,
          name: '초코',
          breed: '골든리트리버',
          image: '/pets/choco.jpg'
        },
        {
          id: 2,
          name: '몽이',
          breed: '말티즈',
          image: '/pets/mongi.jpg'
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  }
}
</script>

<style scoped>
/* 사이드바 스크롤바 스타일링 */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}
</style> 