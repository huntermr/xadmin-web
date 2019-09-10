import { axios } from '@/utils/request'

const moudulePath = '/v1/post'

const api = {
  postList: moudulePath + '/page',
  postAll: moudulePath + '/all',
  addPost: moudulePath
}

export default api

export function getPostList (parameter) {
  return axios({
    url: api.postList,
    method: 'get',
    params: parameter
  })
}

export function getUserPosts (userId) {
  return axios({
    url: moudulePath + '/' + userId + '/list',
    method: 'get'
  })
}

export function getPostAll (parameter) {
  return axios({
    url: api.postAll,
    method: 'get',
    params: parameter
  })
}

export function getPostInfo (postId) {
  return axios({
    url: moudulePath + '/' + postId,
    method: 'get'
  })
}

export function addPost (parameter) {
  return axios({
    url: api.addPost,
    method: 'post',
    params: parameter
  })
}

export function editPost (parameter) {
  console.log('parameter', parameter)
  return axios({
    url: moudulePath,
    method: 'put',
    params: parameter
  })
}

export function delPost (postId) {
  console.log('postId', postId)
  return axios({
    url: moudulePath + '/' + postId,
    method: 'delete'
  })
}
