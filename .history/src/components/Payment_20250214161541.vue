<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- 결제 정보 요약 -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">결제 정보</h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-gray-600">서비스</span>
              <span class="font-medium">{{ serviceName }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-gray-600">펫시터</span>
              <span class="font-medium">{{ petSitterName }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-gray-600">돌봄 날짜</span>
              <span class="font-medium">{{ careDate }}</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-gray-600">결제 금액</span>
              <span class="text-xl font-bold text-[#6C47FF]">{{ formatPrice(amount) }}</span>
            </div>
          </div>
        </div>

        <!-- 결제 수단 선택 -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">결제 수단 선택</h3>
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="method in paymentMethods"
              :key="method.value"
              @click="selectPaymentMethod(method.value)"
              :class="[
                'p-4 border rounded-lg text-center transition-colors',
                selectedMethod === method.value
                  ? 'border-[#6C47FF] bg-[#F3F0FF] text-[#6C47FF]'
                  : 'border-gray-200 hover:border-[#6C47FF]'
              ]"
            >
              {{ method.label }}
            </button>
          </div>
        </div>

        <!-- 결제 버튼 -->
        <button
          @click="onPayment"
          class="w-full py-4 bg-[#6C47FF] text-white rounded-lg font-medium hover:bg-[#5835FF] transition-colors"
          :disabled="!selectedMethod"
        >
          {{ formatPrice(amount) }} 결제하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  data() {
    return {
      serviceName: '펫시터 돌봄 서비스',
      petSitterName: '김민서',
      careDate: '2024-03-20',
      amount: 50000,
      selectedMethod: '',
      paymentMethods: [
        { label: '카드 결제', value: 'card' },
        { label: '계좌 이체', value: 'transfer' },
        { label: '토스페이', value: 'tosspay' },
        { label: '카카오페이', value: 'kakaopay' }
      ]
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString() + '원'
    },
    selectPaymentMethod(method) {
      this.selectedMethod = method
    },
    async onPayment() {
      try {
        // 결제 요청에 필요한 데이터 준비
        const paymentData = {
          amount: this.amount,
          orderId: this.generateOrderId(),
          orderName: this.serviceName,
          customerName: '고객명',
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/fail`,
          method: this.selectedMethod
        }

        // 토스페이먼츠 결제 요청
        const tossPayments = await this.loadTossPayments()
        await tossPayments.requestPayment(this.selectedMethod, paymentData)

      } catch (error) {
        console.error('결제 요청 실패:', error)
        alert('결제 요청에 실패했습니다.')
      }
    },
    generateOrderId() {
      // 주문 ID 생성 (예: YYYYMMDD-랜덤숫자)
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const random = Math.random().toString(36).substr(2, 9)
      return `${year}${month}${day}-${random}`
    },
    async loadTossPayments() {
      // 토스페이먼츠 SDK 로드
      if (!window.TossPayments) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://js.tosspayments.com/v1'
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }
      
      // 클라이언트 키로 초기화
      return new window.TossPayments('YOUR_CLIENT_KEY')
    }
  }
}
</script>