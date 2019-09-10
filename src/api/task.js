import { axios } from '@/utils/request'

const moudulePath = '/task'

const api = {
  tasklogList: moudulePath + '/list',
  addTaskLog: moudulePath
}

export default api

export function getTaskList (parameter) {
  return axios({
    url: api.tasklogList,
    method: 'get',
    params: parameter
  })
}

export function addTask (parameter) {
  return axios({
    url: api.addTaskLog,
    method: 'post',
    params: parameter
  })
}

export function editTask (parameter) {
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delTask (jobGroup, jobName) {
  return axios({
    url: moudulePath + '/' + jobGroup + '/' + jobName,
    method: 'delete'
  })
}

export function pauseTask (jobGroup, jobName) {
  return axios({
    url: moudulePath + '/pause/' + jobGroup + '/' + jobName,
    method: 'put'
  })
}

export function resumeTask (jobGroup, jobName) {
  return axios({
    url: moudulePath + '/resume/' + jobGroup + '/' + jobName,
    method: 'put'
  })
}
