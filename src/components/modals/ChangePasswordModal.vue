<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 배경 오버레이 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

    <!-- 모달 컨텐츠 -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <!-- 모달 헤더 -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-bold text-gray-900">비밀번호 변경</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 모달 본문 -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- 현재 비밀번호 -->
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-gray-700">현재 비밀번호</label>
              <input
                id="currentPassword"
                v-model="formData.currentPassword"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF]"
              />
            </div>

            <!-- 새 비밀번호 -->
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700">새 비밀번호</label>
              <input
                id="newPassword"
                v-model="formData.newPassword"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF]"
              />
              <p class="mt-1 text-sm text-gray-500">
                영문, 숫자, 특수문자를 포함한 8자 이상
              </p>
            </div>

            <!-- 새 비밀번호 확인 -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">새 비밀번호 확인</label>
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                required
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
                class="px-4 py-2 bg-[#6C47FF] text-white rounded-md hover:bg-[#5835FF] transition-colors"
              >
                변경하기
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
  name: 'ChangePasswordModal',
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      formData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      errorMessage: ''
    }
  },
  watch: {
    'formData.confirmPassword'(newVal) {
      if (this.formData.newPassword && newVal) {
        if (this.formData.newPassword !== newVal) {
          this.errorMessage = '새 비밀번호가 일치하지 않습니다.'
        } else {
          this.errorMessage = ''
        }
      }
    }
  },
  methods: {
    close() {
      this.formData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      this.errorMessage = ''
      this.$emit('close')
    },
    validatePassword(password) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      return regex.test(password)
    },
    async handleSubmit() {
      this.errorMessage = ''

      // 새 비밀번호 확인 먼저 체크
      if (this.formData.newPassword !== this.formData.confirmPassword) {
        this.errorMessage = '새 비밀번호가 일치하지 않습니다.'
        return
      }

      // 새 비밀번호 유효성 검사
      if (!this.validatePassword(this.formData.newPassword)) {
        this.errorMessage = '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
        return
      }

      try {
        // API 호출 등의 저장 로직
        await new Promise(resolve => setTimeout(resolve, 1000)) // 임시 딜레이
        this.close()
        alert('비밀번호가 변경되었습니다.')
      } catch (error) {
        this.errorMessage = '비밀번호 변경에 실패했습니다.'
      }
    }
  }
}
</script> 