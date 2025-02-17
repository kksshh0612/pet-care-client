<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F3F0FF]/30 to-white pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 날짜 필터 섹션 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900">돌봄 날짜 선택</h2>
          <div class="flex gap-4">
            <div class="relative">
              <label class="block text-sm text-gray-700 mb-1">시작일</label>
              <input 
                type="date" 
                v-model="startDate"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
                :min="today"
              >
            </div>
            <div class="relative">
              <label class="block text-sm text-gray-700 mb-1">종료일</label>
              <input 
                type="date" 
                v-model="endDate"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
                :min="startDate"
              >
            </div>
            <button 
              @click="filterServices"
              class="self-end px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
            >
              검색
            </button>
          </div>
        </div>
      </div>

      <!-- 펫시터 서비스 목록 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="service in filteredServices" :key="service.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 space-y-6">
            <!-- 펫시터 프로필 -->
            <div class="flex items-center gap-4">
              <img 
                :src="service.profileImage" 
                alt="펫시터 프로필" 
                class="w-16 h-16 rounded-full object-cover"
              >
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ service.name }}</h3>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span>{{ service.location }}</span>
                  <span class="text-gray-300">|</span>
                  <div class="flex items-center">
                    <span class="text-yellow-400">★</span>
                    <span class="ml-1">{{ service.rating.toFixed(1) }}</span>
                  </div>
                  <span class="text-gray-300">|</span>
                  <span>돌봄 {{ service.totalCare }}회</span>
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
                    class="px-3 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-sm"
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
                    class="px-3 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-sm"
                  >
                    {{ getPetSizeLabel(size) }}
                  </span>
                </div>
              </div>

              <!-- 가능 일정 -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">가능 일정</h4>
                <p class="text-sm text-gray-600">
                  {{ formatDate(service.availableFrom) }} ~ {{ formatDate(service.availableTo) }}
                </p>
              </div>

              <!-- 요금 정보 -->
              <div class="pt-4 border-t">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">요금</span>
                  <span class="text-lg font-bold text-[#6C47FF]">
                    {{ formatPrice(service.price) }}원
                  </span>
                </div>
              </div>
            </div>

            <!-- 예약하기 버튼 -->
            <button 
              @click="bookService(service)"
              class="w-full px-4 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
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
      ]
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
      console.log('서비스 예약:', service)
      alert('예약 기능은 준비 중입니다.')
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
    }
  }
}
</script> 