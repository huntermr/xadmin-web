import { axios } from '@/utils/request'

const moudulePath = '/v1/user'

const api = {
  Login: moudulePath + '/login',
  Logout: moudulePath + '/logout',
  // get my info
  UserInfo: moudulePath + '/'
}

export default api

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'put',
    params: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo (userId) {
  return axios({
    url: api.UserInfo,
    method: 'get' + userId
  })
}

export function refreshUserAuthCache (userId) {
  return axios({
    url: moudulePath + '/authcache/' + userId,
    method: 'put'
  })
}

export function logout (userId) {
  return axios({
    url: api.Logout + '/' + userId,
    method: 'put'
  })
}
