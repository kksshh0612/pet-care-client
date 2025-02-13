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
      <section class="relative bg-gradient-to-b from-[#F3F0FF] to-white py-32">
        <!-- 배경 장식 요소들 -->
        <div class="absolute inset-0 overflow-hidden">
          <!-- 원형 그라데이션 장식 -->
          <div class="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[#6C47FF]/10 to-transparent rounded-full blur-3xl"></div>
          <div class="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-[#6C47FF]/10 to-transparent rounded-full blur-3xl"></div>
          
          <!-- 추상적인 패턴 -->
          <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-[#6C47FF]/5 rounded-full mix-blend-multiply blur-xl animate-blob"></div>
          <div class="absolute top-1/3 right-1/3 w-72 h-72 bg-[#F3F0FF] rounded-full mix-blend-multiply blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <!-- 컨텐츠 -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block mb-2">반려동물을 위한</span>
              <span class="block text-[#6C47FF]">최고의 돌봄 서비스</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              전문 펫시터가 제공하는 안전하고 신뢰할 수 있는 돌봄 서비스를 경험해보세요.
            </p>
            <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div class="rounded-md shadow">
                <router-link
                  to="/service"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6C47FF] hover:bg-[#5835FF] md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:shadow-lg hover:scale-105"
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

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- 회사 정보 -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-white">돌봄</h3>
            <p class="text-sm">
              안전하고 신뢰할 수 있는<br />
              반려동물 돌봄 서비스
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          <!-- 서비스 -->
          <div>
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              서비스
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-sm hover:text-white">
                  방문 돌봄
                </a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-white">
                  위탁 돌봄
                </a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-white">
                  산책 서비스
                </a>
              </li>
            </ul>
          </div>

          <!-- 고객지원 -->
          <div>
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              고객지원
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-sm hover:text-white">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-white">
                  이용가이드
                </a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-white">
                  공지사항
                </a>
              </li>
            </ul>
          </div>

          <!-- 회사 -->
          <div>
            <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              회사
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="#" class="text-sm hover:text-white">
                  회사 소개
                </a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-white">
                  채용정보
                </a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-white">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" class="text-sm hover:text-white">
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-700">
          <p class="text-sm text-gray-400">
            &copy; 2024 돌봄. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
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

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style> 