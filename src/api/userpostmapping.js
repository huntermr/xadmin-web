import { axios } from '@/utils/request'

const moudulePath = '/v1/userPostMapping'

const api = {
  userpostmappingList: moudulePath + '/page',
  userpostmappingAll: moudulePath + '/all',
  addUserPostMapping: moudulePath
}

export default api

export function getUserPostMappingList (parameter) {
  return axios({
    url: api.userpostmappingList,
    method: 'get',
    params: parameter
  })
}

export function getUserPostMappingAll (parameter) {
  return axios({
    url: api.userpostmappingAll,
    method: 'get',
    params: parameter
  })
}

export function getUserPostMappingInfo (mappingId) {
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'get'
  })
}

export function addUserPostMapping (parameter) {
  return axios({
    url: api.addUserPostMapping,
    method: 'post',
    params: parameter
  })
}

export function editUserPostMapping (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delUserPostMapping (mappingId) {
  console.log('mappingId', mappingId)
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'delete'
  })
}
