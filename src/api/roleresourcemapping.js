import { axios } from '@/utils/request'

const moudulePath = '/v1/roleResourceMapping'

const api = {
  roleresourcemappingList: moudulePath + '/page',
  roleresourcemappingAll: moudulePath + '/all',
  addRoleResourceMapping: moudulePath
}

export default api

export function getRoleResourceMappingList (parameter) {
  return axios({
    url: api.roleresourcemappingList,
    method: 'get',
    params: parameter
  })
}

export function getRoleResourceMappingAll (parameter) {
  return axios({
    url: api.roleresourcemappingAll,
    method: 'get',
    params: parameter
  })
}

export function getRoleResourceMappingInfo (id) {
  return axios({
    url: moudulePath + '/' + id,
    method: 'get'
  })
}

export function addRoleResourceMapping (parameter) {
  return axios({
    url: api.addRoleResourceMapping,
    method: 'post',
    params: parameter
  })
}

export function editRoleResourceMapping (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delRoleResourceMapping (id) {
  console.log('id', id)
  return axios({
    url: moudulePath + '/' + id,
    method: 'delete'
  })
}
