import { axios } from '@/utils/request'

const moudulePath = '/v1/media'

const api = {
  mediaList: moudulePath + '/page',
  mediaAll: moudulePath + '/all',
  addMedia: moudulePath
}

export default api

export function getMediaList (parameter) {
  return axios({
    url: api.mediaList,
    method: 'get',
    params: parameter
  })
}

export function getMediaAll (parameter) {
  return axios({
    url: api.mediaAll,
    method: 'get',
    params: parameter
  })
}

export function getMediaInfo (id) {
  return axios({
    url: moudulePath + '/' + id,
    method: 'get'
  })
}

export function addMedia (parameter) {
  return axios({
    url: api.addMedia,
    method: 'post',
    params: parameter
  })
}

export function editMedia (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delMedia (id) {
  console.log('id', id)
  return axios({
    url: moudulePath + '/' + id,
    method: 'delete'
  })
}
