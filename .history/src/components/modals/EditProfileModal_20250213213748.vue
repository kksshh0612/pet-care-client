<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 배경 오버레이 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

    <!-- 모달 컨텐츠 -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <!-- 모달 헤더 -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-bold text-gray-900">회원정보 수정</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 모달 본문 -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- 이름 입력 -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">이름</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF]"
              />
            </div>

            <!-- 이메일 입력 -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
              <div class="mt-1 flex gap-2">
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  :disabled="isEmailVerifying"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF] disabled:bg-gray-100"
                />
                <button
                  v-if="isEmailChanged"
                  type="button"
                  @click="verifyEmail"
                  :disabled="isEmailVerifying"
                  class="px-4 py-2 bg-[#6C47FF] text-white rounded-md hover:bg-[#5835FF] disabled:bg-gray-400 transition-colors"
                >
                  인증
                </button>
              </div>
              <!-- 이메일 상태 메시지 -->
              <p v-if="isEmailChanged && !isEmailVerified" class="mt-1 text-sm text-red-600">
                이메일 변경 시 인증이 필요합니다.
              </p>
              <p v-if="isEmailVerified" class="mt-1 text-sm text-green-600">
                이메일이 인증되었습니다.
              </p>
            </div>

            <!-- 전화번호 입력 -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">전화번호</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                required
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                placeholder="010-0000-0000"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF]"
              />
            </div>

            <!-- 에러 메시지 -->
            <p v-if="errorMessage" class="text-sm text-red-600">
              {{ errorMessage }}
            </p>

            <!-- 저장 버튼 -->
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="isEmailChanged && !isEmailVerified"
                class="px-4 py-2 bg-[#6C47FF] text-white rounded-md hover:bg-[#5835FF] disabled:bg-gray-400 transition-colors"
              >
                저장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfileModal',
  props: {
    isOpen: Boolean,
    userInfo: Object
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: ''
      },
      originalEmail: '',
      isEmailVerifying: false,
      isEmailVerified: true,
      errorMessage: ''
    }
  },
  computed: {
    isEmailChanged() {
      return this.formData.email !== this.originalEmail
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.initializeForm()
      }
    },
    'formData.email'(newVal) {
      if (newVal !== this.originalEmail) {
        this.isEmailVerified = false
      }
    }
  },
  methods: {
    initializeForm() {
      this.formData = {
        name: this.userInfo.name,
        email: this.userInfo.email,
        phone: this.userInfo.phone
      }
      this.originalEmail = this.userInfo.email
      this.isEmailVerified = true
      this.errorMessage = ''
    },
    close() {
      this.errorMessage = ''
      this.$emit('close')
    },
    async verifyEmail() {
      this.isEmailVerifying = true
      try {
        // 이메일 인증 API 호출 로직
        await new Promise(resolve => setTimeout(resolve, 1500)) // 임시 딜레이
        this.isEmailVerified = true
        alert('이메일이 인증되었습니다.')
      } catch (error) {
        this.errorMessage = '이메일 인증에 실패했습니다.'
      } finally {
        this.isEmailVerifying = false
      }
    },
    async handleSubmit() {
      if (this.isEmailChanged && !this.isEmailVerified) {
        this.errorMessage = '이메일 인증이 필요합니다.'
        return
      }

      try {
        // API 호출 등의 저장 로직
        await new Promise(resolve => setTimeout(resolve, 1000)) // 임시 딜레이
        this.$emit('save', this.formData)
        this.close()
        alert('회원정보가 수정되었습니다.')
      } catch (error) {
        this.errorMessage = '회원정보 수정에 실패했습니다.'
      }
    }
  }
}
</script> 