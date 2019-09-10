import { axios } from '@/utils/request'

const moudulePath = '/v1/userDeptMapping'

const api = {
  userdeptmappingList: moudulePath + '/page',
  userdeptmappingAll: moudulePath + '/all',
  addUserDeptMapping: moudulePath
}

export default api

export function getUserDeptMappingList (parameter) {
  return axios({
    url: api.userdeptmappingList,
    method: 'get',
    params: parameter
  })
}

export function getUserDeptMappingAll (parameter) {
  return axios({
    url: api.userdeptmappingAll,
    method: 'get',
    params: parameter
  })
}

export function getUserDeptMappingInfo (mappingId) {
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'get'
  })
}

export function addUserDeptMapping (parameter) {
  return axios({
    url: api.addUserDeptMapping,
    method: 'post',
    params: parameter
  })
}

export function editUserDeptMapping (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delUserDeptMapping (mappingId) {
  console.log('mappingId', mappingId)
  return axios({
    url: moudulePath + '/' + mappingId,
    method: 'delete'
  })
}
