<template>
  <div class="min-h-screen flex items-center justify-center -mt-[10%]">
    <div class="w-full max-w-[400px]">
      <!-- 회원가입 폼 -->
      <div class="space-y-8">
        <div class="text-center space-y-4">
          <h1 class="text-[32px] font-bold text-[#333333]">
            SignUp
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
                  class="flex-1 px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#6C47FF] focus:ring-1 focus:ring-[#6C47FF] text-sm"
                  placeholder="example@email.com"
                />
                <button 
                  type="button"
                  class="px-4 py-3 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
                >
                  중복확인
                </button>
              </div>
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
              />
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
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
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
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: ''
    }
  },
  methods: {
    handleSignUp() {
      // 회원가입 로직 구현
      console.log('회원가입 시도:', {
        email: this.email,
        password: this.password,
        name: this.name,
        phone: this.phone
      })
    }
  }
}
</script> 