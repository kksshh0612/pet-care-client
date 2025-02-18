<template>
  <div class="min-h-screen bg-[#F8F9FD]">
    <!-- 사이드바 -->
    <div class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div class="flex flex-col h-full">
        <!-- 로고 영역 -->
        <div class="p-6 border-b border-gray-200">
          <h1 class="text-xl font-bold text-gray-900">관리자 페이지</h1>
        </div>
        
        <!-- 메뉴 목록 -->
        <nav class="flex-1 p-4 space-y-1">
          <button 
            v-for="menu in menus" 
            :key="menu.id"
            @click="currentMenu = menu.id"
            :class="[
              'w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg',
              currentMenu === menu.id
                ? 'bg-[#6C47FF] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <span>{{ menu.name }}</span>
          </button>
        </nav>

        <!-- 로그아웃 버튼 -->
        <div class="p-4 border-t border-gray-200">
          <button 
            @click="handleLogout"
            class="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="ml-64 p-8">
      <!-- 상단 헤더 -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900">{{ getCurrentMenuName }}</h2>
      </div>

      <!-- 컨텐츠 영역 -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <!-- 회원 관리 -->
        <div v-if="currentMenu === 'members'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div class="flex gap-4">
              <input 
                type="text"
                v-model="searchKeyword"
                placeholder="이름 또는 이메일로 검색"
                class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
              >
              <button 
                @click="searchMembers"
                class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
              >
                검색
              </button>
            </div>
          </div>

          <!-- 회원 목록 테이블 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원 ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전화번호</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="member in members" :key="member.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ member.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ member.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ member.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ member.phone }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(member.joinDate) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ member.status === 'active' ? '활성' : '비활성' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      @click="toggleMemberStatus(member)"
                      class="text-[#6C47FF] hover:text-[#5835FF] font-medium"
                    >
                      {{ member.status === 'active' ? '비활성화' : '활성화' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 다른 메뉴들의 컨텐츠도 비슷한 방식으로 구현 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data() {
    return {
      currentMenu: 'members',
      searchKeyword: '',
      menus: [
        { id: 'members', name: '회원 관리' },
        { id: 'petsitters', name: '펫시터 관리' },
        { id: 'reservations', name: '예약 관리' },
        { id: 'reviews', name: '리뷰 관리' },
        { id: 'products', name: '상품 관리' },
        { id: 'orders', name: '주문 관리' }
      ],
      members: [
        {
          id: 1,
          name: '김회원',
          email: 'kim@example.com',
          phone: '010-1234-5678',
          joinDate: '2024-01-15',
          status: 'active'
        },
        // ... 더 많은 회원 데이터
      ]
    }
  },
  computed: {
    getCurrentMenuName() {
      const menu = this.menus.find(m => m.id === this.currentMenu)
      return menu ? menu.name : ''
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR')
    },
    searchMembers() {
      // 회원 검색 로직
      console.log('검색어:', this.searchKeyword)
    },
    toggleMemberStatus(member) {
      // 회원 상태 변경 로직
      member.status = member.status === 'active' ? 'inactive' : 'active'
    },
    handleLogout() {
      // 로그아웃 로직
      this.$router.push('/login')
    }
  }
}
</script> 