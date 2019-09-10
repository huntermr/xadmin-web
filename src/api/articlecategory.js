import { axios } from '@/utils/request'

const moudulePath = '/v1/articleCategory'

const api = {
  articlecategoryList: moudulePath + '/page',
  articlecategoryAll: moudulePath + '/all',
  articlecategoryTree: moudulePath + '/tree',
  addArticleCategory: moudulePath
}

export default api

export function getArticleCategoryList (parameter) {
  return axios({
    url: api.articlecategoryList,
    method: 'get',
    params: parameter
  })
}

export function getArticleCategoryAll (parameter) {
  return axios({
    url: api.articlecategoryAll,
    method: 'get',
    params: parameter
  })
}

export function getArticlecategoryTree (parameter) {
  return axios({
    url: api.articlecategoryTree,
    method: 'get',
    params: parameter
  })
}

export function getArticleCategoryInfo (articleCategoryId) {
  return axios({
    url: moudulePath + '/' + articleCategoryId,
    method: 'get'
  })
}

export function addArticleCategory (parameter) {
  return axios({
    url: api.addArticleCategory,
    method: 'post',
    params: parameter
  })
}

export function editArticleCategory (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delArticleCategory (articleCategoryId) {
  console.log('articleCategoryId', articleCategoryId)
  return axios({
    url: moudulePath + '/' + articleCategoryId,
    method: 'delete'
  })
}
