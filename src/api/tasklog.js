import { axios } from '@/utils/request'

const moudulePath = '/v1/taskLog'

const api = {
  tasklogList: moudulePath + '/range',
  tasklogAll: moudulePath + '/all',
  addTaskLog: moudulePath
}

export default api

export function getTaskLogList (parameter) {
  return axios({
    url: api.tasklogList,
    method: 'get',
    params: parameter
  })
}

export function getTaskLogAll (parameter) {
  return axios({
    url: api.tasklogAll,
    method: 'get',
    params: parameter
  })
}

export function getTaskLogInfo (taskLogId) {
  return axios({
    url: moudulePath + '/' + taskLogId,
    method: 'get'
  })
}

export function addTaskLog (parameter) {
  return axios({
    url: api.addTaskLog,
    method: 'post',
    params: parameter
  })
}

export function editTaskLog (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delTaskLog (taskLogId) {
  console.log('taskLogId', taskLogId)
  return axios({
    url: moudulePath + '/' + taskLogId,
    method: 'delete'
  })
}
