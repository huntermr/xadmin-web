import { axios } from '@/utils/request'

const moudulePath = '/v1/loginLog'

const api = {
  loginlogList: moudulePath + '/page',
  loginlogAll: moudulePath + '/all',
  addLoginLog: moudulePath
}

export default api

export function getLoginLogList (parameter) {
  return axios({
    url: api.loginlogList,
    method: 'get',
    params: parameter
  })
}

export function getLoginLogAll (parameter) {
  return axios({
    url: api.loginlogAll,
    method: 'get',
    params: parameter
  })
}

export function getLoginLogInfo (logId) {
  return axios({
    url: moudulePath + '/' + logId,
    method: 'get'
  })
}

export function addLoginLog (parameter) {
  return axios({
    url: api.addLoginLog,
    method: 'post',
    params: parameter
  })
}

export function editLoginLog (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delLoginLog (logId) {
  console.log('logId', logId)
  return axios({
    url: moudulePath + '/' + logId,
    method: 'delete'
  })
}
