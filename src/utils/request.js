import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN,
  USER_ID
} from '@/store/mutation-types'

const baseHost = 'http://10.10.10.146:21550'
const uploadUrl = baseHost + '/v1/common/upload'

// 创建 axios 实例
const service = axios.create({
  baseURL: baseHost, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  const data = error.data

  if (data) {
    switch (data.status) {
      case 90000:
      case 90001:
      case 90002:
      case 90003:
        store.dispatch('ClearUser').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 500)
        })
    }
    notification.error({
      message: '操作失败',
      description: data.message
    })
  } else {
    notification.error({
      key: 'NETWORK_ERROR',
      message: '连接服务器失败',
      description: '请检查您的网络连接配置'
    })
  }
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  const userId = Vue.ls.get(USER_ID)
  if (token) {
    config.headers['X-USER-TOKEN'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (userId) {
    config.headers['X-USER-ID'] = userId
  }
  config.headers['X-SOURCE'] = 'web'
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  const data = response.data
  if (data && data.status === 10000) {
    return data
  } else {
    throw err(response)
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios,
  uploadUrl,
  baseHost
}
