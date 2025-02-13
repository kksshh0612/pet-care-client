<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 배경 오버레이 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

    <!-- 모달 컨텐츠 -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <!-- 모달 헤더 -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-bold text-red-600">회원 탈퇴</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 모달 본문 -->
        <div class="p-6">
          <!-- 경고 메시지 -->
          <div class="mb-6 p-4 bg-red-50 rounded-lg">
            <p class="text-red-600 font-medium mb-2">회원 탈퇴 시 주의사항</p>
            <ul class="text-sm text-red-600 list-disc list-inside space-y-1">
              <li>탈퇴 시 모든 회원 정보가 삭제됩니다.</li>
              <li>등록된 반려동물 정보도 함께 삭제됩니다.</li>
              <li>탈퇴 후에는 복구가 불가능합니다.</li>
            </ul>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- 비밀번호 입력 -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="탈퇴하려면 비밀번호를 입력하세요"
              />
            </div>

            <!-- 동의 체크박스 -->
            <div class="flex items-center">
              <input
                id="agreement"
                v-model="agreed"
                type="checkbox"
                required
                class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label for="agreement" class="ml-2 block text-sm text-gray-700">
                위 주의사항을 모두 확인했으며, 회원 탈퇴에 동의합니다.
              </label>
            </div>

            <!-- 에러 메시지 -->
            <p v-if="errorMessage" class="text-sm text-red-600">
              {{ errorMessage }}
            </p>

            <!-- 탈퇴 버튼 -->
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="!agreed"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 transition-colors"
              >
                회원 탈퇴
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
  name: 'WithdrawModal',
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      password: '',
      agreed: false,
      errorMessage: ''
    }
  },
  methods: {
    close() {
      this.password = ''
      this.agreed = false
      this.errorMessage = ''
      this.$emit('close')
    },
    async handleSubmit() {
      if (!this.agreed) {
        this.errorMessage = '주의사항 확인 및 동의가 필요합니다.'
        return
      }

      try {
        // API 호출 등의 탈퇴 로직
        await new Promise(resolve => setTimeout(resolve, 1000)) // 임시 딜레이
        
        // 실제 구현 시에는 비밀번호 검증 로직 필요
        if (this.password === 'correctpassword') { // 임시 검증
          this.close()
          alert('회원 탈퇴가 완료되었습니다.')
          // 로그아웃 처리 및 메인 페이지로 이동
          this.$router.push('/')
        } else {
          this.errorMessage = '비밀번호가 일치하지 않습니다.'
        }
      } catch (error) {
        this.errorMessage = '회원 탈퇴에 실패했습니다.'
      }
    }
  }
}
</script> 