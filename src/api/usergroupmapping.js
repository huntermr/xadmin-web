import { axios } from '@/utils/request'

const moudulePath = '/v1/userGroupMapping'

const api = {
  usergroupmappingList: moudulePath + '/page',
  usergroupmappingAll: moudulePath + '/all',
  addUserGroupMapping: moudulePath
}

export default api

export function getUserGroupMappingList (parameter) {
  return axios({
    url: api.usergroupmappingList,
    method: 'get',
    params: parameter
  })
}

export function getUserGroupMappingAll (parameter) {
  return axios({
    url: api.usergroupmappingAll,
    method: 'get',
    params: parameter
  })
}

export function getUserGroupMappingInfo (mappingId) {
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'get'
  })
}

export function addUserGroupMapping (parameter) {
  return axios({
    url: api.addUserGroupMapping,
    method: 'post',
    params: parameter
  })
}

export function editUserGroupMapping (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delUserGroupMapping (mappingId) {
  console.log('mappingId', mappingId)
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'delete'
  })
}
