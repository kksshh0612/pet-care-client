<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F3F0FF]/30 to-white pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">코드 관리</h2>
      
      <!-- 코드 그룹 관리 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-900 mb-4">코드 그룹</h3>
        <form @submit.prevent="saveCodeGroup" class="space-y-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              v-model="group.group_id"
              placeholder="그룹 ID"
              required
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            />
            <input
              v-model="group.group_name"
              placeholder="그룹명"
              required
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            />
            <input
              v-model="group.description"
              placeholder="설명"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            />
          </div>
          <button
            type="submit"
            class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
          >
            저장
          </button>
        </form>

        <!-- 코드 그룹 목록 -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="g in codeGroups" :key="g.group_id">
                <td class="px-6 py-4 whitespace-nowrap">{{ g.group_id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ g.group_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ g.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    @click="editGroup(g)"
                    class="text-[#6C47FF] hover:text-[#5835FF]"
                  >
                    수정
                  </button>
                  <button
                    @click="deleteGroup(g.group_id)"
                    class="text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                  <button
                    @click="selectGroup(g.group_id)"
                    class="text-[#6C47FF] hover:text-[#5835FF]"
                  >
                    상세 관리
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 코드 상세 관리 -->
      <div v-if="selectedGroup" class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          코드 상세 ({{ selectedGroup }})
        </h3>
        <form @submit.prevent="saveCodeDetail" class="space-y-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              v-model="detail.code_id"
              placeholder="코드 ID"
              required
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            />
            <input
              v-model="detail.code_name"
              placeholder="코드명"
              required
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            />
            <input
              v-model="detail.code_value"
              placeholder="코드 값"
              required
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            />
            <input
              v-model="detail.sort_order"
              type="number"
              placeholder="정렬순서"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            />
            <select
              v-model="detail.is_active"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C47FF]"
            >
              <option :value="true">활성</option>
              <option :value="false">비활성</option>
            </select>
          </div>
          <button
            type="submit"
            class="px-6 py-2 bg-[#6C47FF] text-white rounded-lg hover:bg-[#5835FF] transition-colors"
          >
            저장
          </button>
        </form>

        <!-- 코드 상세 목록 -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">값</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">정렬</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="d in codeDetails" :key="d.code_id">
                <td class="px-6 py-4 whitespace-nowrap">{{ d.code_id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ d.code_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ d.code_value }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ d.sort_order }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      d.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ d.is_active ? "활성" : "비활성" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    @click="editDetail(d)"
                    class="text-[#6C47FF] hover:text-[#5835FF]"
                  >
                    수정
                  </button>
                  <button
                    @click="deleteDetail(d.code_id)"
                    class="text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import codeService from '../../api/codeService'

export default {
  name: 'CodeManage',
  setup() {
    // ... (기존 setup 로직 유지)
    return {
      codeGroups,
      codeDetails,
      selectedGroup,
      group,
      detail,
      saveCodeGroup,
      editGroup,
      deleteGroup,
      selectGroup,
      saveCodeDetail,
      editDetail,
      deleteDetail
    }
  }
}
</script> 