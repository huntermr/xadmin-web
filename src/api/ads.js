import { axios } from '@/utils/request'

const moudulePath = '/v1/ads'

const api = {
  adsList: moudulePath + '/page',
  adsAll: moudulePath + '/all',
  addAds: moudulePath
}

export default api

export function getAdsList (parameter) {
  return axios({
    url: api.adsList,
    method: 'get',
    params: parameter
  })
}

export function getAdsAll (parameter) {
  return axios({
    url: api.adsAll,
    method: 'get',
    params: parameter
  })
}

export function getAdsInfo (adsId) {
  return axios({
    url: moudulePath + '/' + adsId,
    method: 'get'
  })
}

export function addAds (parameter) {
  return axios({
    url: api.addAds,
    method: 'post',
    params: parameter
  })
}

export function editAds (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delAds (adsId) {
  console.log('adsId', adsId)
  return axios({
    url: moudulePath + '/' + adsId,
    method: 'delete'
  })
}
