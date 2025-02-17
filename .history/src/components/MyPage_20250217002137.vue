<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F3F0FF]/30 to-white">
    <!-- 사이드바 토글 버튼 -->
    <button 
      @click="toggleSidebar"
      class="fixed top-20 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 z-50 transition-all duration-300"
      :class="isSidebarOpen ? 'left-[260px]' : 'left-4'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="!isSidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- 사이드바 -->
    <aside 
      class="fixed top-0 left-0 h-full w-[260px] bg-white shadow-lg transition-transform duration-300 z-40 pt-16"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- 프로필 섹션 -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
            <img 
              :src="memberInfo?.profileImage || '/default-profile.jpg'" 
              alt="프로필" 
              class="w-full h-full object-cover"
            >
          </div>
          <div>
            <h2 class="text-lg font-bold text-gray-900">{{ memberInfo.name }}</h2>
            <p class="text-sm text-gray-500">{{ memberInfo.emailAddress }}</p>
          </div>
        </div>
      </div>

      <!-- 메뉴 섹션 -->
      <nav class="p-4">
        <div class="space-y-1">
          <button
            v-for="menu in menus"
            :key="menu.id"
            @click="currentSection = menu.id"
            class="w-full px-4 py-2 text-left rounded-lg transition-colors"
            :class="currentSection === menu.id ? 'bg-[#6C47FF] text-white' : 'text-gray-600 hover:bg-gray-100'"
          >
            {{ menu.name }}
          </button>
        </div>
      </nav>
    </aside>

    <!-- 메인 컨텐츠 영역 -->
    <main 
      class="transition-all duration-300 pt-20 px-6"
      :class="isSidebarOpen ? 'ml-[260px]' : 'ml-0'"
    >
      <!-- 회원 정보 섹션 -->
      <section v-if="currentSection === 'profile'" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-6">회원 정보</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600">이메일</label>
                <p class="mt-1 text-gray-900">{{ memberInfo.emailAddress }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">이름</label>
                <p class="mt-1 text-gray-900">{{ memberInfo.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">전화번호</label>
                <p class="mt-1 text-gray-900">{{ memberInfo.phoneNumber }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 펫시터 정보 섹션 -->
      <section v-if="currentSection === 'petsitter'" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-6">펫시터 정보</h2>
          <div v-if="petsitterInfo" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-600">활동 지역</label>
                <p class="mt-1 text-gray-900">{{ petsitterInfo.location }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">서비스 요금</label>
                <p class="mt-1 text-gray-900">{{ petsitterInfo.fee }}원</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">평균 평점</label>
                <p class="mt-1 text-gray-900">{{ petsitterInfo.averageRating }}점</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600">총 서비스 횟수</label>
                <p class="mt-1 text-gray-900">{{ petsitterInfo.totalServiceCount }}회</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">가능한 날짜</label>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="day in petsitterInfo.availableDays" 
                  :key="day"
                  class="px-3 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-sm"
                >
                  {{ day }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">돌봄 가능한 동물</label>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="type in petsitterInfo.petTypes" 
                  :key="type"
                  class="px-3 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-sm"
                >
                  {{ getPetTypeLabel(type) }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">자격증</label>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="cert in petsitterInfo.certificationNames" 
                  :key="cert"
                  class="px-3 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-sm"
                >
                  {{ cert }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2">소개</label>
              <p class="text-gray-900 whitespace-pre-line">{{ petsitterInfo.introduction }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            펫시터 정보가 없습니다.
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyPage',
  data() {
    return {
      isSidebarOpen: false,
      currentSection: 'profile',
      memberInfo: {
        emailAddress: '',
        name: '',
        phoneNumber: ''
      },
      petsitterInfo: null,
      menus: [
        { id: 'profile', name: '회원 정보' },
        { id: 'petsitter', name: '펫시터 정보' },
        { id: 'pets', name: '내 반려동물' }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    getPetTypeLabel(type) {
      const labels = {
        dog: '강아지',
        cat: '고양이',
        bird: '조류',
        reptile: '파충류',
        other: '기타'
      }
      return labels[type] || type
    },
    async fetchMemberInfo() {
      try {
        const response = await axios.get('/api/v1/member')
        this.memberInfo = response.data
      } catch (error) {
        console.error('회원 정보 조회 실패:', error)
      }
    },
    async fetchPetsitterInfo() {
      try {
        const response = await axios.get(`/api/v1/pet-sitter/${this.$route.params.id}`)
        this.petsitterInfo = response.data
      } catch (error) {
        console.error('펫시터 정보 조회 실패:', error)
        this.petsitterInfo = null
      }
    }
  },
  async created() {
    await this.fetchMemberInfo()
    await this.fetchPetsitterInfo()
  }
}
</script> 