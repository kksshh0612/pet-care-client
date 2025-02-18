<template>
  <div class="min-h-screen bg-[#F8F9FD] pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 탭 메뉴 -->
      <div class="flex space-x-4 mb-8">
        <button 
          @click="currentTab = 'petsitter'"
          :class="[
            'px-4 py-2 rounded-lg font-medium',
            currentTab === 'petsitter' 
              ? 'bg-[#6C47FF] text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          ]"
        >
          펫시터 승인 관리
        </button>
        <button 
          @click="currentTab = 'code'"
          :class="[
            'px-4 py-2 rounded-lg font-medium',
            currentTab === 'code' 
              ? 'bg-[#6C47FF] text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-50'
          ]"
        >
          코드 그룹 관리
        </button>
      </div>

      <!-- 펫시터 승인 관리 -->
      <div v-if="currentTab === 'petsitter'">
        <h1 class="text-2xl font-bold text-gray-900 mb-8">펫시터 승인 관리</h1>

        <!-- 정렬 옵션 -->
        <div class="flex justify-end mb-4">
          <select 
            v-model="sortType"
            @change="fetchWaitingList"
            class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
          >
            <option value="RATING_DESC">평점 높은순</option>
            <option value="RATING_ASC">평점 낮은순</option>
            <option value="FEE_DESC">가격 높은순</option>
            <option value="FEE_ASC">가격 낮은순</option>
            <option value="TOTAL_SERVICE_COUNT_DESC">서비스 횟수 많은순</option>
            <option value="TOTAL_SERVICE_COUNT_ASC">서비스 횟수 적은순</option>
          </select>
        </div>

        <!-- 펫시터 목록 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="profile in petSitterProfiles" :key="profile.id" 
               class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 space-y-6">
            <!-- 기본 정보 -->
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">활동 지역</h3>
                <p class="text-gray-900">{{ profile.location }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">돌봄 가능 요일</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="day in profile.availableDays" 
                    :key="day"
                    class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs"
                  >
                    {{ getDayLabel(day) }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">돌봄 가능한 반려동물</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="type in profile.petTypes" 
                    :key="type"
                    class="px-2 py-1 bg-[#F3F0FF] text-[#6C47FF] rounded-full text-xs"
                  >
                    {{ getPetTypeLabel(type) }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">요금</h3>
                <p class="text-[#6C47FF] font-bold">{{ formatPrice(profile.fee) }}원</p>
              </div>
            </div>

            <!-- 자기소개 -->
            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">자기소개</h3>
              <p class="text-gray-900 text-sm whitespace-pre-line">{{ profile.introduction }}</p>
            </div>

            <!-- 자격증 -->
            <div v-if="profile.certificationNames.length > 0">
              <h3 class="text-sm font-medium text-gray-500 mb-1">보유 자격증</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="cert in profile.certificationNames" 
                  :key="cert"
                  class="text-[#6C47FF] text-sm"
                >
                  {{ cert }}
                </span>
              </div>
            </div>

            <!-- 통계 -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-lg p-3 text-center">
                <p class="text-gray-500 text-xs mb-1">평균 평점</p>
                <div class="flex items-center justify-center gap-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-lg font-bold text-gray-900">{{ profile.averageRating.toFixed(1) }}</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-3 text-center">
                <p class="text-gray-500 text-xs mb-1">총 돌봄 횟수</p>
                <p class="text-lg font-bold text-gray-900">{{ profile.totalServiceCount }}회</p>
              </div>
            </div>

            <!-- 승인 버튼 -->
            <div class="flex justify-end">
              <button 
                @click="approvePetSitter(profile.id)"
                class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
              >
                승인하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 코드 그룹 관리 -->
      <div v-else-if="currentTab === 'code'">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">코드 그룹 관리</h2>
            <button 
              @click="openCodeGroupModal()"
              class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
            >
              코드 그룹 등록
            </button>
          </div>

          <!-- 코드 그룹 목록 -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">코드</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">그룹명</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="group in codeGroups" :key="group.code">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ group.code }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ group.groupName }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ group.description }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button 
                      @click="openCodeDetailList(group)"
                      class="text-[#6C47FF] hover:text-[#5835FF]"
                    >
                      상세 코드
                    </button>
                    <button 
                      @click="openCodeGroupModal(group)"
                      class="text-[#6C47FF] hover:text-[#5835FF]"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 코드 그룹 모달 -->
    <div v-if="showCodeGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-lg">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold">{{ isEditing ? '코드 그룹 수정' : '코드 그룹 등록' }}</h3>
          <button 
            @click="showCodeGroupModal = false"
            class="text-gray-400 hover:text-gray-500"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmitCodeGroup" class="space-y-4">
          <!-- 코드 입력 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">코드 *</label>
            <input 
              v-model="codeGroupForm.code"
              type="text"
              required
              placeholder="예) PET_TYPE"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          
          <!-- 그룹명 입력 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">그룹명 *</label>
            <input 
              v-model="codeGroupForm.groupName"
              type="text"
              required
              placeholder="예) 반려동물 종류"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          
          <!-- 설명 입력 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">설명</label>
            <textarea 
              v-model="codeGroupForm.description"
              rows="3"
              placeholder="코드 그룹에 대한 설명을 입력하세요"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            ></textarea>
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <button 
              type="button"
              @click="showCodeGroupModal = false"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              취소
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
            >
              {{ isEditing ? '수정' : '등록' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 상세 코드 목록 모달 -->
    <div v-if="showCodeDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold">상세 코드 관리 - {{ selectedGroup?.groupName }}</h3>
          <button 
            @click="showCodeDetailModal = false"
            class="text-gray-400 hover:text-gray-500"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 상세 코드 추가 버튼 -->
        <div class="mb-4">
          <button 
            @click="openCodeDetailForm()"
            class="px-4 py-2 bg-[#6C47FF] text-white rounded-lg text-sm font-medium hover:bg-[#5835FF] transition-colors"
          >
            상세 코드 추가
          </button>
        </div>

        <!-- 상세 코드 목록 -->
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">코드명</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">코드값</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="detail in codeDetails" :key="detail.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ detail.codeName }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ detail.codeValue }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    detail.isActive 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ detail.isActive ? '활성' : '비활성' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button 
                  @click="openCodeDetailForm(detail)"
                  class="text-[#6C47FF] hover:text-[#5835FF]"
                >
                  수정
                </button>
                <button 
                  @click="toggleCodeDetailActivation(detail.id)"
                  class="text-[#6C47FF] hover:text-[#5835FF]"
                >
                  {{ detail.isActive ? '비활성화' : '활성화' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 상세 코드 등록/수정 모달 -->
    <div v-if="showCodeDetailFormModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-lg">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold">{{ isEditingDetail ? '상세 코드 수정' : '상세 코드 등록' }}</h3>
          <button 
            @click="showCodeDetailFormModal = false"
            class="text-gray-400 hover:text-gray-500"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmitCodeDetail" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">코드명 *</label>
            <input 
              v-model="codeDetailForm.codeName"
              type="text"
              required
              placeholder="예) 치와와"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">코드값 *</label>
            <input 
              v-model="codeDetailForm.codeValue"
              type="text"
              required
              placeholder="예) CHIHUAHUA"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20 focus:border-[#6C47FF]"
            >
          </div>

          <div class="flex justify-end gap-4 mt-6">
            <button 
              type="button"
              @click="showCodeDetailFormModal = false"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              취소
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
            >
              {{ isEditingDetail ? '수정' : '등록' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminPage',
  data() {
    return {
      sortType: 'RATING_DESC',
      petSitterProfiles: [],
      currentPage: 0,
      pageSize: 20,
      currentTab: 'petsitter',
      codeGroups: [],
      showCodeGroupModal: false,
      isEditing: false,
      codeGroupForm: {
        code: '',
        groupName: '',
        description: ''
      },
      codeGroupPage: 0,
      codeGroupPageSize: 20,
      showCodeDetailModal: false,
      showCodeDetailFormModal: false,
      isEditingDetail: false,
      selectedGroup: null,
      codeDetails: [],
      codeDetailForm: {
        id: null,
        codeName: '',
        codeValue: '',
        codeGroupId: null,
        isActive: true
      }
    }
  },
  async created() {
    try {
      // 두 API 요청을 동시에 실행
      await Promise.all([
        this.fetchWaitingList(),
        this.fetchCodeGroups()
      ])
    } catch (error) {
      console.error('초기 데이터 로딩 실패:', error)
    }
  },
  methods: {
    async fetchWaitingList() {
      try {
        const response = await axios.get('/api/v1/pet-sitter/waiting-approval-list', {
          params: {
            page: this.currentPage,
            size: this.pageSize
          }
        })
        this.petSitterProfiles = response.data.petSitterProfiles
      } catch (error) {
        console.error('승인 대기 목록 조회 실패:', error)
        alert('승인 대기 목록을 불러오는데 실패했습니다.')
      }
    },
    async approvePetSitter(petSitterId) {
      try {
        await axios.patch(`/api/v1/pet-sitter/${petSitterId}/approve`)
        alert('펫시터가 승인되었습니다.')
        this.fetchWaitingList() // 목록 새로고침
      } catch (error) {
        console.error('펫시터 승인 실패:', error)
        alert('펫시터 승인에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    },
    getDayLabel(day) {
      const labels = {
        'MON': '월', 'TUE': '화', 'WED': '수', 
        'THU': '목', 'FRI': '금', 'SAT': '토', 'SUN': '일'
      }
      return labels[day] || day
    },
    getPetTypeLabel(type) {
      const labels = {
        'DOG': '강아지',
        'CAT': '고양이',
        'RABBIT': '토끼',
        'HAMSTER': '햄스터',
        'PARROT': '앵무새'
      }
      return labels[type] || type
    },
    formatPrice(price) {
      return price.toLocaleString()
    },
    async fetchCodeGroups() {
      try {
        const response = await axios.get('/api/v1/code/group', {
          params: {
            page: this.codeGroupPage,
            size: this.codeGroupPageSize
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        console.log('코드 그룹 응답:', response.data)  // 응답 데이터 확인
        this.codeGroups = response.data.codeGroups
      } catch (error) {
        // 에러 상세 정보 출력
        console.error('코드 그룹 목록 조회 실패:', {
          message: error.message,
          response: error.response,
          config: error.config
        })
        alert('코드 그룹 목록을 불러오는데 실패했습니다.')
      }
    },
    openCodeGroupModal(group = null) {
      this.isEditing = !!group
      if (group) {
        this.codeGroupForm = {
          code: group.code,
          groupName: group.groupName,
          description: group.description
        }
      } else {
        this.codeGroupForm = {
          code: '',
          groupName: '',
          description: ''
        }
      }
      this.showCodeGroupModal = true
    },
    async handleSubmitCodeGroup() {
      try {
        const requestData = {
          code: this.codeGroupForm.code,
          groupName: this.codeGroupForm.groupName,
          description: this.codeGroupForm.description
        }

        if (this.isEditing) {
          await axios.patch('/api/v1/code/group', requestData)
          alert('코드 그룹이 수정되었습니다.')
        } else {
          await axios.post('/api/v1/code/group', requestData)
          alert('코드 그룹이 등록되었습니다.')
        }
        this.showCodeGroupModal = false
        await this.fetchCodeGroups()
      } catch (error) {
        console.error('코드 그룹 처리 실패:', error)
        alert('처리에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    },
    async openCodeDetailList(group) {
      this.selectedGroup = group
      this.showCodeDetailModal = true
      await this.fetchCodeDetails(group.id)
    },
    async fetchCodeDetails(groupId) {
      try {
        const response = await axios.get(`/api/v1/code/detail/${groupId}`, {
          params: {
            page: 0,  // 페이지 번호
            size: 20  // 페이지 크기
          }
        })
        this.codeDetails = response.data.codeDetailResponses
      } catch (error) {
        console.error('상세 코드 목록 조회 실패:', error)
        alert('상세 코드 목록을 불러오는데 실패했습니다.')
      }
    },
    openCodeDetailForm(detail = null) {
      this.isEditingDetail = !!detail
      if (detail) {
        this.codeDetailForm = {
          id: detail.id,
          codeName: detail.codeName,
          codeValue: detail.codeValue,
          codeGroupId: this.selectedGroup.id,
          isActive: detail.isActive
        }
      } else {
        this.codeDetailForm = {
          id: null,
          codeName: '',
          codeValue: '',
          codeGroupId: this.selectedGroup.id,
          isActive: true
        }
      }
      this.showCodeDetailFormModal = true
    },
    async handleSubmitCodeDetail() {
      try {
        if (this.isEditingDetail) {
          await axios.patch('/api/v1/code/detail', this.codeDetailForm)
          alert('상세 코드가 수정되었습니다.')
        } else {
          await axios.post('/api/v1/code/detail', this.codeDetailForm)
          alert('상세 코드가 등록되었습니다.')
        }
        this.showCodeDetailFormModal = false
        await this.fetchCodeDetails(this.selectedGroup.id)
      } catch (error) {
        console.error('상세 코드 처리 실패:', error)
        alert('처리에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    },
    async toggleCodeDetailActivation(detailId) {
      try {
        await axios.patch(`/api/v1/code/detail/activation-toggle/${detailId}`)
        await this.fetchCodeDetails(this.selectedGroup.id)
      } catch (error) {
        console.error('상세 코드 활성화 상태 변경 실패:', error)
        alert('상태 변경에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
  },
  watch: {
    // 탭 변경 시에는 해당 탭의 데이터만 새로고침
    async currentTab(newTab) {
      try {
        if (newTab === 'petsitter') {
          await this.fetchWaitingList()
        } else {
          await this.fetchCodeGroups()
        }
      } catch (error) {
        console.error('탭 전환 시 데이터 로딩 실패:', error)
      }
    }
  }
}
</script> 