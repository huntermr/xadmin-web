import { axios } from '@/utils/request'

const moudulePath = '/v1/userRoleMapping'

const api = {
  userrolemappingList: moudulePath + '/page',
  userrolemappingAll: moudulePath + '/all',
  addUserRoleMapping: moudulePath
}

export default api

export function getUserRoleMappingList (parameter) {
  return axios({
    url: api.userrolemappingList,
    method: 'get',
    params: parameter
  })
}

export function getUserRoleMappingAll (parameter) {
  return axios({
    url: api.userrolemappingAll,
    method: 'get',
    params: parameter
  })
}

export function getUserRoleMappingInfo (id) {
  return axios({
    url: moudulePath + '/' + id,
    method: 'get'
  })
}

export function addUserRoleMapping (parameter) {
  return axios({
    url: api.addUserRoleMapping,
    method: 'post',
    params: parameter
  })
}

export function editUserRoleMapping (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delUserRoleMapping (id) {
  console.log('id', id)
  return axios({
    url: moudulePath + '/' + id,
    method: 'delete'
  })
}
