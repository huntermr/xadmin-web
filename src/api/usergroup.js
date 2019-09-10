import { axios } from '@/utils/request'

const moudulePath = '/v1/userGroup'

const api = {
  usergroupList: moudulePath + '/page',
  usergroupAll: moudulePath + '/all',
  addUserGroup: moudulePath
}

export default api

export function getUserGroupList (parameter) {
  return axios({
    url: api.usergroupList,
    method: 'get',
    params: parameter
  })
}

export function getUserGroupAll (parameter) {
  return axios({
    url: api.usergroupAll,
    method: 'get',
    params: parameter
  })
}

export function getUserGroupInfo (groupId) {
  return axios({
    url: moudulePath + '/' + groupId,
    method: 'get'
  })
}

export function addUserGroup (parameter) {
  return axios({
    url: api.addUserGroup,
    method: 'post',
    params: parameter
  })
}

export function editUserGroup (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delUserGroup (groupId) {
  console.log('groupId', groupId)
  return axios({
    url: moudulePath + '/' + groupId,
    method: 'delete'
  })
}

export function bindUserGroup (groupId, parameter) {
  return axios({
    url: moudulePath + '/bind/user/' + groupId,
    method: 'put',
    params: parameter
  })
}

export function bindRoleGroup (groupId, parameter) {
  return axios({
    url: moudulePath + '/bind/role/' + groupId,
    method: 'put',
    params: parameter
  })
}
