import axios from 'axios'

export default {
  // 코드 그룹 관련 API
  getCodeGroups() {
    return axios.get('/api/v1/codes/groups')
  },
  
  createCodeGroup(group) {
    return axios.post('/api/v1/codes/groups', group)
  },
  
  updateCodeGroup(group) {
    return axios.put(`/api/v1/codes/groups/${group.group_id}`, group)
  },
  
  deleteCodeGroup(groupId) {
    return axios.delete(`/api/v1/codes/groups/${groupId}`)
  },

  // 코드 상세 관련 API
  getCodeDetails(groupId) {
    return axios.get(`/api/v1/codes/details/${groupId}`)
  },
  
  createCodeDetail(detail) {
    return axios.post('/api/v1/codes/details', detail)
  },
  
  updateCodeDetail(detail) {
    return axios.put(`/api/v1/codes/details/${detail.code_id}`, detail)
  },
  
  deleteCodeDetail(codeId) {
    return axios.delete(`/api/v1/codes/details/${codeId}`)
  }
} 