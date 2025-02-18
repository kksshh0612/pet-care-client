<template>
  <div class="min-h-screen bg-[#F8F9FD] pt-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-8">결제하기</h1>
        
        <!-- 결제 정보 -->
        <div class="space-y-6">
          <div class="flex justify-between items-center py-4 border-b">
            <span class="text-gray-600">펫시터</span>
            <span class="font-medium">{{ service.petSitterName }}</span>
          </div>
          <div class="flex justify-between items-center py-4 border-b">
            <span class="text-gray-600">서비스 날짜</span>
            <span class="font-medium">{{ formatDate(service.availableDay) }}</span>
          </div>
          <div class="flex justify-between items-center py-4 border-b">
            <span class="text-gray-600">결제 금액</span>
            <span class="text-xl font-bold text-[#6C47FF]">{{ formatPrice(service.fee) }}원</span>
          </div>
        </div>

        <!-- 결제 버튼 -->
        <div class="mt-8">
          <button 
            @click="proceedToTossPay"
            class="w-full py-3 bg-[#0064FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors font-medium"
          >
            토스페이로 결제하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Payment',
  data() {
    return {
      service: null
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    formatPrice(price) {
      return price.toLocaleString()
    },
    async proceedToTossPay() {
      try {
        const response = await axios.post('/api/v1/payment/toss', {
          petSitterWorkId: this.service.id,
          amount: this.service.fee
        })
        
        window.location.href = response.data.paymentUrl
      } catch (error) {
        console.error('결제 초기화 실패:', error)
        alert('결제 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  },
  created() {
    // 라우터를 통해 전달받은 서비스 정보
    this.service = this.$route.params.service
    if (!this.service) {
      this.$router.push('/service')
    }
  }
}
</script>
