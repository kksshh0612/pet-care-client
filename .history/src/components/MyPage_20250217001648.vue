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
    <div 
      class="fixed top-0 left-0 h-full w-[260px] bg-white shadow-lg transition-transform duration-300 z-40 pt-16"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-900 mb-4">마이페이지</h2>
        <nav class="space-y-2">
          <button 
            @click="activeTab = 'profile'"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg transition-colors',
              activeTab === 'profile' 
                ? 'bg-[#6C47FF] text-white' 
                : 'text-gray-600 hover:bg-[#F3F0FF] hover:text-[#6C47FF]'
            ]"
          >
            회원 프로필
          </button>
          <button 
            @click="activeTab = 'petsitter'"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg transition-colors',
              activeTab === 'petsitter' 
                ? 'bg-[#6C47FF] text-white' 
                : 'text-gray-600 hover:bg-[#F3F0FF] hover:text-[#6C47FF]'
            ]"
          >
            펫시터 정보
          </button>
          <button 
            @click="activeTab = 'pets'"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg transition-colors',
              activeTab === 'pets' 
                ? 'bg-[#6C47FF] text-white' 
                : 'text-gray-600 hover:bg-[#F3F0FF] hover:text-[#6C47FF]'
            ]"
          >
            내 반려동물
          </button>
        </nav>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <main :class="isSidebarOpen ? 'ml-[260px]' : 'ml-0'" class="transition-margin duration-300 pt-20 p-6">
      <!-- 회원 프로필 -->
      <div v-if="activeTab === 'profile'" class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">회원 프로필</h2>
          <div class="space-y-4">
            <div class="flex items-center">
              <span class="w-32 text-gray-600">이메일</span>
              <span class="text-gray-900">{{ memberInfo.emailAddress }}</span>
            </div>
            <div class="flex items-center">
              <span class="w-32 text-gray-600">이름</span>
              <span class="text-gray-900">{{ memberInfo.name }}</span>
            </div>
            <div class="flex items-center">
              <span class="w-32 text-gray-600">전화번호</span>
              <span class="text-gray-900">{{ memberInfo.phoneNumber }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 펫시터 정보 -->
      <div v-if="activeTab === 'petsitter'" class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">펫시터 정보</h2>
          <div v-if="petsitterInfo" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-600 mb-2">활동 지역</h3>
                <p class="text-gray-900">{{ petsitterInfo.location }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-600 mb-2">서비스 요금</h3>
                <p class="text-gray-900">{{ petsitterInfo.fee }}원</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-600 mb-2">평균 평점</h3>
                <p class="text-gray-900">{{ petsitterInfo.averageRating }}점</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-600 mb-2">총 서비스 횟수</h3>
                <p class="text-gray-900">{{ petsitterInfo.totalServiceCount }}회</p>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-600 mb-2">가능한 날짜</h3>
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
              <h3 class="text-sm font-medium text-gray-600 mb-2">돌봄 가능한 동물</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="type in petsitterInfo.petTypes" 
                  :key="type"
                  class="px-3 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-sm"
                >
                  {{ type }}
                </span>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-600 mb-2">자격증</h3>
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
              <h3 class="text-sm font-medium text-gray-600 mb-2">소개</h3>
              <p class="text-gray-900 whitespace-pre-line">{{ petsitterInfo.introduction }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            펫시터 정보가 없습니다.
          </div>
        </div>
      </div>

      <!-- 내 반려동물 탭 -->
      <div v-if="activeTab === 'pets'" class="max-w-3xl mx-auto">
        <!-- 내 반려동물 컨텐츠는 API 스펙이 제공되면 구현 예정 -->
      </div>
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
      activeTab: 'profile',
      memberInfo: {
        emailAddress: '',
        name: '',
        phoneNumber: ''
      },
      petsitterInfo: null
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
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