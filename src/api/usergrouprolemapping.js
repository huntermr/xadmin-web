import { axios } from '@/utils/request'

const moudulePath = '/v1/userGroupRoleMapping'

const api = {
  usergrouprolemappingList: moudulePath + '/page',
  usergrouprolemappingAll: moudulePath + '/all',
  addUserGroupRoleMapping: moudulePath
}

export default api

export function getUserGroupRoleMappingList (parameter) {
  return axios({
    url: api.usergrouprolemappingList,
    method: 'get',
    params: parameter
  })
}

export function getUserGroupRoleMappingAll (parameter) {
  return axios({
    url: api.usergrouprolemappingAll,
    method: 'get',
    params: parameter
  })
}

export function getUserGroupRoleMappingInfo (mappingId) {
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'get'
  })
}

export function addUserGroupRoleMapping (parameter) {
  return axios({
    url: api.addUserGroupRoleMapping,
    method: 'post',
    params: parameter
  })
}

export function editUserGroupRoleMapping (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delUserGroupRoleMapping (mappingId) {
  console.log('mappingId', mappingId)
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'delete'
  })
}
