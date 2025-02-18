<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-2xl">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold">펫시터 서비스 등록</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 서비스 종류 선택 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">가능 서비스 종류</label>
          <div class="flex flex-wrap gap-3">
            <label v-for="type in serviceTypeOptions" :key="type.value" 
                   class="flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer"
                   :class="form.serviceTypes.includes(type.value) ? 'border-[#6C47FF] bg-[#F3F0FF]' : 'border-gray-200'">
              <input type="checkbox" 
                     :value="type.value" 
                     v-model="form.serviceTypes"
                     class="hidden">
              <span :class="form.serviceTypes.includes(type.value) ? 'text-[#6C47FF]' : 'text-gray-700'">
                {{ type.label }}
              </span>
            </label>
          </div>
        </div>

        <!-- 돌봄 가능 사이즈 선택 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">돌봄 가능 사이즈</label>
          <div class="flex flex-wrap gap-3">
            <label v-for="size in sizeOptions" :key="size.value"
                   class="flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer"
                   :class="form.availableSizes.includes(size.value) ? 'border-[#6C47FF] bg-[#F3F0FF]' : 'border-gray-200'">
              <input type="checkbox" 
                     :value="size.value" 
                     v-model="form.availableSizes"
                     class="hidden">
              <span :class="form.availableSizes.includes(size.value) ? 'text-[#6C47FF]' : 'text-gray-700'">
                {{ size.label }}
              </span>
            </label>
          </div>
        </div>

        <!-- 가능 날짜 선택 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">가능 날짜</label>
          <input 
            type="date"
            v-model="form.availableDay"
            required
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
          >
        </div>

        <!-- 요금 입력 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">1일 요금</label>
          <div class="relative">
            <input 
              type="number"
              v-model="form.fee"
              required
              min="0"
              step="1000"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
          </div>
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
            등록
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterPetSitterWorkModal',
  props: {
    isOpen: Boolean,
    petSitterId: Number
  },
  data() {
    return {
      form: {
        serviceTypes: [],
        availableSizes: [],
        availableDay: '',
        fee: 0
      },
      serviceTypeOptions: [
        { value: 'WALK', label: '산책' },
        { value: 'VISIT_CARE', label: '방문돌봄' },
        { value: 'FOSTER_CARE', label: '위탁돌봄' }
      ],
      sizeOptions: [
        { value: 'SMALL', label: '소형견(10kg이하)' },
        { value: 'MEDIUM', label: '중형견(10kg~25kg)' },
        { value: 'LARGE', label: '대형견(25kg초과)' }
      ]
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const requestData = {
          ...this.form,
          petSitterId: this.petSitterId
        }
        await axios.post('/api/v1/pet-sitter-work', requestData)
        alert('펫시터 서비스가 등록되었습니다.')
        this.$emit('close')
        this.$emit('save')
      } catch (error) {
        console.error('펫시터 서비스 등록 실패:', error)
        alert('서비스 등록에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  }
}
</script> 