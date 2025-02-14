<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 배경 오버레이 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

    <!-- 모달 컨텐츠 -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <!-- 모달 헤더 -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-bold text-gray-900">펫시터 등록</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 모달 본문 -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- 프로필 사진 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">프로필 사진</label>
              <div class="flex items-center space-x-4">
                <div class="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    :src="formData.profileImage || userInfo.profileImage" 
                    alt="프로필 이미지"
                    class="w-full h-full object-cover"
                  >
                </div>
                <button
                  type="button"
                  class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  사진 변경
                </button>
              </div>
            </div>

            <!-- 기본 정보 -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input
                  v-model="formData.name"
                  type="text"
                  disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                <input
                  v-model="formData.phone"
                  type="text"
                  disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            <!-- 위치 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">위치</label>
              <input
                v-model="formData.location"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF]"
                placeholder="예: 서울시 강남구"
              />
            </div>

            <!-- 돌봄 가능 날짜 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">돌봄 가능 날짜</label>
              <div class="border border-gray-300 rounded-md p-4">
                <div class="grid grid-cols-7 gap-1 text-center mb-2">
                  <div v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day" 
                       class="text-sm font-medium text-gray-600">
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="date in calendarDates"
                    :key="date.date"
                    type="button"
                    :class="[
                      'p-2 text-sm rounded-lg hover:bg-[#F3F0FF] transition-colors',
                      date.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                      isDateSelected(date.date) ? 'bg-[#6C47FF] text-white hover:bg-[#5835FF]' : '',
                      date.isToday ? 'border border-[#6C47FF]' : ''
                    ]"
                    :disabled="!date.isCurrentMonth"
                    @click="toggleDate(date.date)"
                  >
                    {{ new Date(date.date).getDate() }}
                  </button>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    class="text-sm text-gray-600 hover:text-[#6C47FF]"
                    @click="previousMonth"
                  >
                    이전 달
                  </button>
                  <span class="text-sm font-medium">
                    {{ currentYear }}년 {{ currentMonth + 1 }}월
                  </span>
                  <button
                    type="button"
                    class="text-sm text-gray-600 hover:text-[#6C47FF]"
                    @click="nextMonth"
                  >
                    다음 달
                  </button>
                </div>
              </div>
              <!-- 선택된 날짜 표시 -->
              <div v-if="formData.availableDates.length > 0" class="mt-2">
                <p class="text-sm text-gray-600">선택된 날짜:</p>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span 
                    v-for="date in formData.availableDates" 
                    :key="date"
                    class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs"
                  >
                    {{ formatDate(date) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 반려동물 종류 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">돌봄 가능한 반려동물</label>
              <div class="flex flex-wrap gap-2">
                <label v-for="pet in petTypes" :key="pet.value" class="inline-flex items-center">
                  <input
                    type="checkbox"
                    v-model="formData.petTypes"
                    :value="pet.value"
                    class="h-4 w-4 text-[#6C47FF] focus:ring-[#6C47FF] border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ pet.label }}</span>
                </label>
              </div>
            </div>

            <!-- 시간당 요금 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">시간당 요금</label>
              <div class="relative">
                <input
                  v-model="formData.hourlyRate"
                  type="number"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF] pr-12"
                  placeholder="예: 15000"
                />
                <span class="absolute right-3 top-2 text-gray-500">원</span>
              </div>
            </div>

            <!-- 자기소개 및 돌봄 경험 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">자기소개 및 돌봄 경험</label>
              <textarea
                v-model="formData.introduction"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#6C47FF] focus:border-[#6C47FF]"
                placeholder="반려동물을 돌본 경험과 자신의 강점을 작성해주세요."
              ></textarea>
            </div>

            <!-- 인증서 업로드 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">자격증 및 인증서</label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label class="relative cursor-pointer bg-white rounded-md font-medium text-[#6C47FF] hover:text-[#5835FF] focus-within:outline-none">
                      <span>파일 업로드</span>
                      <input type="file" class="sr-only" @change="handleFileUpload" accept=".pdf,.jpg,.jpeg,.png">
                    </label>
                    <p class="pl-1">또는 드래그 앤 드롭</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <!-- 에러 메시지 -->
            <p v-if="errorMessage" class="text-sm text-red-600">
              {{ errorMessage }}
            </p>

            <!-- 등록 버튼 -->
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-[#6C47FF] text-white rounded-md hover:bg-[#5835FF] transition-colors"
              >
                등록하기
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
  name: 'PetSitterRegisterModal',
  props: {
    isOpen: Boolean,
    userInfo: Object
  },
  data() {
    return {
      formData: {
        profileImage: '',
        name: '',
        phone: '',
        location: '',
        availableDates: [],
        petTypes: [],
        hourlyRate: '',
        introduction: '',
        certificates: []
      },
      petTypes: [
        { label: '강아지', value: 'dog' },
        { label: '고양이', value: 'cat' },
        { label: '파충류', value: 'reptile' },
        { label: '조류', value: 'bird' },
        { label: '기타', value: 'other' }
      ],
      errorMessage: '',
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    }
  },
  computed: {
    calendarDates() {
      const dates = []
      const firstDay = new Date(this.currentYear, this.currentMonth, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0)
      
      // 이전 달의 날짜들
      const prevMonthDays = firstDay.getDay()
      const prevMonth = new Date(this.currentYear, this.currentMonth, 0)
      for (let i = prevMonthDays - 1; i >= 0; i--) {
        dates.push({
          date: new Date(this.currentYear, this.currentMonth - 1, prevMonth.getDate() - i).toISOString().split('T')[0],
          isCurrentMonth: false,
          isToday: false
        })
      }
      
      // 현재 달의 날짜들
      const today = new Date().toISOString().split('T')[0]
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(this.currentYear, this.currentMonth, i).toISOString().split('T')[0]
        dates.push({
          date: date,
          isCurrentMonth: true,
          isToday: date === today
        })
      }
      
      // 다음 달의 날짜들
      const remainingDays = 42 - dates.length // 항상 6주를 표시
      for (let i = 1; i <= remainingDays; i++) {
        dates.push({
          date: new Date(this.currentYear, this.currentMonth + 1, i).toISOString().split('T')[0],
          isCurrentMonth: false,
          isToday: false
        })
      }
      
      return dates
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.initializeForm()
      }
    }
  },
  methods: {
    initializeForm() {
      this.formData.name = this.userInfo.name
      this.formData.phone = this.userInfo.phone
      this.formData.profileImage = this.userInfo.profileImage
    },
    close() {
      this.$emit('close')
    },
    handleFileUpload(event) {
      // 파일 업로드 처리 로직
    },
    async handleSubmit() {
      try {
        // API 호출 등의 등록 로직
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.close()
        alert('펫시터 등록이 완료되었습니다.')
      } catch (error) {
        this.errorMessage = '등록에 실패했습니다.'
      }
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear--
      } else {
        this.currentMonth--
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear++
      } else {
        this.currentMonth++
      }
    },
    toggleDate(date) {
      const index = this.formData.availableDates.indexOf(date)
      if (index === -1) {
        this.formData.availableDates.push(date)
      } else {
        this.formData.availableDates.splice(index, 1)
      }
    },
    isDateSelected(date) {
      return this.formData.availableDates.includes(date)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return `${date.getMonth() + 1}월 ${date.getDate()}일`
    }
  }
}
</script> 