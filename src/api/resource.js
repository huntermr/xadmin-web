import { axios } from '@/utils/request'

const moudulePath = '/v1/resource'

const api = {
  resourceList: moudulePath + '/list',
  resourceAll: moudulePath + '/all',
  addResource: moudulePath
}

export default api

export function getResourceList (parameter) {
  return axios({
    url: api.resourceList,
    method: 'get',
    params: parameter
  })
}

export function getResourceAll (parameter) {
  return axios({
    url: api.resourceAll,
    method: 'get',
    params: parameter
  })
}

export function getResourceInfo (resourceId) {
  return axios({
    url: moudulePath + '/' + resourceId,
    method: 'get'
  })
}

export function bindRoleResource (roleId, parameter) {
  return axios({
    url: moudulePath + '/bind/' + roleId,
    method: 'put',
    params: parameter
  })
}

export function addResource (parameter) {
  return axios({
    url: api.addResource,
    method: 'post',
    params: parameter
  })
}

export function editResource (resourceId, parameter) {
  return axios({
    url: moudulePath + '/' + resourceId,
    method: 'put',
    params: parameter
  })
}

export function delResource (resourceId) {
  return axios({
    url: moudulePath + '/' + resourceId,
    method: 'delete'
  })
}
