import { axios } from '@/utils/request'

const moudulePath = '/v1/systemNotice'

const api = {
  systemnoticeList: moudulePath + '/page',
  systemnoticeAll: moudulePath + '/all',
  addSystemNotice: moudulePath
}

export default api

export function getSystemNoticeList (parameter) {
  return axios({
    url: api.systemnoticeList,
    method: 'get',
    params: parameter
  })
}

export function getSystemNoticeAll (parameter) {
  return axios({
    url: api.systemnoticeAll,
    method: 'get',
    params: parameter
  })
}

export function getSystemNoticeInfo (noticeId) {
  return axios({
    url: moudulePath + '/' + noticeId,
    method: 'get'
  })
}

export function addSystemNotice (parameter) {
  return axios({
    url: api.addSystemNotice,
    method: 'post',
    params: parameter
  })
}

export function editSystemNotice (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delSystemNotice (noticeId) {
  console.log('noticeId', noticeId)
  return axios({
    url: moudulePath + '/' + noticeId,
    method: 'delete'
  })
}
