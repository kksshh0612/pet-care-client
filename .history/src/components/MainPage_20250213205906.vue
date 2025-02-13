<template>
  <div class="min-h-screen bg-white">
    <!-- 네비게이션 바 -->
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
                <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <!-- 마이페이지 아이콘 -->
              <router-link to="/mypage" class="p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </router-link>
            </template>

            <template v-else>
              <router-link 
                to="/login" 
                class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
              >
                로그인
              </router-link>
              <router-link 
                to="/signup" 
                class="px-6 py-2 border border-[#6C47FF] text-[#6C47FF] rounded-lg text-sm font-medium hover:bg-[#F3F0FF] transition-colors"
              >
                회원가입
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- 메인 컨텐츠 -->
    <main class="pt-16">
      <!-- 히어로 섹션 -->
      <section class="relative bg-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">반려동물을 위한</span>
              <span class="block text-[#6C47FF]">최고의 돌봄 서비스</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              전문 펫시터가 제공하는 안전하고 신뢰할 수 있는 돌봄 서비스를 경험해보세요.
            </p>
            <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div class="rounded-md shadow">
                <router-link
                  to="/service"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6C47FF] hover:bg-[#5835FF] md:py-4 md:text-lg md:px-10"
                >
                  서비스 알아보기
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 서비스 특징 섹션 -->
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-3xl font-extrabold text-gray-900">
              왜 돌봄 서비스인가요?
            </h2>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              전문성과 신뢰성을 바탕으로 한 최상의 펫케어 서비스를 제공합니다.
            </p>
          </div>

          <div class="mt-10">
            <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <!-- 특징 1 -->
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-[#6C47FF] text-white">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="mt-5 text-center">
                  <h3 class="text-lg font-medium text-gray-900">검증된 펫시터</h3>
                  <p class="mt-2 text-base text-gray-500">
                    철저한 신원확인과 교육을 받은 전문 펫시터가 돌봄 서비스를 제공합니다.
                  </p>
                </div>
              </div>

              <!-- 특징 2 -->
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-[#6C47FF] text-white">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="mt-5 text-center">
                  <h3 class="text-lg font-medium text-gray-900">실시간 모니터링</h3>
                  <p class="mt-2 text-base text-gray-500">
                    실시간 사진과 동영상으로 반려동물의 상태를 확인할 수 있습니다.
                  </p>
                </div>
              </div>

              <!-- 특징 3 -->
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-[#6C47FF] text-white">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div class="mt-5 text-center">
                  <h3 class="text-lg font-medium text-gray-900">안전 보장</h3>
                  <p class="mt-2 text-base text-gray-500">
                    펫케어 전문 보험으로 만일의 사고에 대비합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      isLoggedIn: false // 실제 구현시에는 vuex나 다른 상태관리를 통해 관리
    }
  }
}
</script> 