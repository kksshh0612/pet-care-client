<template>
  <div class="min-h-screen bg-[#F8F9FD] pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-8">펫시터 승인 관리</h1>

      <!-- 정렬 옵션 -->
      <div class="flex justify-end mb-4">
        <select 
          v-model="sortType"
          @change="fetchWaitingList"
          class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
        >
          <option value="RATING_DESC">평점 높은순</option>
          <option value="RATING_ASC">평점 낮은순</option>
          <option value="FEE_DESC">가격 높은순</option>
          <option value="FEE_ASC">가격 낮은순</option>
          <option value="TOTAL_SERVICE_COUNT_DESC">서비스 횟수 많은순</option>
          <option value="TOTAL_SERVICE_COUNT_ASC">서비스 횟수 적은순</option>
        </select>
      </div>

      <!-- 펫시터 목록 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="profile in petSitterProfiles" :key="profile.id" 
             class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
          <!-- 기본 정보 -->
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">활동 지역</h3>
              <p class="text-gray-900">{{ profile.location }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">돌봄 가능 요일</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="day in profile.availableDays" 
                  :key="day"
                  class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs"
                >
                  {{ getDayLabel(day) }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">돌봄 가능한 반려동물</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="type in profile.petTypes" 
                  :key="type"
                  class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs"
                >
                  {{ getPetTypeLabel(type) }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">요금</h3>
              <p class="text-[#6C47FF] font-bold">{{ formatPrice(profile.fee) }}원</p>
            </div>
          </div>

          <!-- 자기소개 -->
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-1">자기소개</h3>
            <p class="text-gray-900 text-sm whitespace-pre-line">{{ profile.introduction }}</p>
          </div>

          <!-- 자격증 -->
          <div v-if="profile.certificationNames.length > 0">
            <h3 class="text-sm font-medium text-gray-500 mb-1">보유 자격증</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="cert in profile.certificationNames" 
                :key="cert"
                class="text-[#6C47FF] text-sm"
              >
                {{ cert }}
              </span>
            </div>
          </div>

          <!-- 통계 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <p class="text-gray-500 text-xs mb-1">평균 평점</p>
              <div class="flex items-center justify-center gap-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-lg font-bold text-gray-900">{{ profile.averageRating.toFixed(1) }}</span>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <p class="text-gray-500 text-xs mb-1">총 돌봄 횟수</p>
              <p class="text-lg font-bold text-gray-900">{{ profile.totalServiceCount }}회</p>
            </div>
          </div>

          <!-- 승인 버튼 -->
          <div class="flex justify-end">
            <button 
              @click="approvePetSitter(profile.id)"
              class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
            >
              승인하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminPage',
  data() {
    return {
      sortType: 'RATING_DESC',
      petSitterProfiles: [],
      currentPage: 0,
      pageSize: 20
    }
  },
  async created() {
    await this.fetchWaitingList()
  },
  methods: {
    async fetchWaitingList() {
      try {
        const response = await axios.get('/api/v1/pet-sitter/waiting-approval-list', {
          params: {
            page: this.currentPage,
            size: this.pageSize,
            'sort-type': this.sortType
          }
        })
        console.log('승인 대기 목록 조회 응답:', response.data)
        this.petSitterProfiles = response.data.petSitterProfiles
      } catch (error) {
        console.error('승인 대기 목록 조회 실패:', error)
        alert('승인 대기 목록을 불러오는데 실패했습니다.')
      }
    },
    async approvePetSitter(petSitterId) {
      try {
        await axios.patch(`/api/v1/pet-sitter/${petSitterId}/approve`)
        alert('펫시터가 승인되었습니다.')
        this.fetchWaitingList() // 목록 새로고침
      } catch (error) {
        console.error('펫시터 승인 실패:', error)
        alert('펫시터 승인에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    },
    getDayLabel(day) {
      const labels = {
        'MON': '월', 'TUE': '화', 'WED': '수', 
        'THU': '목', 'FRI': '금', 'SAT': '토', 'SUN': '일'
      }
      return labels[day] || day
    },
    getPetTypeLabel(type) {
      const labels = {
        'DOG': '강아지',
        'CAT': '고양이',
        'RABBIT': '토끼',
        'HAMSTER': '햄스터',
        'PARROT': '앵무새'
      }
      return labels[type] || type
    },
    formatPrice(price) {
      return price.toLocaleString()
    }
  }
}
</script> 