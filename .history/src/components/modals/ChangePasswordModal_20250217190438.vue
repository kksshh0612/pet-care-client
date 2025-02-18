<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md">
      <h3 class="text-lg font-bold mb-4">비밀번호 변경</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
          <input 
            v-model="passwordForm.oldPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
          <input 
            v-model="passwordForm.newPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
          <input 
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
          >
        </div>
        <div class="flex justify-end gap-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button 
            type="submit"
            class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
          >
            변경하기
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChangePasswordModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: ''
      },
      confirmPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      // 비밀번호 확인 검증
      if (this.passwordForm.newPassword !== this.confirmPassword) {
        this.errorMessage = '새 비밀번호가 일치하지 않습니다.'
        return
      }

      try {
        await axios.patch('/api/v1/member/password', this.passwordForm)
        alert('비밀번호가 성공적으로 변경되었습니다.')
        this.resetForm()
        this.$emit('close')
      } catch (error) {
        console.error('비밀번호 변경 실패:', error)
        if (error.response?.status === 400) {
          this.errorMessage = '현재 비밀번호가 일치하지 않습니다.'
        } else {
          this.errorMessage = '비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.'
        }
      }
    },
    resetForm() {
      this.passwordForm = {
        oldPassword: '',
        newPassword: ''
      }
      this.confirmPassword = ''
      this.errorMessage = ''
    }
  },
  watch: {
    isOpen(newVal) {
      if (!newVal) {
        this.resetForm()
      }
    }
  }
}
</script> 