import { axios } from '@/utils/request'

const moudulePath = '/v1/dept'

const api = {
  deptList: moudulePath + '/page',
  deptAll: moudulePath + '/all',
  deptTreeList: moudulePath + '/list',
  addDept: moudulePath
}

export default api

export function getDeptList (parameter) {
  return axios({
    url: api.deptList,
    method: 'get',
    params: parameter
  })
}

export function getDeptTreeList (parameter) {
  return axios({
    url: api.deptTreeList,
    method: 'get',
    params: parameter
  })
}

export function getUserDepts (userId) {
  return axios({
    url: moudulePath + '/' + userId + '/list',
    method: 'get'
  })
}

export function getDeptAll (parameter) {
  return axios({
    url: api.deptAll,
    method: 'get',
    params: parameter
  })
}

export function getDeptInfo (deptId) {
  return axios({
    url: moudulePath + '/' + deptId,
    method: 'get'
  })
}

export function addDept (parameter) {
  return axios({
    url: api.addDept,
    method: 'post',
    params: parameter
  })
}

export function editDept (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delDept (deptId) {
  console.log('deptId', deptId)
  return axios({
    url: moudulePath + '/' + deptId,
    method: 'delete'
  })
}
