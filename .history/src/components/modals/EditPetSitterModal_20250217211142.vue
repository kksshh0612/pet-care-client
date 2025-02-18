<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h3 class="text-lg font-bold mb-6">펫시터 프로필 수정</h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 위치 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">활동 지역</label>
          <input 
            v-model="form.location"
            type="text"
            required
            placeholder="예) 서울시 강남구"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
          >
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
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                form.availableDaysOfWeek.includes(day.value)
                  ? 'bg-[#6C47FF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ day.label }}
            </button>
          </div>
        </div>

        <!-- 돌봄 가능한 반려동물 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">돌봄 가능한 반려동물</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="pet in petTypes"
              :key="pet.value"
              type="button"
              @click="togglePetType(pet.value)"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                form.petCodes.includes(pet.value)
                  ? 'bg-[#6C47FF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ pet.label }}
            </button>
          </div>
        </div>

        <!-- 요금 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">요금</label>
          <div class="relative">
            <input 
              v-model.number="form.fee"
              type="number"
              required
              min="0"
              step="1000"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
          </div>
        </div>

        <!-- 자기소개 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">자기소개 및 돌봄 경험</label>
          <textarea 
            v-model="form.introduction"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            placeholder="반려동물을 돌본 경험과 자신의 장점을 소개해주세요."
          ></textarea>
        </div>

        <!-- 버튼 -->
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
            수정하기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      form: {
        id: null,
        location: '',
        availableDaysOfWeek: [],
        petCodes: [],
        fee: 0,
        introduction: ''
      },
      availableDays: [
        { value: 'MON', label: '월' },
        { value: 'TUE', label: '화' },
        { value: 'WED', label: '수' },
        { value: 'THU', label: '목' },
        { value: 'FRI', label: '금' },
        { value: 'SAT', label: '토' },
        { value: 'SUN', label: '일' }
      ],
      petTypes: [
        { value: 'DOG', label: '강아지' },
        { value: 'CAT', label: '고양이' },
        { value: 'RABBIT', label: '토끼' },
        { value: 'HAMSTER', label: '햄스터' },
        { value: 'PARROT', label: '앵무새' }
      ]
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.petSitterInfo) {
        // 모달이 열릴 때 기존 데이터로 폼 초기화
        this.form = {
          id: this.petSitterInfo.petSitterId,
          location: this.petSitterInfo.location,
          availableDaysOfWeek: [...this.petSitterInfo.availableDays],
          petCodes: [...this.petSitterInfo.petTypes],
          fee: this.petSitterInfo.fee,
          introduction: this.petSitterInfo.introduction
        }
      }
    }
  },
  methods: {
    toggleDay(day) {
      const index = this.form.availableDaysOfWeek.indexOf(day)
      if (index === -1) {
        this.form.availableDaysOfWeek.push(day)
      } else {
        this.form.availableDaysOfWeek.splice(index, 1)
      }
    },
    togglePetType(type) {
      const index = this.form.petCodes.indexOf(type)
      if (index === -1) {
        this.form.petCodes.push(type)
      } else {
        this.form.petCodes.splice(index, 1)
      }
    },
    async handleSubmit() {
      try {
        const response = await axios.patch('/api/v1/pet-sitter', this.form)
        this.$emit('save', response.data)
        this.$emit('close')
        alert('펫시터 정보가 성공적으로 수정되었습니다.')
      } catch (error) {
        console.error('펫시터 정보 수정 실패:', error)
        alert('펫시터 정보 수정에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  }
}
</script>