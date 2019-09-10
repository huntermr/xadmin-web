import { axios } from '@/utils/request'

const moudulePath = '/v1/resource'

const api = {
  resourceList: moudulePath + '/list',
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

export function getResourceInfo (resourceId) {
  return axios({
    url: api.moudulePath + '/' + resourceId,
    method: 'get'
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
  console.log('resourceId', resourceId)
  console.log('parameter', parameter)
  return axios({
    url: moudulePath + '/' + resourceId,
    method: 'put',
    params: parameter
  })
}

export function delResource (resourceId) {
  console.log('resourceId', resourceId)
  return axios({
    url: moudulePath + '/' + resourceId,
    method: 'delete'
  })
}

export function getUserResources (userId) {
  return axios({
    url: moudulePath + '/' + userId + '/list',
    method: 'get'
  })
}

export function getRoleResources (roleId) {
  return axios({
    url: moudulePath + '/role/' + roleId + '/list',
    method: 'get'
  })
}
