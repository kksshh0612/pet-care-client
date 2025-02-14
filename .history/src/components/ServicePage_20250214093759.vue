<template>
  <div class="min-h-screen bg-white">
    <!-- 네비게이션 바는 MainPage와 동일 -->
    <nav class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <!-- 네비게이션 내용 동일 -->
    </nav>

    <!-- 메인 컨텐츠 -->
    <main class="pt-16">
      <!-- 헤더 섹션 -->
      <section class="relative bg-gradient-to-b from-[#F3F0FF] to-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-gray-900 text-center">
            돌봄 서비스
          </h1>
          <p class="mt-4 text-xl text-gray-600 text-center">
            신뢰할 수 있는 펫시터와 다양한 서비스를 만나보세요
          </p>
        </div>
      </section>

      <!-- 인기 반려동물 섹션 -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">
            이달의 인기 반려동물
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 인기 반려동물 카드 -->
            <div v-for="pet in popularPets" :key="pet.id" 
                 class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div class="relative pb-[75%]">
                <img :src="pet.image" :alt="pet.name" 
                     class="absolute inset-0 w-full h-full object-cover">
                <div class="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                  <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-600 font-medium">{{ pet.likes }}</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900">{{ pet.name }}</h3>
                <p class="mt-2 text-gray-600">{{ pet.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 추천 펫시터 섹션 -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">
              최고의 펫시터
            </h2>
            <!-- 필터 및 정렬 옵션 -->
            <div class="flex items-center gap-4">
              <!-- 평점순 필터 -->
              <div class="relative">
                <select 
                  class="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C47FF] hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <option value="rating">평점 높은순</option>
                  <option value="review">후기 많은순</option>
                  <option value="price_low">가격 낮은순</option>
                  <option value="price_high">가격 높은순</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <!-- 동물 종류 필터 -->
              <div class="flex gap-2">
                <button
                  v-for="type in petTypeFilters"
                  :key="type.value"
                  @click="togglePetTypeFilter(type.value)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    selectedPetTypes.includes(type.value)
                      ? 'bg-[#6C47FF] text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <div class="flex items-center gap-1.5">
                    <span>{{ type.label }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- 펫시터 목록 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div v-for="sitter in petSitters" :key="sitter.id" 
                 class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <!-- 프로필 이미지 -->
              <div class="relative pb-[80%]">
                <img :src="sitter.profileImage" :alt="sitter.name" 
                     class="absolute inset-0 w-full h-full object-cover">
                <!-- 찜하기 버튼 -->
                <button 
                  class="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  @click="toggleFavorite(sitter.id)"
                >
                  <svg class="w-4 h-4" :class="sitter.isFavorite ? 'text-red-500' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <!-- 펫시터 정보 -->
              <div class="p-4">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="text-base font-semibold text-gray-900">{{ sitter.name }}</h3>
                    <p class="text-xs text-gray-600">{{ sitter.location }}</p>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="ml-1 text-xs font-medium text-gray-900">{{ sitter.rating }}</span>
                    <span class="mx-1 text-gray-400">•</span>
                    <span class="text-xs text-gray-500">후기 {{ sitter.reviewCount }}개</span>
                  </div>
                </div>

                <!-- 가능한 동물 종류 -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span v-for="type in sitter.petTypes" :key="type" 
                        class="px-1.5 py-0.5 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs">
                    {{ getPetTypeLabel(type) }}
                  </span>
                </div>

                <!-- 시간당 요금 -->
                <div class="flex justify-between items-center">
                  <div class="text-[#6C47FF]">
                    <span class="text-base font-bold">{{ formatPrice(sitter.hourlyRate) }}</span>
                    <span class="text-xs">/시간</span>
                  </div>
                  <button 
                    class="px-3 py-1.5 bg-[#6C47FF] text-white rounded-lg text-xs font-medium hover:bg-[#5835FF] transition-colors"
                    @click="bookPetSitter(sitter.id)"
                  >
                    예약하기
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 더보기 버튼 -->
          <div class="flex justify-center mt-8">
            <button 
              class="px-6 py-3 border-2 border-[#6C47FF] text-[#6C47FF] rounded-lg font-medium hover:bg-[#F3F0FF] transition-colors"
              @click="loadMore"
            >
              더 많은 펫시터 보기
            </button>
          </div>
        </div>
      </section>

      <!-- 인기 펫용품 섹션 -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">
            인기 펫용품
          </h2>

          <!-- 카테고리별 상품 목록 -->
          <div class="space-y-12">
            <!-- 사료 카테고리 -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-900">사료</h3>
                <button 
                  class="text-[#6C47FF] text-sm font-medium hover:underline flex items-center gap-1"
                  @click="viewMoreProducts('food')"
                >
                  더보기
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div v-for="product in getFoodProducts" :key="product.id" 
                     class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div class="relative pb-[100%]">
                    <img :src="product.image" :alt="product.name" 
                         class="absolute inset-0 w-full h-full object-cover">
                    <div class="absolute top-2 right-2">
                      <span class="bg-[#6C47FF] text-white px-2 py-1 rounded-full text-xs">
                        {{ product.discount }}% OFF
                      </span>
                    </div>
                  </div>
                  <div class="p-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-1">{{ product.name }}</h4>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-[#6C47FF] font-bold">{{ formatPrice(product.price) }}</p>
                        <p class="text-xs text-gray-500 line-through">{{ formatPrice(product.originalPrice) }}</p>
                      </div>
                      <div class="flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="ml-1">{{ product.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 위생용품 카테고리 -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-900">위생용품</h3>
                <button 
                  class="text-[#6C47FF] text-sm font-medium hover:underline flex items-center gap-1"
                  @click="viewMoreProducts('hygiene')"
                >
                  더보기
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div v-for="product in getHygieneProducts" :key="product.id" 
                     class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <!-- 상품 카드 내용은 동일 -->
                </div>
              </div>
            </div>

            <!-- 의류 카테고리 -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-900">의류</h3>
                <button 
                  class="text-[#6C47FF] text-sm font-medium hover:underline flex items-center gap-1"
                  @click="viewMoreProducts('clothing')"
                >
                  더보기
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div v-for="product in getClothingProducts" :key="product.id" 
                     class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <!-- 상품 카드 내용은 동일 -->
                </div>
              </div>
            </div>

            <!-- 식기/그릇 카테고리 -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-gray-900">식기/그릇</h3>
                <button 
                  class="text-[#6C47FF] text-sm font-medium hover:underline flex items-center gap-1"
                  @click="viewMoreProducts('bowl')"
                >
                  더보기
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div v-for="product in getBowlProducts" :key="product.id" 
                     class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <!-- 상품 카드 내용은 동일 -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer는 MainPage와 동일 -->
    <footer class="bg-gray-900 text-gray-300">
      <!-- Footer 내용 동일 -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ServicePage',
  data() {
    return {
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
      petSitters: [
        {
          id: 1,
          name: '김민서',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 강남구',
          rating: 4.9,
          reviewCount: 128,
          petTypes: ['dog', 'cat'],
          hourlyRate: 15000,
          isFavorite: false
        },
        {
          id: 2,
          name: '이지원',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 서초구',
          rating: 4.8,
          reviewCount: 96,
          petTypes: ['dog', 'bird'],
          hourlyRate: 13000,
          isFavorite: true
        },
        {
          id: 3,
          name: '박서연',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 송파구',
          rating: 4.9,
          reviewCount: 157,
          petTypes: ['dog', 'cat', 'bird'],
          hourlyRate: 16000,
          isFavorite: false
        },
        {
          id: 4,
          name: '최준호',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 마포구',
          rating: 4.7,
          reviewCount: 84,
          petTypes: ['dog', 'reptile'],
          hourlyRate: 14000,
          isFavorite: false
        },
        {
          id: 5,
          name: '정다은',
          profileImage: '/src/assets/test_image.jpg',
          location: '서울시 용산구',
          rating: 4.8,
          reviewCount: 112,
          petTypes: ['cat', 'bird'],
          hourlyRate: 12000,
          isFavorite: false
        }
      ],
      products: [
        // 사료 카테고리
        {
          id: 1,
          category: 'food',
          name: '로얄캐닌 강아지 사료',
          image: '/src/assets/test_image.jpg',
          price: 45000,
          originalPrice: 60000,
          discount: 25,
          rating: 4.8
        },
        {
          id: 2,
          category: 'food',
          name: '네이처스 프로텍션 고양이 사료',
          image: '/src/assets/test_image.jpg',
          price: 35000,
          originalPrice: 42000,
          discount: 17,
          rating: 4.7
        },
        {
          id: 3,
          category: 'food',
          name: '힐스 사이언스 다이어트',
          image: '/src/assets/test_image.jpg',
          price: 52000,
          originalPrice: 65000,
          discount: 20,
          rating: 4.9
        },
        {
          id: 4,
          category: 'food',
          name: '오리젠 퍼피 사료',
          image: '/src/assets/test_image.jpg',
          price: 48000,
          originalPrice: 55000,
          discount: 13,
          rating: 4.8
        },
        {
          id: 5,
          category: 'food',
          name: '아카나 와일드 프레리',
          image: '/src/assets/test_image.jpg',
          price: 42000,
          originalPrice: 50000,
          discount: 16,
          rating: 4.6
        },

        // 위생용품 카테고리
        {
          id: 6,
          category: 'hygiene',
          name: '프리미엄 반려동물 물티슈',
          image: '/src/assets/test_image.jpg',
          price: 12000,
          originalPrice: 15000,
          discount: 20,
          rating: 4.7
        },
        {
          id: 7,
          category: 'hygiene',
          name: '항균 발바닥 클리너',
          image: '/src/assets/test_image.jpg',
          price: 18000,
          originalPrice: 25000,
          discount: 28,
          rating: 4.5
        },
        {
          id: 8,
          category: 'hygiene',
          name: '강아지 귀 세정제',
          image: '/src/assets/test_image.jpg',
          price: 15000,
          originalPrice: 20000,
          discount: 25,
          rating: 4.8
        },
        {
          id: 9,
          category: 'hygiene',
          name: '고양이 모래',
          image: '/src/assets/test_image.jpg',
          price: 22000,
          originalPrice: 28000,
          discount: 21,
          rating: 4.9
        },
        {
          id: 10,
          category: 'hygiene',
          name: '반려동물 샴푸',
          image: '/src/assets/test_image.jpg',
          price: 25000,
          originalPrice: 32000,
          discount: 22,
          rating: 4.6
        },

        // 의류 카테고리
        {
          id: 11,
          category: 'clothing',
          name: '겨울용 강아지 패딩',
          image: '/src/assets/test_image.jpg',
          price: 35000,
          originalPrice: 45000,
          discount: 22,
          rating: 4.8
        },
        {
          id: 12,
          category: 'clothing',
          name: '고양이 레인코트',
          image: '/src/assets/test_image.jpg',
          price: 28000,
          originalPrice: 35000,
          discount: 20,
          rating: 4.5
        },
        {
          id: 13,
          category: 'clothing',
          name: '강아지 니트 스웨터',
          image: '/src/assets/test_image.jpg',
          price: 23000,
          originalPrice: 30000,
          discount: 23,
          rating: 4.7
        },
        {
          id: 14,
          category: 'clothing',
          name: '애견 산책용 조끼',
          image: '/src/assets/test_image.jpg',
          price: 32000,
          originalPrice: 40000,
          discount: 20,
          rating: 4.6
        },
        {
          id: 15,
          category: 'clothing',
          name: '강아지 수면 잠옷',
          image: '/src/assets/test_image.jpg',
          price: 26000,
          originalPrice: 35000,
          discount: 26,
          rating: 4.4
        },

        // 식기/그릇 카테고리
        {
          id: 16,
          category: 'bowl',
          name: '자동 급수기',
          image: '/src/assets/test_image.jpg',
          price: 45000,
          originalPrice: 55000,
          discount: 18,
          rating: 4.9
        },
        {
          id: 17,
          category: 'bowl',
          name: '고양이 기울어진 식기',
          image: '/src/assets/test_image.jpg',
          price: 18000,
          originalPrice: 25000,
          discount: 28,
          rating: 4.7
        },
        {
          id: 18,
          category: 'bowl',
          name: '강아지 슬로우 식기',
          image: '/src/assets/test_image.jpg',
          price: 22000,
          originalPrice: 28000,
          discount: 21,
          rating: 4.8
        },
        {
          id: 19,
          category: 'bowl',
          name: '스테인레스 2중 식기',
          image: '/src/assets/test_image.jpg',
          price: 25000,
          originalPrice: 32000,
          discount: 22,
          rating: 4.6
        },
        {
          id: 20,
          category: 'bowl',
          name: '자동 급식기',
          image: '/src/assets/test_image.jpg',
          price: 55000,
          originalPrice: 70000,
          discount: 21,
          rating: 4.7
        }
      ],
      petTypeFilters: [
        { label: '전체', value: 'all' },
        { label: '강아지', value: 'dog' },
        { label: '고양이', value: 'cat' },
        { label: '조류', value: 'bird' },
        { label: '파충류', value: 'reptile' }
      ],
      selectedPetTypes: ['all']
    }
  },
  computed: {
    getFoodProducts() {
      return this.products.filter(p => p.category === 'food')
    },
    getHygieneProducts() {
      return this.products.filter(p => p.category === 'hygiene')
    },
    getClothingProducts() {
      return this.products.filter(p => p.category === 'clothing')
    },
    getBowlProducts() {
      return this.products.filter(p => p.category === 'bowl')
    }
  },
  methods: {
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
    formatPrice(price) {
      return price.toLocaleString() + '원'
    },
    toggleFavorite(sitterId) {
      const sitter = this.petSitters.find(s => s.id === sitterId)
      if (sitter) {
        sitter.isFavorite = !sitter.isFavorite
      }
    },
    bookPetSitter(sitterId) {
      // 예약 페이지로 이동 또는 예약 모달 표시
      console.log('펫시터 예약:', sitterId)
    },
    loadMore() {
      // 추가 펫시터 데이터 로드
      console.log('더 많은 펫시터 로드')
    },
    togglePetTypeFilter(type) {
      if (type === 'all') {
        this.selectedPetTypes = ['all']
      } else {
        // 'all' 필터 제거
        this.selectedPetTypes = this.selectedPetTypes.filter(t => t !== 'all')
        
        const index = this.selectedPetTypes.indexOf(type)
        if (index === -1) {
          this.selectedPetTypes.push(type)
        } else {
          this.selectedPetTypes.splice(index, 1)
        }
        
        // 아무것도 선택되지 않았다면 '전체' 선택
        if (this.selectedPetTypes.length === 0) {
          this.selectedPetTypes = ['all']
        }
      }
    },
    viewMoreProducts(category) {
      // 카테고리별 상품 목록 페이지로 이동하거나 더 많은 상품을 로드
      console.log(`${category} 카테고리 더보기 클릭`)
    }
  }
}
</script> 