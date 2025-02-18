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
        // 백엔드에서 결제 URL을 받아옴
        const response = await axios.post('/api/v1/payment/toss', {
          petSitterWorkId: this.service.id,
          amount: this.service.fee
        })
        
        // 받은 URL로 직접 이동 (토스페이먼츠 결제 페이지)
        if (response.data.paymentUrl) {
          // 새 창에서 결제 페이지 열기
          window.open(response.data.paymentUrl, '_blank')
        } else {
          throw new Error('결제 URL이 없습니다.')
        }
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
