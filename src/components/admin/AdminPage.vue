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
        <!-- 펫 코드 관리 -->
        <div v-if="currentMenu === 'petcodes'" class="space-y-8">
          <!-- 코드 그룹 섹션 -->
          <div class="space-y-6">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900">코드 그룹 관리</h3>
              <button 
                @click="openAddGroupModal"
                class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
              >
                그룹 추가
              </button>
            </div>

            <!-- 코드 그룹 테이블 -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">그룹 ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">그룹 이름</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">그룹 설명</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="group in codeGroups" :key="group.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ group.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ group.name }}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">{{ group.description }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        @click="editGroup(group)"
                        class="text-[#6C47FF] hover:text-[#5835FF] font-medium mr-4"
                      >
                        수정
                      </button>
                      <button 
                        @click="showGroupCodes(group)"
                        class="text-[#6C47FF] hover:text-[#5835FF] font-medium"
                      >
                        코드 관리
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 코드 상세 섹션 (선택된 그룹이 있을 때만 표시) -->
          <div v-if="selectedGroup" class="space-y-6">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900">
                {{ selectedGroup.name }} 코드 관리
              </h3>
              <div class="flex gap-4">
                <button 
                  @click="selectedGroup = null"
                  class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  그룹 목록으로
                </button>
                <button 
                  @click="openAddCodeModal"
                  class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
                >
                  코드 추가
                </button>
              </div>
            </div>

            <!-- 코드 목록 테이블 -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">코드 ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">코드명</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">코드값</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">정렬 순서</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">활성화 여부</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="code in selectedGroupCodes" :key="code.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ code.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ code.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ code.value }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ code.sortOrder }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'px-2 py-1 text-xs font-medium rounded-full',
                        code.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      ]">
                        {{ code.isActive ? '사용' : '미사용' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        @click="editCode(code)"
                        class="text-[#6C47FF] hover:text-[#5835FF] font-medium mr-4"
                      >
                        수정
                      </button>
                      <button 
                        @click="toggleCodeStatus(code)"
                        class="text-[#6C47FF] hover:text-[#5835FF] font-medium"
                      >
                        {{ code.isActive ? '비활성화' : '활성화' }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 그룹 추가/수정 모달 -->
    <div v-if="showGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">{{ isEditMode ? '그룹 수정' : '그룹 추가' }}</h3>
        <form @submit.prevent="handleGroupSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">그룹 이름</label>
            <input 
              v-model="groupForm.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">그룹 설명</label>
            <textarea 
              v-model="groupForm.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            ></textarea>
          </div>
          <div class="flex justify-end gap-4">
            <button 
              type="button"
              @click="showGroupModal = false"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              취소
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
            >
              {{ isEditMode ? '수정' : '추가' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 코드 추가/수정 모달 -->
    <div v-if="showCodeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">{{ isEditMode ? '코드 수정' : '코드 추가' }}</h3>
        <form @submit.prevent="handleCodeSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">코드 그룹</label>
            <input 
              v-model="codeForm.group"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">코드 이름</label>
            <input 
              v-model="codeForm.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">코드 설명</label>
            <textarea 
              v-model="codeForm.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            ></textarea>
          </div>
          <div class="flex justify-end gap-4">
            <button 
              type="button"
              @click="showCodeModal = false"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              취소
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
            >
              {{ isEditMode ? '수정' : '추가' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data() {
    return {
      currentMenu: 'petcodes',
      showGroupModal: false,
      showCodeModal: false,
      isEditMode: false,
      selectedGroup: null,
      menus: [
        { id: 'members', name: '회원 관리' },
        { id: 'petsitters', name: '펫시터 관리' },
        { id: 'reservations', name: '예약 관리' },
        { id: 'petcodes', name: '펫 코드 관리' }
      ],
      codeGroups: [
        {
          id: 'GRP001',
          name: '강아지',
          description: '강아지 품종 코드'
        },
        {
          id: 'GRP002',
          name: '고양이',
          description: '고양이 품종 코드'
        }
      ],
      petCodes: [
        {
          id: 'DOG001',
          groupId: 'GRP001',
          name: '말티즈',
          value: 'maltese',
          sortOrder: 1,
          isActive: true
        },
        {
          id: 'DOG002',
          groupId: 'GRP001',
          name: '시츄',
          value: 'shihtzu',
          sortOrder: 2,
          isActive: true
        },
        {
          id: 'CAT001',
          groupId: 'GRP002',
          name: '샴',
          value: 'siamese',
          sortOrder: 1,
          isActive: true
        }
      ],
      groupForm: {
        name: '',
        description: ''
      },
      codeForm: {
        name: '',
        value: '',
        sortOrder: 0
      }
    }
  },
  computed: {
    getCurrentMenuName() {
      const menu = this.menus.find(m => m.id === this.currentMenu)
      return menu ? menu.name : ''
    },
    selectedGroupCodes() {
      return this.selectedGroup 
        ? this.petCodes.filter(code => code.groupId === this.selectedGroup.id)
        : []
    }
  },
  methods: {
    openAddGroupModal() {
      this.isEditMode = false
      this.groupForm = {
        name: '',
        description: ''
      }
      this.showGroupModal = true
    },
    editGroup(group) {
      this.isEditMode = true
      this.groupForm = { ...group }
      this.showGroupModal = true
    },
    showGroupCodes(group) {
      this.selectedGroup = group
    },
    handleGroupSubmit() {
      if (this.isEditMode) {
        const index = this.codeGroups.findIndex(group => group.id === this.groupForm.id)
        if (index !== -1) {
          this.codeGroups[index] = { ...this.groupForm }
        }
      } else {
        const newGroup = {
          id: `GRP${String(this.codeGroups.length + 1).padStart(3, '0')}`,
          ...this.groupForm
        }
        this.codeGroups.push(newGroup)
      }
      this.showGroupModal = false
    },
    openAddCodeModal() {
      this.isEditMode = false
      this.codeForm = {
        name: '',
        value: '',
        sortOrder: 0
      }
      this.showCodeModal = true
    },
    editCode(code) {
      this.isEditMode = true
      this.codeForm = { ...code }
      this.showCodeModal = true
    },
    handleCodeSubmit() {
      if (this.isEditMode) {
        // 코드 수정 로직
        const index = this.petCodes.findIndex(code => code.id === this.codeForm.id)
        if (index !== -1) {
          this.petCodes[index] = { ...this.codeForm }
        }
      } else {
        // 코드 추가 로직
        const newCode = {
          id: `PET${String(this.petCodes.length + 1).padStart(3, '0')}`,
          ...this.codeForm,
          isActive: true
        }
        this.petCodes.push(newCode)
      }
      this.showCodeModal = false
    },
    toggleCodeStatus(code) {
      code.isActive = !code.isActive
    },
    handleLogout() {
      this.$router.push('/login')
    }
  }
}
</script> 