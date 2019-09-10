import { axios } from '@/utils/request'

const moudulePath = '/v1/operationLog'

const api = {
  operationlogList: moudulePath + '/page',
  operationlogAll: moudulePath + '/all',
  addOperationLog: moudulePath
}

export default api

export function getOperationLogList (parameter) {
  return axios({
    url: api.operationlogList,
    method: 'get',
    params: parameter
  })
}

export function getOperationLogAll (parameter) {
  return axios({
    url: api.operationlogAll,
    method: 'get',
    params: parameter
  })
}

export function getOperationLogInfo (logId) {
  return axios({
    url: moudulePath + '/' + logId,
    method: 'get'
  })
}

export function addOperationLog (parameter) {
  return axios({
    url: api.addOperationLog,
    method: 'post',
    params: parameter
  })
}

export function editOperationLog (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delOperationLog (logId) {
  console.log('logId', logId)
  return axios({
    url: moudulePath + '/' + logId,
    method: 'delete'
  })
}
