import { axios } from '@/utils/request'

const moudulePath = '/gen'

const api = {
  tableList: moudulePath + '/tables',
  genCode: moudulePath + '/include'
}

export function getTableList (parameter) {
  return axios({
    url: api.tableList,
    method: 'get',
    params: parameter
  })
}

export function genCode (parameter) {
  return axios({
    url: api.genCode,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: parameter
  })
}
