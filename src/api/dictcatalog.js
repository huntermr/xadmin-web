import { axios } from '@/utils/request'

const moudulePath = '/v1/dictCatalog'

const api = {
  dictcatalogList: moudulePath + '/page',
  dictcatalogAll: moudulePath + '/all',
  addDictCatalog: moudulePath
}

export default api

export function getDictCatalogList (parameter) {
  return axios({
    url: api.dictcatalogList,
    method: 'get',
    params: parameter
  })
}

export function getDictCatalogAll (parameter) {
  return axios({
    url: api.dictcatalogAll,
    method: 'get',
    params: parameter
  })
}

export function getDictCatalogInfo (dictId) {
  return axios({
    url: moudulePath + '/' + dictId,
    method: 'get'
  })
}

export function addDictCatalog (parameter) {
  return axios({
    url: api.addDictCatalog,
    method: 'post',
    params: parameter
  })
}

export function editDictCatalog (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delDictCatalog (dictId) {
  console.log('dictId', dictId)
  return axios({
    url: moudulePath + '/' + dictId,
    method: 'delete'
  })
}
