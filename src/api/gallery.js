import { axios } from '@/utils/request'

const moudulePath = '/v1/gallery'

const api = {
  galleryList: moudulePath + '/page',
  galleryAll: moudulePath + '/all',
  addGallery: moudulePath
}

export default api

export function getGalleryList (parameter) {
  return axios({
    url: api.galleryList,
    method: 'get',
    params: parameter
  })
}

export function getGalleryAll (parameter) {
  return axios({
    url: api.galleryAll,
    method: 'get',
    params: parameter
  })
}

export function getGalleryInfo (galleryId) {
  return axios({
    url: moudulePath + '/' + galleryId,
    method: 'get'
  })
}

export function addGallery (parameter) {
  return axios({
    url: api.addGallery,
    method: 'post',
    params: parameter
  })
}

export function editGallery (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delGallery (galleryId) {
  console.log('galleryId', galleryId)
  return axios({
    url: moudulePath + '/' + galleryId,
    method: 'delete'
  })
}
