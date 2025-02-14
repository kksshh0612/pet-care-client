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
                <div class="relative w-24 h-24">
                  <div class="w-full h-full rounded-full overflow-hidden">
                    <img 
                      :src="previewImage || formData.profileImage || userInfo.profileImage" 
                      alt="프로필 이미지"
                      class="w-full h-full object-cover"
                    >
                  </div>
                  <label class="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 hover:scale-110 hover:shadow-xl">
                    <input 
                      type="file" 
                      class="hidden" 
                      accept="image/*"
                      @change="handleProfileImageUpload"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </div>
                <div class="flex flex-col text-sm text-gray-500">
                  <p>• 얼굴이 잘 보이는 사진을 등록해주세요</p>
                  <p>• 최대 5MB까지 업로드 가능</p>
                </div>
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
              <div class="border border-gray-300 rounded-md">
                <!-- 달력 토글 버튼 -->
                <button
                  type="button"
                  @click="isCalendarOpen = !isCalendarOpen"
                  class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                >
                  <span class="text-sm text-gray-700">
                    {{ formData.availableDates.length > 0 
                      ? `${formData.availableDates.length}일 선택됨` 
                      : '날짜를 선택하세요' }}
                  </span>
                  <svg 
                    class="w-5 h-5 text-gray-500 transition-transform"
                    :class="{ 'rotate-180': isCalendarOpen }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- 달력 -->
                <div v-if="isCalendarOpen" class="border-t border-gray-200">
                  <!-- 달력 헤더 -->
                  <div class="p-4 border-b border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        class="p-2 hover:bg-gray-100 rounded-full"
                        @click="previousMonth"
                      >
                        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span class="text-sm font-medium">{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
                      <button
                        type="button"
                        class="p-2 hover:bg-gray-100 rounded-full"
                        @click="nextMonth"
                      >
                        <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div class="grid grid-cols-7 gap-1 text-center">
                      <div v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day" 
                           class="text-sm font-medium text-gray-600">
                        {{ day }}
                      </div>
                    </div>
                  </div>

                  <!-- 달력 날짜들 -->
                  <div class="p-4">
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
                  </div>
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
      isCalendarOpen: false,
      previewImage: null
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
      this.previewImage = null
    },
    close() {
      this.$emit('close')
    },
    handleFileUpload(event) {
      // 파일 업로드 처리 로직
    },
    async handleSubmit() {
      try {
        // 이미지 파일이 있는 경우 FormData 생성
        if (this.formData.profileImage instanceof File) {
          const formData = new FormData()
          formData.append('profileImage', this.formData.profileImage)
          // 여기서 이미지 업로드 API 호출
          // const response = await axios.post('/api/upload', formData)
          // this.formData.profileImage = response.data.imageUrl
        }

        // 나머지 등록 로직
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
    },
    handleProfileImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.')
        return
      }

      // 이미지 파일 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.')
        return
      }

      // 미리보기 생성
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewImage = e.target.result
        this.formData.profileImage = file // 실제 파일 저장
      }
      reader.readAsDataURL(file)
    }
  }
}
</script> 