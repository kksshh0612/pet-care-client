<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          비밀번호 찾기
        </h2>
      </div>
      <!-- 비밀번호 찾기 폼은 추후 구현 예정 -->
      <div class="text-center">
        <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          로그인 페이지로 돌아가기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindPassword'
}
</script> 