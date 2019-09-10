import { axios } from '@/utils/request'

const moudulePath = '/v1/role'

const api = {
  roleList: moudulePath + '/page',
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

export function addRole (parameter) {
  return axios({
    url: api.addRole,
    method: 'post',
    params: parameter
  })
}

export function editRole (roleId, parameter) {
  console.log('roleId', roleId)
  console.log('parameter', parameter)
  return axios({
    url: moudulePath + '/' + roleId,
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
