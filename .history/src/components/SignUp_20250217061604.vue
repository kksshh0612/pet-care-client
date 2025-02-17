<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-[400px] -mt-[5%]">
      <!-- 회원가입 폼 -->
      <div class="space-y-8">
        <div class="text-center space-y-4">
          <h1 class="text-[32px] font-bold text-[#333333]">
            Sign Up
          </h1>
          <p class="text-[#666666] text-sm">
            회원가입을 통해 다양은 서비스를 이용해보세요
          </p>
        </div>

        <form @submit.prevent="handleSignUp" class="space-y-6">
          <div class="space-y-4">
            <!-- 이메일 입력 -->
            <div>
              <label for="email" class="block text-[#333333] text-sm mb-2">이메일</label>
              <div class="flex gap-2">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  :disabled="isEmailVerified"
                  :class="[
                    'flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 text-sm',
                    isEmailVerified 
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50'
                      : 'border-[#E5E5E5] focus:border-[#6C47FF] focus:ring-[#6C47FF]'
                  ]"
                  placeholder="example@email.com"
                />
                <button
                  type="button"
                  @click="verifyEmail"
                  :disabled="!email || isEmailVerified"
                  class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors disabled:bg-gray-300"
                >
                  중복확인
                </button>
              </div>
              <p v-if="emailError" class="mt-1 text-sm text-red-500">
                {{ emailError }}
              </p>
              <p v-if="emailSuccess" class="mt-1 text-sm text-green-500">
                {{ emailSuccess }}
              </p>
            </div>

            <!-- 비밀번호 입력 -->
            <div>
              <label for="password" class="block text-[#333333] text-sm mb-2">비밀번호</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#6C47FF] focus:ring-1 focus:ring-[#6C47FF] text-sm"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <!-- 비밀번호 확인 -->
            <div>
              <label for="passwordConfirm" class="block text-[#333333] text-sm mb-2">비밀번호 확인</label>
              <input
                id="passwordConfirm"
                v-model="passwordConfirm"
                type="password"
                required
                class="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#6C47FF] focus:ring-1 focus:ring-[#6C47FF] text-sm"
                placeholder="비밀번호를 다시 입력하세요"
                @input="checkPasswordMatch"
              />
              <p v-if="passwordError" class="mt-1 text-sm text-red-500">
                {{ passwordError }}
              </p>
            </div>

            <!-- 이름 입력 -->
            <div>
              <label for="name" class="block text-[#333333] text-sm mb-2">이름</label>
              <input
                id="name"
                v-model="name"
                type="text"
                required
                class="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#6C47FF] focus:ring-1 focus:ring-[#6C47FF] text-sm"
                placeholder="홍길동"
              />
            </div>

            <!-- 전화번호 입력 -->
            <div>
              <label for="phone" class="block text-[#333333] text-sm mb-2">전화번호</label>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                required
                class="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#6C47FF] focus:ring-1 focus:ring-[#6C47FF] text-sm"
                placeholder="010-0000-0000"
              />
            </div>

            <!-- 에러 메시지 -->
            <p v-if="errorMessage" class="text-red-500 text-sm text-center">
              {{ errorMessage }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full py-3 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors disabled:bg-gray-300"
          >
            회원가입
          </button>

          <div class="text-center text-sm">
            <span class="text-[#666666]">이미 계정이 있으신가요? </span>
            <router-link to="/login" class="text-[#6C47FF] hover:text-[#5835FF] font-medium">
              로그인
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data() {
    return {
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      errorMessage: '',
      emailError: '',
      emailSuccess: '',
      passwordError: '',
      isEmailVerified: false
    }
  },
  computed: {
    isFormValid() {
      return this.emailAddress && 
             this.password && 
             this.passwordConfirm && 
             this.name && 
             this.phone && 
             this.isEmailVerified &&
             this.password === this.passwordConfirm
    }
  },
  methods: {
    async verifyEmail() {
      if (!this.email) {
        this.emailError = '이메일을 입력해주세요.'
        this.emailSuccess = ''
        return
      }

      try {
        await axios.post('/api/v1/member/email', {
          emailAddress: this.emailAddress
        })
        
        this.isEmailVerified = true
        this.emailError = ''
        this.emailSuccess = '사용 가능한 이메일입니다.'
      } catch (error) {
        if (error.response?.status === 400) {
          this.emailError = '올바른 이메일 형식이 아닙니다.'
        } else if (error.response?.status === 409) {
          this.emailError = '이미 사용 중인 이메일입니다.'
        } else {
          this.emailError = '이메일 확인에 실패했습니다.'
        }
        this.emailSuccess = ''
        this.isEmailVerified = false
      }
    },

    checkPasswordMatch() {
      if (this.password && this.passwordConfirm) {
        if (this.password !== this.passwordConfirm) {
          this.passwordError = '비밀번호가 일치하지 않습니다.'
        } else {
          this.passwordError = ''
        }
      } else {
        this.passwordError = ''
      }
    },

    async handleSignUp() {
      if (!this.isFormValid) {
        this.errorMessage = '모든 정보를 올바르게 입력해주세요.'
        return
      }

      if (this.password !== this.passwordConfirm) {
        this.errorMessage = '비밀번호가 일치하지 않습니다.'
        return
      }

      try {
        const response = await axios.post('/api/v1/member', {
          emailAddress: this.emailAddress,
          password: this.password,
          name: this.name,
          phone: this.phone
        })

        if (response.data.success) {
          alert('회원가입이 완료되었습니다.')
          this.$router.push('/login')
        }
      } catch (error) {
        if (error.response?.status === 400) {
          this.errorMessage = '입력한 정보를 다시 확인해주세요.'
        } else {
          this.errorMessage = '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.'
        }
      }
    }
  },
  watch: {
    email() {
      // 이메일이 변경되면 인증 상태 초기화
      this.isEmailVerified = false
      this.emailError = ''
      this.emailSuccess = ''
    },
    password() {
      // 비밀번호가 변경되면 비밀번호 확인 검증
      this.checkPasswordMatch()
    }
  }
}
</script> 