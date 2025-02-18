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
        <!-- 펫시터 서비스 등록으로 변경 -->
        <button 
          @click="showServiceRegistrationModal = true"
          class="w-full flex items-center px-4 py-3 text-[#6C47FF] rounded-lg hover:bg-[#F3F0FF] transition-colors text-left"
        >
          <span class="text-sm font-bold">펫시터 서비스 등록</span>
        </button>

        <!-- 구분선 추가 -->
        <div class="h-px bg-gray-200 my-2"></div>

        <!-- 관리자 페이지 버튼 -->
        <button 
          v-if="userInfo && userInfo.isAdmin"
          @click="goToAdminPage"
          class="w-full flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-left"
        >
          <span class="text-sm font-bold">관리자 페이지</span>
        </button>

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

        <!-- 로그아웃 버튼 -->
        <button 
          @click="handleLogout"
          class="w-full flex items-center px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left"
        >
          <span class="text-sm font-bold">로그아웃</span>
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
                  :src="userInfo.profileImage" 
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
                  v-if="!petSitterInfo"
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
                  {{ userInfo.emailAddress }}
                </p>
                <p class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ userInfo.phoneNumber }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 프로필 섹션과 반려동물 섹션 사이에 추가 -->
        <section v-if="petSitterInfo" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">나의 펫시터 프로필</h2>
            <div class="flex items-center gap-4">
              <span v-if="!petSitterInfo.isApproved" class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                승인 대기중
              </span>
              <span v-else class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                승인됨
              </span>
              <button
                v-if="userInfo.isPetSitter && petSitterInfo.isApproved"
                @click="showServiceRegistrationModal = true"
                class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
              >
                서비스 등록
              </button>
              <button
                @click="openEditPetSitterModal"
                class="px-4 py-2 text-[#6C47FF] border border-[#6C47FF] rounded-lg text-sm font-medium hover:bg-[#F3F0FF] transition-colors"
              >
                프로필 수정
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 기본 정보 -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">활동 지역</h3>
                <p class="text-gray-900">{{ petSitterInfo.location }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">돌봄 가능 요일</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="day in petSitterInfo.availableDays" 
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
                    v-for="type in petSitterInfo.petTypes" 
                    :key="type"
                    class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs"
                  >
                    {{ getPetTypeLabel(type) }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">요금</h3>
                <p class="text-[#6C47FF] font-bold">{{ formatPrice(petSitterInfo.fee) }}원</p>
              </div>
            </div>

            <!-- 자기소개 및 통계 -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">자기소개</h3>
                <p class="text-gray-900 whitespace-pre-line">{{ petSitterInfo.introduction }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">보유 자격증</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="cert in petSitterInfo.certificationNames" 
                    :key="cert"
                    class="text-[#6C47FF] text-sm"
                  >
                    {{ cert }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 통계 -->
            <div class="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-500 text-sm mb-1">평균 평점</p>
                <div class="flex items-center justify-center gap-1">
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-xl font-bold text-gray-900">{{ petSitterInfo.averageRating.toFixed(1) }}</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <p class="text-gray-500 text-sm mb-1">총 돌봄 횟수</p>
                <p class="text-xl font-bold text-gray-900">{{ petSitterInfo.totalServiceCount }}회</p>
              </div>
              <div class="md:col-span-1 flex justify-center items-center">
                <button
                  @click="openCertificationModal"
                  class="px-4 py-2 text-[#6C47FF] border border-[#6C47FF] rounded-lg text-sm font-medium hover:bg-[#F3F0FF] transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  자격증 등록
                </button>
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

        <!-- 서비스 등록 모달 -->
        <div v-if="showServiceRegistrationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl p-6 w-full max-w-lg">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">펫시터 서비스 등록</h3>
              <button 
                @click="showServiceRegistrationModal = false"
                class="text-gray-400 hover:text-gray-500"
              >
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="registerPetSitterService" class="space-y-6">
              <!-- 가능 서비스 종류 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">가능 서비스 종류</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="serviceForm.serviceTypes" 
                      value="WALK"
                      class="rounded border-gray-300 text-[#6C47FF] focus:ring-[#6C47FF]"
                    >
                    <span class="ml-2 text-gray-700">산책</span>
                  </label>
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="serviceForm.serviceTypes" 
                      value="VISIT_CARE"
                      class="rounded border-gray-300 text-[#6C47FF] focus:ring-[#6C47FF]"
                    >
                    <span class="ml-2 text-gray-700">방문돌봄</span>
                  </label>
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="serviceForm.serviceTypes" 
                      value="FOSTER_CARE"
                      class="rounded border-gray-300 text-[#6C47FF] focus:ring-[#6C47FF]"
                    >
                    <span class="ml-2 text-gray-700">위탁돌봄</span>
                  </label>
                </div>
              </div>

              <!-- 돌봄 가능 사이즈 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">돌봄 가능 사이즈</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="serviceForm.availableSizes" 
                      value="SMALL"
                      class="rounded border-gray-300 text-[#6C47FF] focus:ring-[#6C47FF]"
                    >
                    <span class="ml-2 text-gray-700">소형견(10kg이하)</span>
                  </label>
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="serviceForm.availableSizes" 
                      value="MEDIUM"
                      class="rounded border-gray-300 text-[#6C47FF] focus:ring-[#6C47FF]"
                    >
                    <span class="ml-2 text-gray-700">중형견(10kg~25kg)</span>
                  </label>
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="serviceForm.availableSizes" 
                      value="LARGE"
                      class="rounded border-gray-300 text-[#6C47FF] focus:ring-[#6C47FF]"
                    >
                    <span class="ml-2 text-gray-700">대형견(25kg초과)</span>
                  </label>
                </div>
              </div>

              <!-- 가능 날짜 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">가능 날짜</label>
                <input 
                  type="date" 
                  v-model="serviceForm.availableDay"
                  required
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
                >
              </div>

              <!-- 요금 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">1일 요금</label>
                <div class="relative">
                  <input 
                    type="number" 
                    v-model="serviceForm.fee"
                    required
                    min="0"
                    step="1000"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
                  >
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                </div>
              </div>

              <div class="flex justify-end gap-4">
                <button 
                  type="button"
                  @click="showServiceRegistrationModal = false"
                  class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- 회원정보 수정 모달 -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">회원정보 수정</h3>
        <form @submit.prevent="updateMemberInfo" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input 
              v-model="memberForm.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input 
              v-model="memberForm.emailAddress"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
            <input 
              v-model="memberForm.phoneNumber"
              type="tel"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          <div class="flex justify-end gap-4">
            <button 
              type="button"
              @click="closeEditModal"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              취소
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 비밀번호 변경 모달 추가 -->
    <ChangePasswordModal
      :is-open="isPasswordModalOpen"
      @close="closePasswordModal"
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
import { mapState } from 'vuex'
import axios from 'axios'
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
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  data() {
    return {
      isSidebarOpen: false,
      isPasswordModalOpen: false,
      isEditModalOpen: false,
      isWithdrawModalOpen: false,
      isPetSitterModalOpen: false,
      isEditPetSitterModalOpen: false,
      memberForm: {
        name: '',
        emailAddress: '',
        phoneNumber: ''
      },
      errorMessage: '',
      petSitterInfo: null,
      showServiceRegistrationModal: false,
      serviceForm: {
        serviceTypes: [],
        availableSizes: [],
        availableDay: '',
        fee: 0
      }
    }
  },
  async created() {
    await this.$store.dispatch('checkLoginStatus')
    await this.fetchPetSitterInfo()
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
      this.memberForm = {
        name: this.userInfo.name,
        emailAddress: this.userInfo.emailAddress,
        phoneNumber: this.userInfo.phoneNumber
      }
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
    },
    async updateMemberInfo() {
      try {
        await axios.patch('/api/v1/member/member-info', this.memberForm)
        // 회원 정보 업데이트 후 userInfo 갱신
        this.userInfo = {
          ...this.userInfo,
          ...this.memberForm
        }
        alert('회원 정보가 성공적으로 수정되었습니다.')
        this.closeEditModal()
      } catch (error) {
        console.error('회원 정보 수정 실패:', error)
        this.errorMessage = '회원 정보 수정에 실패했습니다. 잠시 후 다시 시도해주세요.'
      }
    },
    async handleLogout() {
      const success = await this.$store.dispatch('logout')
      if (success) {
        this.$router.push('/login')
      } else {
        alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    },
    // 관리자 페이지로 이동하는 메서드 추가
    goToAdminPage() {
      this.$router.push('/admin')
    },
    async fetchPetSitterInfo() {
      try {
        const response = await axios.get('/api/v1/pet-sitter/my-pet-sitter')
        this.petSitterInfo = response.data
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error('펫시터 정보 조회 실패:', error)
        }
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
    },
    async registerPetSitterService() {
      try {
        const response = await axios.post('/api/v1/pet-sitter-work', {
          ...this.serviceForm,
          petSitterId: this.petSitterInfo.id
        })
        
        alert('서비스가 등록되었습니다.')
        this.showServiceRegistrationModal = false
        
        // 폼 초기화
        this.serviceForm = {
          serviceTypes: [],
          availableSizes: [],
          availableDay: '',
          fee: 0
        }
      } catch (error) {
        console.error('서비스 등록 실패:', error)
        alert('서비스 등록에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  }
}
</script> 