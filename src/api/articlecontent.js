import { axios } from '@/utils/request'

const moudulePath = '/v1/articleContent'

const api = {
  articlecontentList: moudulePath + '/page',
  articlecontentAll: moudulePath + '/all',
  addArticleContent: moudulePath
}

export default api

export function getArticleContentList (parameter) {
  return axios({
    url: api.articlecontentList,
    method: 'get',
    params: parameter
  })
}

export function getArticleContentAll (parameter) {
  return axios({
    url: api.articlecontentAll,
    method: 'get',
    params: parameter
  })
}

export function getArticleContentInfo (contentId) {
  return axios({
    url: moudulePath + '/' + contentId,
    method: 'get'
  })
}

export function addArticleContent (parameter) {
  return axios({
    url: api.addArticleContent,
    method: 'post',
    params: parameter
  })
}

export function editArticleContent (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delArticleContent (contentId) {
  console.log('contentId', contentId)
  return axios({
    url: moudulePath + '/' + contentId,
    method: 'delete'
  })
}
