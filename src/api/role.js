import { axios } from '@/utils/request'

const moudulePath = '/v1/role'

const api = {
  roleList: moudulePath + '/page',
  roleAll: moudulePath + '/all',
  addRole: moudulePath
}

export default api

export function getRoleList (parameter) {
  return axios({
    url: api.roleList,
    method: 'get',
    params: parameter
  })
}

export function getUserRoles (userId) {
  return axios({
    url: moudulePath + '/' + userId + '/list',
    method: 'get'
  })
}

export function getGroupRoles (groupId) {
  return axios({
    url: moudulePath + '/group/' + groupId + '/list',
    method: 'get'
  })
}

export function getRoleAll (parameter) {
  return axios({
    url: api.roleAll,
    method: 'get',
    params: parameter
  })
}

export function getRoleInfo (roleId) {
  return axios({
    url: moudulePath + '/' + roleId,
    method: 'get'
  })
}

export function addRole (parameter) {
  return axios({
    url: api.addRole,
    method: 'post',
    params: parameter
  })
}

export function editRole (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delRole (roleId) {
  console.log('roleId', roleId)
  return axios({
    url: moudulePath + '/' + roleId,
    method: 'delete'
  })
}
