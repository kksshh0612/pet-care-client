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
      class="fixed top-16 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >
      <nav class="p-6 space-y-2">
        <!-- 내 펫 관리 -->
        <button 
          @click="openPetManageModal"
          class="w-full flex items-center px-4 py-3 text-[#6C47FF] rounded-lg hover:bg-[#F3F0FF] transition-colors text-left"
        >
          <span class="text-sm font-bold">내 펫 관리</span>
        </button>

        <!-- 구분선 추가 -->
        <div class="h-px bg-gray-200 my-2"></div>

        <!-- 회원정보 수정 -->
        <button 
          @click="openEditModal"
          class="w-full flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-left"
        >
          <span class="text-sm font-bold">회원정보 수정</span>
        </button>

        <!-- 비밀번호 변경 -->
        <button
          @click="openPasswordModal"
          class="w-full flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-left"
        >
          <span class="text-sm font-bold">비밀번호 변경</span>
        </button>

        <!-- 회원 탈퇴 -->
        <button
          @click="openWithdrawModal"
          class="w-full flex items-center px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left"
        >
          <span class="text-sm font-bold">회원 탈퇴</span>
        </button>
      </nav>
    </div>

    <!-- 메인 컨텐츠 -->
    <main 
      class="transition-all duration-300 pt-24"
      :class="isSidebarOpen ? 'ml-64' : 'ml-0'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 프로필 섹션 -->
        <section class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
            <!-- 프로필 이미지 -->
            <div class="relative">
              <div class="w-32 h-32 rounded-full overflow-hidden">
                <img 
                  :src="userInfo.profileImage || '/src/assets/test_image.jpg'" 
                  alt="프로필 이미지"
                  class="w-full h-full object-cover"
                >
              </div>
              <button 
                class="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <!-- 회원 정보 -->
            <div class="flex-1">
              <div class="flex items-center justify-between mb-4">
                <h1 class="text-2xl font-bold text-gray-900">{{ userInfo.name }}</h1>
                <button
                  @click="openPetSitterRegisterModal"
                  class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  펫시터 등록
                </button>
              </div>
              <div class="space-y-2 text-gray-600">
                <p class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ userInfo.email }}
                </p>
                <p class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ userInfo.phone }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 프로필 섹션과 반려동물 섹션 사이에 추가 -->
        <section v-if="userInfo.isPetSitter" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">나의 펫시터 정보</h2>
            <button
              @click="openEditPetSitterModal"
              class="px-4 py-2 text-[#6C47FF] border border-[#6C47FF] rounded-lg text-sm font-medium hover:bg-[#F3F0FF] transition-colors"
            >
              정보 수정
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 기본 정보 -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">활동 지역</h3>
                <p class="text-gray-900">{{ userInfo.petSitterInfo.location }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">시간당 요금</h3>
                <p class="text-[#6C47FF] font-bold">{{ formatPrice(userInfo.petSitterInfo.hourlyRate) }}/시간</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">돌봄 가능한 반려동물</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="type in userInfo.petSitterInfo.petTypes" 
                    :key="type"
                    class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs"
                  >
                    {{ getPetTypeLabel(type) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 자기소개 및 경험 -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">자기소개</h3>
                <p class="text-gray-900 whitespace-pre-line">{{ userInfo.petSitterInfo.introduction }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">보유 자격증</h3>
                <div class="flex flex-wrap gap-2">
                  <a 
                    v-for="cert in userInfo.petSitterInfo.certificates" 
                    :key="cert.id"
                    :href="cert.url"
                    class="text-[#6C47FF] hover:underline text-sm"
                    target="_blank"
                  >
                    {{ cert.name }}
                  </a>
                </div>
              </div>
            </div>

            <!-- 통계 -->
            <div class="md:col-span-2 grid grid-cols-3 gap-4 mt-4">
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-500 text-sm mb-1">평균 평점</p>
                <div class="flex items-center justify-center gap-1">
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-xl font-bold text-gray-900">{{ userInfo.petSitterInfo.rating }}</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-500 text-sm mb-1">총 돌봄 횟수</p>
                <p class="text-xl font-bold text-gray-900">{{ userInfo.petSitterInfo.totalCare }}회</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-500 text-sm mb-1">이번 달 수입</p>
                <p class="text-xl font-bold text-[#6C47FF]">{{ formatPrice(userInfo.petSitterInfo.monthlyIncome) }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 반려동물 섹션 -->
        <section class="bg-white rounded-2xl shadow-lg p-8">
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-900">내 반려동물</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="pet in userPets" :key="pet.id" 
                 class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="relative pb-[75%]">
                <img :src="pet.image" :alt="pet.name" 
                     class="absolute inset-0 w-full h-full object-cover">
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">{{ pet.name }}</h3>
                <p class="text-sm text-gray-600">{{ pet.breed }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 비밀번호 변경 모달 추가 -->
    <ChangePasswordModal
      :is-open="isPasswordModalOpen"
      @close="closePasswordModal"
    />

    <!-- 회원정보 수정 모달 추가 -->
    <EditProfileModal
      :is-open="isEditModalOpen"
      :user-info="userInfo"
      @close="closeEditModal"
      @save="handleProfileUpdate"
    />

    <!-- 회원 탈퇴 모달 추가 -->
    <WithdrawModal
      :is-open="isWithdrawModalOpen"
      @close="closeWithdrawModal"
    />

    <!-- 펫시터 등록 모달 추가 -->
    <PetSitterRegisterModal
      :is-open="isPetSitterModalOpen"
      :user-info="userInfo"
      @close="closePetSitterModal"
    />

    <!-- 펫시터 정보 수정 모달 추가 -->
    <EditPetSitterModal
      v-if="isEditPetSitterModalOpen"
      :is-open="isEditPetSitterModalOpen"
      :pet-sitter-info="userInfo.petSitterInfo"
      @close="closeEditPetSitterModal"
      @save="handlePetSitterUpdate"
    />
  </div>
</template>

<script>
import ChangePasswordModal from './modals/ChangePasswordModal.vue'
import EditProfileModal from './modals/EditProfileModal.vue'
import WithdrawModal from './modals/WithdrawModal.vue'
import PetSitterRegisterModal from './modals/PetSitterRegisterModal.vue'
import EditPetSitterModal from './modals/EditPetSitterModal.vue'

export default {
  name: 'MyPage',
  components: {
    ChangePasswordModal,
    EditProfileModal,
    WithdrawModal,
    PetSitterRegisterModal,
    EditPetSitterModal
  },
  data() {
    return {
      isSidebarOpen: true, // 기본값은 열린 상태
      sideMenus: [
        { name: '내 펫 관리', path: '/mypage/pets' },
        { name: '회원정보 수정', path: '/mypage/edit' },
        { name: '비밀번호 변경', path: '/mypage/password' },
        { name: '회원 탈퇴', path: '/mypage/withdraw' }
      ],
      userInfo: {
        name: '김민서',
        email: 'minseo@example.com',
        phone: '010-1234-5678',
        profileImage: '/src/assets/test_image.jpg',
        isPetSitter: true,
        petSitterInfo: {
          location: '서울시 강남구',
          hourlyRate: 15000,
          petTypes: ['dog', 'cat', 'bird'],
          introduction: '반려동물을 사랑하는 마음으로 정성껏 돌보겠습니다.\n3년간의 펫시터 경험이 있습니다.',
          certificates: [
            { id: 1, name: '반려동물관리사', url: '#' },
            { id: 2, name: '동물행동교정사', url: '#' }
          ],
          rating: 4.9,
          totalCare: 128,
          monthlyIncome: 1250000
        }
      },
      userPets: [
        {
          id: 1,
          name: '초코',
          breed: '골든리트리버',
          image: '/src/assets/test_image.jpg'
        },
        {
          id: 2,
          name: '몽이',
          breed: '말티즈',
          image: '/src/assets/test_image.jpg'
        }
      ],
      isPasswordModalOpen: false,
      isEditModalOpen: false,
      isWithdrawModalOpen: false,
      isPetSitterModalOpen: false,
      isEditPetSitterModalOpen: false
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    openPasswordModal() {
      this.isPasswordModalOpen = true
    },
    closePasswordModal() {
      this.isPasswordModalOpen = false
    },
    openEditModal() {
      this.isEditModalOpen = true
    },
    closeEditModal() {
      this.isEditModalOpen = false
    },
    handleProfileUpdate(updatedData) {
      this.userInfo = {
        ...this.userInfo,
        ...updatedData
      }
    },
    openWithdrawModal() {
      this.isWithdrawModalOpen = true
    },
    closeWithdrawModal() {
      this.isWithdrawModalOpen = false
    },
    openPetManageModal() {
      // Implementation of openPetManageModal method
    },
    openPetSitterRegisterModal() {
      this.isPetSitterModalOpen = true
    },
    closePetSitterModal() {
      this.isPetSitterModalOpen = false
    },
    openEditPetSitterModal() {
      this.isEditPetSitterModalOpen = true
    },
    closeEditPetSitterModal() {
      this.isEditPetSitterModalOpen = false
    },
    handlePetSitterUpdate(updatedInfo) {
      this.userInfo.petSitterInfo = {
        ...this.userInfo.petSitterInfo,
        ...updatedInfo
      }
      this.closeEditPetSitterModal()
    },
    formatPrice(price) {
      return price.toLocaleString() + '원'
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
    }
  }
}
</script> 