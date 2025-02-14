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
              <span class="font-medium">펫시터 돌봄 서비스</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-gray-600">펫시터</span>
              <span class="font-medium">김민서</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-gray-600">돌봄 날짜</span>
              <span class="font-medium">2024-03-20</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-gray-600">결제 금액</span>
              <span class="text-xl font-bold text-[#6C47FF]">10원</span>
            </div>
          </div>
        </div>

        <!-- 결제 버튼 -->
        <button
          @click="onPayment"
          class="w-full py-4 bg-[#6C47FF] text-white rounded-lg font-medium hover:bg-[#5835FF] transition-colors"
        >
          결제하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const onPayment = () => {
  /* 1. 가맹점 식별하기 */
  const { IMP } = window;
  IMP.init('imp23456548'); //고객사 식별코드 입력시 실제 결제가됨

  /* 2. 결제 데이터 정의하기 */
  const data = {
    pg: 'uplus',          // 채널로 등록된 PG사만 사용 가능하다. PG사마다 결제 화면이 달라진다
    pay_method: 'card',          // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호 -> 주문 테이블에 집어넣고 만들어진 PK를 뽑아서 집어넣기. 현재는 임의로 넣은 것.
    amount: 10,                // 결제금액
    name: '아임포트 결제 데이터 분석',  // 주문명
    buyer_name: '홍길동',         // 구매자 이름
    buyer_tel: '01012341234',    // 구매자 전화번호
    buyer_email: 'baroq8@gmail.com',  // 구매자 이메일
    buyer_addr: '신사동 661-16',  // 구매자 주소
    buyer_postcode: '06018'      // 구매자 우편번호
  };

  /* 4. 결제 창 호출하기 */
  IMP.request_pay(data, callback);
};

const callback = (response) => {
  /* 3. 콜백 함수 정의하기 */
  const {
    success,
    merchant_uid,
    error_msg
  } = response;
  
  console.log(response);
  
  if (success) {
    alert('결제 성공');
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
};
</script>
