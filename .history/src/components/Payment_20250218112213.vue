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
      service: {
        id: '',
        petSitterName: '',
        availableDay: '',
        fee: 0
      }
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
        // 토스페이먼츠 테스트 결제 URL로 직접 이동
        const successUrl = `${window.location.origin}/success`
        const failUrl = `${window.location.origin}/fail`
        
        const paymentData = {
          amount: this.service.fee,
          orderId: `${this.service.id}_${Date.now()}`,
          orderName: `펫시터 서비스 - ${this.service.petSitterName}`,
          customerName: "고객명",
          successUrl: successUrl,
          failUrl: failUrl
        }

        // 토스페이먼츠 테스트 결제 URL
        const testPaymentUrl = `https://test-pay.toss.im/go/orders/${paymentData.orderId}`
        window.open(testPaymentUrl, '_blank')
      } catch (error) {
        console.error('결제 초기화 실패:', error)
        alert('결제 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  },
  created() {
    // URL 쿼리 파라미터에서 서비스 정보 가져오기
    const { id, petSitterName, availableDay, fee } = this.$route.query
    
    if (!id) {
      this.$router.push('/service')
      return
    }

    this.service = {
      id,
      petSitterName,
      availableDay,
      fee: Number(fee)
    }
  }
}
</script>
