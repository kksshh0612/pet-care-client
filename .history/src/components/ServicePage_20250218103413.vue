<template>
  <div class="min-h-screen bg-[#F8F9FD] pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 정렬 옵션 -->
      <div class="flex justify-end mb-4">
        <select 
          v-model="sortOption"
          class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
        >
          <option value="FEE_DESC">가격 높은순</option>
          <option value="FEE_ASC">가격 낮은순</option>
        </select>
      </div>

      <!-- 펫시터 서비스 목록 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="service in sortedServices" :key="service.id" 
             class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
          <div class="p-6 space-y-6">
            <!-- 펫시터 정보 -->
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-gray-900 mb-1">{{ service.petSitterName }}</h3>
              <p class="text-sm text-gray-600">{{ service.introduction }}</p>
            </div>

            <!-- 서비스 정보 -->
            <div class="space-y-4">
              <!-- 제공 가능한 서비스 -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">제공 가능한 서비스</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="type in service.serviceTypes" 
                    :key="type"
                    class="px-3 py-1 bg-[#F8F9FD] text-[#6C47FF] rounded-full text-sm font-medium"
                  >
                    {{ serviceTypeLabels[type] }}
                  </span>
                </div>
              </div>

              <!-- 돌봄 가능한 크기 -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">돌봄 가능한 크기</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="size in service.availableSizes" 
                    :key="size"
                    class="px-3 py-1 bg-[#F8F9FD] text-[#6C47FF] rounded-full text-sm font-medium"
                  >
                    {{ petSizeLabels[size] }}
                  </span>
                </div>
              </div>

              <!-- 가능 날짜 -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">가능 날짜</h4>
                <p class="text-sm text-gray-600 bg-[#F8F9FD] px-3 py-2 rounded-lg">
                  {{ formatDate(service.availableDay) }}
                </p>
              </div>

              <!-- 요금 정보 -->
              <div class="pt-4 border-t border-gray-100">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">요금</span>
                  <span class="text-lg font-bold text-[#6C47FF]">
                    {{ formatPrice(service.fee) }}원
                  </span>
                </div>
              </div>
            </div>

            <!-- 예약하기 버튼 -->
            <button 
              @click="bookService(service)"
              class="w-full px-4 py-2.5 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-all shadow-sm hover:shadow-md font-medium"
            >
              예약하기
            </button>
          </div>
        </div>
      </div>

      <!-- 기존 인기 반려동물 섹션 -->
      <h2 class="text-2xl font-bold text-gray-900 mb-6">인기 반려동물</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div v-for="pet in popularPets" :key="pet.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img :src="pet.image" :alt="pet.name" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900">{{ pet.name }}</h3>
            <p class="text-sm text-gray-600">{{ pet.description }}</p>
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <span>❤️ {{ pet.likes }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 기존 카테고리 섹션 -->
      <div class="space-y-12">
        <!-- 카테고리 필터 -->
        <div class="flex flex-wrap gap-4">
          <button
            @click="togglePetType('all')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedPetTypes.includes('all')
                ? 'bg-[#6C47FF] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            전체
          </button>
          <button
            v-for="type in petTypes"
            :key="type.value"
            @click="togglePetType(type.value)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedPetTypes.includes(type.value)
                ? 'bg-[#6C47FF] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ type.label }}
          </button>
        </div>

        <!-- 카테고리별 상품 -->
        <div v-for="category in categories" :key="category.id" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">{{ category.name }}</h2>
            <button
              @click="viewMoreProducts(category.id)"
              class="text-[#6C47FF] hover:text-[#5835FF] font-medium"
            >
              더보기
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="product in category.products"
              :key="product.id"
              class="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-900">{{ product.name }}</h3>
                <p class="text-sm text-gray-600">{{ product.description }}</p>
                <p class="mt-2 text-lg font-bold text-[#6C47FF]">{{ formatPrice(product.price) }}원</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 펫시터 프로필 목록 섹션 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">펫시터 프로필</h2>
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

            <!-- 자기소개 및 통계 -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">자기소개</h3>
                <p class="text-gray-900 text-sm">{{ profile.introduction }}</p>
              </div>
              <div>
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
            </div>

            <!-- 통계 -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-500 text-sm mb-1">평균 평점</p>
                <div class="flex items-center justify-center gap-1">
                  <span class="text-yellow-400">★</span>
                  <span class="text-xl font-bold text-gray-900">{{ profile.averageRating.toFixed(1) }}</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-500 text-sm mb-1">총 돌봄 횟수</p>
                <p class="text-xl font-bold text-gray-900">{{ profile.totalServiceCount }}회</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 예약 모달 -->
    <div v-if="showReservationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-lg">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold">돌봄 서비스 예약</h3>
          <button 
            @click="closeReservationModal"
            class="text-gray-400 hover:text-gray-500"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 예약 내용 -->
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">펫시터</span>
              <span class="font-medium">{{ selectedService.petSitterName }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">가능 날짜</span>
              <span class="font-medium">{{ formatDate(selectedService.availableDay) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">요금</span>
              <span class="font-medium text-[#6C47FF]">{{ formatPrice(selectedService.fee) }}원</span>
            </div>
          </div>
        </div>

        <!-- 버튼 영역 -->
        <div class="flex justify-end">
          <button 
            @click="proceedToPayment"
            class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'ServicePage',
  data() {
    return {
      services: [],
      popularPets: [
        {
          id: 1,
          name: '초코',
          image: '/src/assets/test_image.jpg',
          description: '장난기 많은 골든리트리버',
          likes: 2840
        },
        {
          id: 2,
          name: '몽이',
          image: '/src/assets/test_image.jpg',
          description: '귀여운 말티즈',
          likes: 2453
        },
        {
          id: 3,
          name: '루시',
          image: '/src/assets/test_image.jpg',
          description: '활발한 비숑프리제',
          likes: 2312
        }
      ],
      selectedPetTypes: ['all'],
      petTypes: [
        { value: 'dog', label: '강아지' },
        { value: 'cat', label: '고양이' },
        { value: 'bird', label: '조류' },
        { value: 'reptile', label: '파충류' }
      ],
      categories: [
        {
          id: 'food',
          name: '사료/간식',
          products: [
            // ... 기존 제품 데이터
          ]
        },
        // ... 다른 카테고리들
      ],
      showReservationModal: false,
      selectedService: null,
      sortOption: 'FEE_DESC',
      serviceTypeLabels: {
        'WALK': '산책',
        'VISIT_CARE': '방문 돌봄',
        'FOSTER_CARE': '위탁 돌봄'
      },
      petSizeLabels: {
        'SMALL': '소형견(10kg이하)',
        'MEDIUM': '중형견(10kg~25kg)',
        'LARGE': '대형견(25kg초과)'
      },
      petSitterProfiles: []
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn
    }),
    sortedServices() {
      const services = [...this.services]
      
      switch (this.sortOption) {
        case 'FEE_DESC':
          return services.sort((a, b) => b.fee - a.fee)
        case 'FEE_ASC':
          return services.sort((a, b) => a.fee - b.fee)
        default:
          return services
      }
    }
  },
  methods: {
    async fetchPetSitterServices() {
      try {
        const response = await axios.get('/api/v1/pet-sitter-work/list')
        this.services = response.data.petSitterWorkResponses.map(service => ({
          petSitterName: service.petSitterName,
          introduction: service.introduction,
          serviceTypes: service.serviceTypes,
          availableSizes: service.availableSizes,
          availableDay: service.availableDay,
          fee: service.fee
        }))
      } catch (error) {
        console.error('펫시터 서비스 목록 조회 실패:', error)
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    formatPrice(price) {
      return price.toLocaleString()
    },
    bookService(service) {
      if (!this.isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.')
        this.$router.push({
          path: '/login',
          query: { redirect: this.$route.fullPath }
        })
        return
      }
      
      this.selectedService = service
      this.showReservationModal = true
    },
    togglePetType(type) {
      if (type === 'all') {
        this.selectedPetTypes = ['all']
      } else {
        this.selectedPetTypes = this.selectedPetTypes.filter(t => t !== 'all')
        const index = this.selectedPetTypes.indexOf(type)
        if (index === -1) {
          this.selectedPetTypes.push(type)
        } else {
          this.selectedPetTypes.splice(index, 1)
        }
        if (this.selectedPetTypes.length === 0) {
          this.selectedPetTypes = ['all']
        }
      }
    },
    viewMoreProducts(categoryId) {
      console.log(`${categoryId} 카테고리 더보기 클릭`)
    },
    closeReservationModal() {
      this.showReservationModal = false
      this.selectedService = null
    },
    proceedToPayment() {
      // 결제 페이지로 이동하면서 예약 정보 전달
      this.$router.push({
        path: '/payment',
        query: {
          serviceId: this.selectedService.id,
          amount: this.selectedService.fee
        }
      })
    },
    async fetchPetSitterProfiles() {
      try {
        const response = await axios.get('/api/v1/pet-sitter/list')
        this.petSitterProfiles = response.data.petSitterProfiles
      } catch (error) {
        console.error('펫시터 프로필 목록 조회 실패:', error)
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
    }
  },
  async created() {
    await Promise.all([
      this.fetchPetSitterServices(),
      this.fetchPetSitterProfiles()
    ])
  }
}
</script>

<style>
input[type="date"] {
  position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}
</style> 