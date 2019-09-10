import { axios } from '@/utils/request'

const moudulePath = '/v1/article'

const api = {
  articleList: moudulePath + '/pages',
  articleAll: moudulePath + '/all',
  addArticle: moudulePath
}

export default api

export function getArticleList (parameter) {
  return axios({
    url: api.articleList,
    method: 'get',
    params: parameter
  })
}

export function getArticleAll (parameter) {
  return axios({
    url: api.articleAll,
    method: 'get',
    params: parameter
  })
}

export function getArticleInfo (articleId) {
  return axios({
    url: moudulePath + '/' + articleId,
    method: 'get'
  })
}

export function addArticle (parameter) {
  return axios({
    url: api.addArticle,
    method: 'post',
    params: parameter
  })
}

export function editArticle (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath + '/' + parameter.articleId,
    method: 'put',
    params: parameter
  })
}

export function delArticle (articleId) {
  console.log('articleId', articleId)
  return axios({
    url: moudulePath + '/' + articleId,
    method: 'delete'
  })
}
