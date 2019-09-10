import { axios } from '@/utils/request'

const moudulePath = '/v1/dictData'

const api = {
  dictdataList: moudulePath + '/page',
  dictdataAll: moudulePath + '/all',
  addDictData: moudulePath
}

export default api

export function getDictDataList (parameter) {
  return axios({
    url: api.dictdataList,
    method: 'get',
    params: parameter
  })
}

export function getDictDataAll (parameter) {
  return axios({
    url: api.dictdataAll,
    method: 'get',
    params: parameter
  })
}

export function getDictDataInfo (dictDataId) {
  return axios({
    url: moudulePath + '/' + dictDataId,
    method: 'get'
  })
}

export function addDictData (parameter) {
  return axios({
    url: api.addDictData,
    method: 'post',
    params: parameter
  })
}

export function editDictData (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delDictData (dictDataId) {
  console.log('dictDataId', dictDataId)
  return axios({
    url: moudulePath + '/' + dictDataId,
    method: 'delete'
  })
}
