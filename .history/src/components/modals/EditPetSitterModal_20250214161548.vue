<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 배경 오버레이 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>

    <!-- 모달 컨텐츠 -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <!-- 모달 헤더 -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-bold text-gray-900">펫시터 정보 수정</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 모달 본문 -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- 활동 지역 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">활동 지역</label>
              <input
                v-model="formData.location"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C47FF] focus:border-[#6C47FF]"
                placeholder="예: 서울시 강남구"
                required
              />
            </div>

            <!-- 돌봄 가능 요일 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">돌봄 가능 요일</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="day in availableDays"
                  :key="day.value"
                  type="button"
                  @click="toggleDay(day.value)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    formData.availableDays.includes(day.value)
                      ? 'bg-[#6C47FF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ day.label }}
                </button>
              </div>
            </div>

            <!-- 돌봄 가능한 동물 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">돌봄 가능한 반려동물</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="type in petTypes"
                  :key="type.value"
                  type="button"
                  @click="togglePetType(type.value)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    formData.petTypes.includes(type.value)
                      ? 'bg-[#6C47FF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>

            <!-- 요금 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">요금</label>
              <div class="relative">
                <input
                  v-model="formData.rate"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C47FF] focus:border-[#6C47FF] pr-12"
                  placeholder="요금 입력"
                  min="0"
                  required
                />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">원</span>
              </div>
            </div>

            <!-- 자기소개 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">자기소개</label>
              <textarea
                v-model="formData.introduction"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C47FF] focus:border-[#6C47FF]"
                placeholder="펫시터로서의 경험과 자신을 소개해주세요"
                required
              ></textarea>
            </div>

            <!-- 자격증 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">보유 자격증</label>
              <div class="space-y-2">
                <div v-for="(cert, index) in formData.certificates" :key="index" class="flex gap-2">
                  <input
                    v-model="cert.name"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C47FF] focus:border-[#6C47FF]"
                    placeholder="자격증 이름"
                  />
                  <input
                    v-model="cert.url"
                    type="url"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C47FF] focus:border-[#6C47FF]"
                    placeholder="인증서 URL"
                  />
                  <button 
                    type="button"
                    @click="removeCertificate(index)"
                    class="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  @click="addCertificate"
                  class="w-full px-4 py-2 text-[#6C47FF] border border-[#6C47FF] rounded-md hover:bg-[#F3F0FF] transition-colors text-sm font-medium"
                >
                  자격증 추가
                </button>
              </div>
            </div>

            <!-- 저장 버튼 -->
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
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
  name: 'EditPetSitterModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    petSitterInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        location: '',
        availableDays: [],
        petTypes: [],
        rate: '',
        introduction: '',
        certificates: []
      },
      petTypes: [
        { label: '개', value: 'dog' },
        { label: '고양이', value: 'cat' },
        { label: '토끼', value: 'rabbit' },
        { label: '햄스터', value: 'hamster' },
        { label: '앵무새', value: 'parrot' }
      ],
      availableDays: [
        { label: '월', value: 'mon' },
        { label: '화', value: 'tue' },
        { label: '수', value: 'wed' },
        { label: '목', value: 'thu' },
        { label: '금', value: 'fri' },
        { label: '토', value: 'sat' },
        { label: '일', value: 'sun' }
      ]
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
      this.formData = {
        location: this.petSitterInfo.location,
        availableDays: [...this.petSitterInfo.availableDays],
        petTypes: [...this.petSitterInfo.petTypes],
        rate: this.petSitterInfo.rate,
        introduction: this.petSitterInfo.introduction,
        certificates: this.petSitterInfo.certificates.map(cert => ({ ...cert }))
      }
    },
    close() {
      this.$emit('close')
    },
    toggleDay(day) {
      const index = this.formData.availableDays.indexOf(day)
      if (index === -1) {
        this.formData.availableDays.push(day)
      } else {
        this.formData.availableDays.splice(index, 1)
      }
    },
    togglePetType(type) {
      const index = this.formData.petTypes.indexOf(type)
      if (index === -1) {
        this.formData.petTypes.push(type)
      } else {
        this.formData.petTypes.splice(index, 1)
      }
    },
    addCertificate() {
      this.formData.certificates.push({ id: Date.now(), name: '', url: '' })
    },
    removeCertificate(index) {
      this.formData.certificates.splice(index, 1)
    },
    handleSubmit() {
      // 필수 필드 검증
      if (!this.formData.location || !this.formData.rate || this.formData.petTypes.length === 0) {
        alert('필수 정보를 모두 입력해주세요.')
        return
      }

      this.$emit('save', this.formData)
      this.close()
    }
  }
}
</script>