<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-[400px] -mt-[5%]">

      <!-- 로그인 폼 -->
      <div class="space-y-8">
        <div class="text-center space-y-4">
          <h1 class="text-[32px] font-bold text-[#333333]">
            Login
          </h1>
          <p class="text-[#666666] text-sm">
            로그인하여 서비스를 이용해보세요
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label for="emailAddress" class="block text-[#333333] text-sm mb-2">이메일</label>
              <input
                id="emailAddress"
                v-model="emailAddress"
                type="email"
                required
                class="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#6C47FF] focus:ring-1 focus:ring-[#6C47FF] text-sm"
                placeholder="example@email.com"
              />
            </div>

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
          </div>

          <p v-if="errorMessage" class="text-red-500 text-sm text-center">
            {{ errorMessage }}
          </p>

          <div class="flex justify-center space-x-4 text-sm">
            <router-link to="/find-id" class="text-[#666666] hover:text-[#6C47FF]">
              아이디 찾기
            </router-link>
            <span class="text-[#E5E5E5]">|</span>
            <router-link to="/find-password" class="text-[#666666] hover:text-[#6C47FF]">
              비밀번호 찾기
            </router-link>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
          >
            로그인
          </button>

          <div class="text-center text-sm">
            <span class="text-[#666666]">계정이 없으신가요? </span>
            <router-link to="/signup" class="text-[#6C47FF] hover:text-[#5835FF] font-medium">
              회원가입
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'MemberLogin',
  data() {
    return {
      emailAddress: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      if (!this.emailAddress || !this.password) {
        this.errorMessage = '이메일과 비밀번호를 모두 입력해주세요.'
        return
      }

      try {
        const response = await axios.post('/api/v1/member/login', {
          emailAddress: this.emailAddress,
          password: this.password
        }, {
          withCredentials: true  // 세션 쿠키를 주고받기 위해 필요
        })

        console.log('로그인 응답:', response)

        if (response.status === 200) {
          this.$store.commit('setLoginStatus', true)
          this.$store.commit('setUserInfo', response.data)
          
          // 리다이렉트 URL이 있으면 해당 URL로, 없으면 메인 페이지로
          const redirectUrl = this.$route.query.redirect || '/'
          router.push(redirectUrl)
        }
      } catch (error) {
        console.error('로그인 에러:', error)
        
        if (error.response?.status === 400) {
          this.errorMessage = '아이디 또는 비밀번호가 일치하지 않습니다.'
        } else {
          this.errorMessage = '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.'
        }
      }
    }
  }
}
</script>
