<template>
  <div class="min-h-screen bg-[#F8F9FD] pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 날짜 필터 섹션 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <h2 class="text-xl font-bold text-gray-900">돌봄 날짜 선택</h2>
          <div class="flex gap-4">
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">시작일</label>
              <input 
                type="date" 
                v-model="startDate"
                class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
                :min="today"
              >
            </div>
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">종료일</label>
              <input 
                type="date" 
                v-model="endDate"
                class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
                :min="startDate"
              >
            </div>
            <button 
              @click="filterServices"
              class="self-end px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors shadow-sm hover:shadow-md"
            >
              검색
            </button>
          </div>
        </div>
      </div>

      <!-- 정렬 옵션 추가 -->
      <div class="flex justify-end mb-4">
        <select 
          v-model="sortOption"
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

      <!-- 펫시터 서비스 목록 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="service in sortedServices" :key="service.id" 
             class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
          <div class="p-6 space-y-6">
            <!-- 펫시터 프로필 -->
            <div class="flex items-start gap-4">
              <img 
                :src="service.profileImage" 
                alt="펫시터 프로필" 
                class="w-16 h-16 rounded-full object-cover ring-2 ring-[#6C47FF]/10"
              >
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ service.name }}</h3>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span class="truncate">{{ service.location }}</span>
                  <span class="text-gray-300">|</span>
                  <div class="flex items-center shrink-0">
                    <span class="text-yellow-400">★</span>
                    <span class="ml-1 font-medium">{{ service.rating.toFixed(1) }}</span>
                  </div>
                  <span class="text-gray-300">|</span>
                  <span class="shrink-0">돌봄 {{ service.totalCare }}회</span>
                </div>
              </div>
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
                    {{ getServiceTypeLabel(type) }}
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
                    {{ getSizeLabel(size) }}
                  </span>
                </div>
              </div>

              <!-- 가능 일정 -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">가능 일정</h4>
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
    </div>

    <!-- 예약 모달 -->
    <div v-if="showReservationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-lg">
        <h3 class="text-lg font-bold mb-6">돌봄 서비스 예약</h3>
        
        <!-- 예약 단계 -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="h-1 bg-gray-200 rounded-full">
                <div class="h-1 bg-[#6C47FF] rounded-full transition-all duration-300"
                     :style="{ width: currentStep === 1 ? '50%' : '100%' }">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 날짜 선택 단계 -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-medium text-gray-900 mb-2">펫시터 가능 일정</h4>
            <p class="text-sm text-gray-600">
              {{ formatDate(selectedService.availableDay) }}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">시작일</label>
              <div class="relative">
                <input 
                  type="date" 
                  v-model="reservation.startDate"
                  :min="selectedService.availableDay"
                  :max="selectedService.availableDay"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF] bg-white"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-500">시작일을 선택해주세요</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">종료일</label>
              <div class="relative">
                <input 
                  type="date" 
                  v-model="reservation.endDate"
                  :min="reservation.startDate || selectedService.availableDay"
                  :max="selectedService.availableDay"
                  :disabled="!reservation.startDate"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF] bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{ reservation.startDate ? '종료일을 선택해주세요' : '시작일을 먼저 선택해주세요' }}
              </p>
            </div>
          </div>

          <div v-if="dateError" class="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {{ dateError }}
          </div>
        </div>

        <!-- 예약 내역 확인 단계 -->
        <div v-else class="space-y-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-4">예약 내역</h4>
            <div class="space-y-2 text-sm">
              <p class="flex justify-between">
                <span class="text-gray-600">펫시터</span>
                <span class="font-medium">{{ selectedService.name }}</span>
              </p>
              <p class="flex justify-between">
                <span class="text-gray-600">돌봄 기간</span>
                <span class="font-medium">
                  {{ formatDate(reservation.startDate) }} ~ {{ formatDate(reservation.endDate) }}
                </span>
              </p>
              <p class="flex justify-between">
                <span class="text-gray-600">총 일수</span>
                <span class="font-medium">{{ calculateDays() }}일</span>
              </p>
              <div class="border-t border-gray-200 mt-4 pt-4">
                <p class="flex justify-between text-lg font-bold">
                  <span>총 결제 금액</span>
                  <span class="text-[#6C47FF]">{{ formatPrice(calculateTotalPrice()) }}원</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 버튼 영역 -->
        <div class="flex justify-end gap-4 mt-6">
          <button 
            @click="closeReservationModal"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button 
            v-if="currentStep === 1"
            @click="goToNextStep"
            :disabled="!isDateValid"
            class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            다음
          </button>
          <button 
            v-else
            @click="proceedToPayment"
            class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
          >
            결제하기
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
      startDate: '',
      endDate: '',
      services: [
        {
          id: 1,
          name: '김펫시터',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 강남구',
          serviceTypes: ['산책', '방문 돌봄', '위탁 돌봄'],
          petSizes: ['small', 'medium'],
          price: 50000,
          availableFrom: '2025-02-18',
          availableTo: '2025-04-30',
          rating: 4.8,
          totalCare: 128
        },
        {
          id: 2,
          name: '이펫시터',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 서초구',
          serviceTypes: ['방문 돌봄', '위탁 돌봄'],
          petSizes: ['small', 'medium', 'large'],
          price: 55000,
          availableFrom: '2025-02-20',
          availableTo: '2025-05-31',
          rating: 4.9,
          totalCare: 256
        },
        {
          id: 3,
          name: '박펫시터',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 송파구',
          serviceTypes: ['산책', '방문 돌봄'],
          petSizes: ['small'],
          price: 45000,
          availableFrom: '2025-02-15',
          availableTo: '2025-05-31',
          rating: 4.7,
          totalCare: 184
        },
        {
          id: 4,
          name: '최펫시터',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 마포구',
          serviceTypes: ['산책', '방문 돌봄', '위탁 돌봄'],
          petSizes: ['small', 'medium'],
          price: 52000,
          availableFrom: '2025-02-10',
          availableTo: '2025-06-30',
          rating: 4.9,
          totalCare: 224
        }
      ],
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
      currentStep: 1,
      selectedService: null,
      reservation: {
        startDate: '',
        endDate: ''
      },
      dateError: '',
      sortOption: 'RATING_DESC',
      petSitterWorks: []
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn
    }),
    today() {
      return new Date().toISOString().split('T')[0]
    },
    filteredServices() {
      if (!this.startDate || !this.endDate) return this.services
      
      return this.services.filter(service => {
        const serviceFrom = new Date(service.availableFrom)
        const serviceTo = new Date(service.availableTo)
        const filterFrom = new Date(this.startDate)
        const filterTo = new Date(this.endDate)
        
        return serviceFrom <= filterTo && serviceTo >= filterFrom
      })
    },
    sortedServices() {
      const services = [...this.filteredServices]
      
      switch (this.sortOption) {
        case 'RATING_DESC':
          return services.sort((a, b) => b.rating - a.rating)
        case 'RATING_ASC':
          return services.sort((a, b) => a.rating - b.rating)
        case 'FEE_DESC':
          return services.sort((a, b) => b.price - a.price)
        case 'FEE_ASC':
          return services.sort((a, b) => a.price - b.price)
        case 'TOTAL_SERVICE_COUNT_DESC':
          return services.sort((a, b) => b.totalCare - a.totalCare)
        case 'TOTAL_SERVICE_COUNT_ASC':
          return services.sort((a, b) => a.totalCare - b.totalCare)
        default:
          return services
      }
    },
    isDateValid() {
      return this.reservation.startDate && 
             this.reservation.endDate && 
             this.reservation.startDate <= this.reservation.endDate
    }
  },
  methods: {
    filterServices() {
      console.log('필터링된 서비스:', this.filteredServices)
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
    getPetSizeLabel(size) {
      const labels = {
        small: '소형견(10kg이하)',
        medium: '중형견(10kg~25kg)',
        large: '대형견(25kg초과)'
      }
      return labels[size] || size
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
      this.currentStep = 1
      this.reservation = {
        startDate: '',
        endDate: ''
      }
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
      this.currentStep = 1
    },
    goToNextStep() {
      if (this.isDateValid) {
        this.currentStep = 2
      }
    },
    calculateDays() {
      if (!this.reservation.startDate || !this.reservation.endDate) return 0
      const start = new Date(this.reservation.startDate)
      const end = new Date(this.reservation.endDate)
      const diffTime = Math.abs(end - start)
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    },
    calculateTotalPrice() {
      return this.calculateDays() * this.selectedService.price
    },
    proceedToPayment() {
      // 결제 페이지로 이동하면서 예약 정보 전달
      this.$router.push({
        path: '/payment',
        query: {
          serviceId: this.selectedService.id,
          startDate: this.reservation.startDate,
          endDate: this.reservation.endDate,
          amount: this.calculateTotalPrice()
        }
      })
    },
    async fetchPetSitterWorks() {
      try {
        const response = await axios.get('/api/v1/pet-sitter-work')
        this.petSitterWorks = response.data
      } catch (error) {
        console.error('펫시터 서비스 목록 조회 실패:', error)
      }
    },
    getServiceTypeLabel(type) {
      const labels = {
        'WALK': '산책',
        'VISIT_CARE': '방문돌봄',
        'FOSTER_CARE': '위탁돌봄'
      }
      return labels[type] || type
    },
    getSizeLabel(size) {
      const labels = {
        'SMALL': '소형견(10kg이하)',
        'MEDIUM': '중형견(10kg~25kg)',
        'LARGE': '대형견(25kg초과)'
      }
      return labels[size] || size
    }
  },
  watch: {
    'reservation.startDate'(newDate) {
      // 시작일이 변경되면 종료일 초기화
      if (newDate) {
        const startDate = new Date(newDate)
        const availableFrom = new Date(this.selectedService.availableFrom)
        const availableTo = new Date(this.selectedService.availableTo)
        
        if (startDate < availableFrom || startDate > availableTo) {
          this.dateError = '선택하신 날짜는 펫시터의 가능 일정을 벗어났습니다.'
          this.reservation.startDate = ''
        } else {
          this.dateError = ''
        }
      }
      this.reservation.endDate = ''
    },
    'reservation.endDate'(newDate) {
      if (newDate) {
        const endDate = new Date(newDate)
        const availableTo = new Date(this.selectedService.availableTo)
        
        if (endDate > availableTo) {
          this.dateError = '선택하신 날짜는 펫시터의 가능 일정을 벗어났습니다.'
          this.reservation.endDate = ''
        } else {
          this.dateError = ''
        }
      }
    }
  },
  async created() {
    await this.fetchPetSitterWorks()
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