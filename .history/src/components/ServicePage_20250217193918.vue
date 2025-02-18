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

      <!-- 펫시터 서비스 목록 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="service in filteredServices" :key="service.id" 
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
                    {{ type }}
                  </span>
                </div>
              </div>

              <!-- 돌봄 가능한 크기 -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">돌봄 가능한 크기</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="size in service.petSizes" 
                    :key="size"
                    class="px-3 py-1 bg-[#F8F9FD] text-[#6C47FF] rounded-full text-sm font-medium"
                  >
                    {{ getPetSizeLabel(size) }}
                  </span>
                </div>
              </div>

              <!-- 가능 일정 -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">가능 일정</h4>
                <p class="text-sm text-gray-600 bg-[#F8F9FD] px-3 py-2 rounded-lg">
                  {{ formatDate(service.availableFrom) }} ~ {{ formatDate(service.availableTo) }}
                </p>
              </div>

              <!-- 요금 정보 -->
              <div class="pt-4 border-t border-gray-100">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-600">요금</span>
                  <span class="text-lg font-bold text-[#6C47FF]">
                    {{ formatPrice(service.price) }}원
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
        <div v-if="currentStep === 1" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">시작일</label>
            <input 
              type="date" 
              v-model="reservation.startDate"
              :min="today"
              :max="selectedService.availableTo"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">종료일</label>
            <input 
              type="date" 
              v-model="reservation.endDate"
              :min="reservation.startDate"
              :max="selectedService.availableTo"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
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
          availableFrom: '2024-02-01',
          availableTo: '2024-03-31',
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
          availableFrom: '2024-02-01',
          availableTo: '2024-04-30',
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
          availableFrom: '2024-02-15',
          availableTo: '2024-05-31',
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
          availableFrom: '2024-02-10',
          availableTo: '2024-06-30',
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
      }
    }
  },
  computed: {
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
    }
  }
}
</script> 