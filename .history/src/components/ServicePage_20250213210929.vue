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
          <h2 class="text-3xl font-bold text-gray-900 mb-8">
            최고의 펫시터
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- 펫시터 카드 -->
            <div v-for="sitter in topSitters" :key="sitter.id" 
                 class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div class="relative pb-[100%]">
                <img :src="sitter.image" :alt="sitter.name" 
                     class="absolute inset-0 w-full h-full object-cover">
              </div>
              <div class="p-6">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ sitter.name }}</h3>
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="ml-1 text-gray-600 font-medium">{{ sitter.rating }}</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600">{{ sitter.description }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="tag in sitter.tags" :key="tag" 
                        class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 인기 용품 섹션 -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">
            인기 펫 용품
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <!-- 용품 카드 -->
            <div v-for="product in popularProducts" :key="product.id" 
                 class="group relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div class="relative pb-[100%]">
                <img :src="product.image" :alt="product.name" 
                     class="absolute inset-0 w-full h-full object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ product.price }}</p>
                <div class="mt-2 flex items-center space-x-2">
                  <div class="flex items-center text-yellow-400">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="ml-1 text-sm text-gray-600">{{ product.rating }}</span>
                  </div>
                  <span class="text-sm text-gray-500">리뷰 {{ product.reviewCount }}</span>
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
          image: '/pets/choco.jpg',
          description: '장난기 많은 골든리트리버',
          likes: 2840
        },
        {
          id: 2,
          name: '몽이',
          image: '/pets/mongi.jpg',
          description: '귀여운 말티즈',
          likes: 2453
        },
        {
          id: 3,
          name: '루시',
          image: '/pets/lucy.jpg',
          description: '활발한 비숑프리제',
          likes: 2312
        }
      ],
      topSitters: [
        {
          id: 1,
          name: '김민서',
          image: '/sitters/sitter1.jpg',
          rating: 4.9,
          description: '반려동물 전문가 자격증 보유',
          tags: ['전문 펫시터', '5년 경력', '자격증']
        },
        // ... 더 많은 펫시터 데이터
      ],
      popularProducts: [
        {
          id: 1,
          name: '프리미엄 펫 하우스',
          image: '/products/house.jpg',
          price: '89,000원',
          rating: 4.8,
          reviewCount: 245
        },
        // ... 더 많은 제품 데이터
      ]
    }
  }
}
</script> 