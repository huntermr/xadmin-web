import { axios } from '@/utils/request'

const moudulePath = '/v1/param'

const api = {
  paramList: moudulePath + '/page',
  paramAll: moudulePath + '/all',
  addParam: moudulePath
}

export default api

export function getParamList (parameter) {
  return axios({
    url: api.paramList,
    method: 'get',
    params: parameter
  })
}

export function getParamAll (parameter) {
  return axios({
    url: api.paramAll,
    method: 'get',
    params: parameter
  })
}

export function getParamInfo (paramId) {
  return axios({
    url: moudulePath + '/' + paramId,
    method: 'get'
  })
}

export function addParam (parameter) {
  return axios({
    url: api.addParam,
    method: 'post',
    params: parameter
  })
}

export function editParam (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delParam (paramId) {
  console.log('paramId', paramId)
  return axios({
    url: moudulePath + '/' + paramId,
    method: 'delete'
  })
}
