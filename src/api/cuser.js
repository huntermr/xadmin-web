import { axios } from '@/utils/request'

const moudulePath = '/v1/user'

const api = {
  userList: moudulePath + '/page',
  addUser: moudulePath
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.userList,
    method: 'get',
    params: parameter
  })
}

export function getUserInfo (userId) {
  return axios({
    url: api.moudulePath + '/' + userId,
    method: 'get'
  })
}

export function addUser (parameter) {
  return axios({
    url: api.addUser,
    method: 'post',
    params: parameter
  })
}

export function editUser (userId, parameter) {
  console.log('userId', userId)
  console.log('parameter', parameter)
  return axios({
    url: moudulePath + '/' + userId,
    method: 'put',
    params: parameter
  })
}

export function delUser (userId) {
  console.log('userId', userId)
  return axios({
    url: moudulePath + '/' + userId,
    method: 'delete'
  })
}
