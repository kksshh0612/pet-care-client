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
          <!-- 펫시터 프로필 -->
          <div class="p-6">
            <div class="flex items-center gap-4 mb-4">
              <img 
                :src="service.profileImage" 
                alt="펫시터 프로필" 
                class="w-16 h-16 rounded-full object-cover"
              >
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ service.name }}</h3>
                <p class="text-sm text-gray-500">{{ service.location }}</p>
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
                  <span class="text-sm text-gray-600">시간당</span>
                  <span class="text-lg font-bold text-[#6C47FF]">
                    {{ formatPrice(service.hourlyRate) }}원
                  </span>
                </div>
              </div>
            </div>

            <!-- 예약하기 버튼 -->
            <button 
              @click="bookService(service)"
              class="w-full mt-6 px-4 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
            >
              예약하기
            </button>
          </div>
        </div>
      </div>

      <!-- 인기 반려동물 섹션 -->
      <h2 class="text-2xl font-bold text-gray-900 mb-6">인기 반려동물</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          hourlyRate: 15000,
          availableFrom: '2024-02-01',
          availableTo: '2024-03-31'
        },
        {
          id: 2,
          name: '이펫시터',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 서초구',
          serviceTypes: ['방문 돌봄', '위탁 돌봄'],
          petSizes: ['small', 'medium', 'large'],
          hourlyRate: 20000,
          availableFrom: '2024-02-01',
          availableTo: '2024-04-30'
        },
        {
          id: 3,
          name: '박펫시터',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 송파구',
          serviceTypes: ['산책', '방문 돌봄'],
          petSizes: ['small'],
          hourlyRate: 13000,
          availableFrom: '2024-02-15',
          availableTo: '2024-05-31'
        },
        {
          id: 4,
          name: '최펫시터',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 마포구',
          serviceTypes: ['산책', '방문 돌봄', '위탁 돌봄'],
          petSizes: ['small', 'medium'],
          hourlyRate: 18000,
          availableFrom: '2024-02-10',
          availableTo: '2024-06-30'
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
    }
  }
}
</script> 