import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { getUserResources } from '@/api/cresource'
import { ACCESS_TOKEN, USER_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    resources: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_RESOURCES: (state, resources) => {
      state.resources = resources
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          Vue.ls.set(ACCESS_TOKEN, result.userToken, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(USER_ID, result.userInfo.userId, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }, userId) {
      return new Promise((resolve, reject) => {
        getInfo(userId).then(response => {
          const result = response.result

          // commit('SET_ROLES', result.role)
          commit('SET_INFO', result)

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户资源列表
    GetUserResources ({ commit }, userId) {
      return new Promise((resolve, reject) => {
        getUserResources(userId).then(response => {
          const result = response.data

          console.log(result)
          if (result.length > 0) {
            commit('SET_RESOURCES', result)
            // commit('SET_INFO', result)
          } else {
            reject(new Error('getUserResources: resources must be a non-null array !'))
          }

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        const userId = Vue.ls.get(USER_ID)

        logout(userId).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ls.remove(USER_ID)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 清除用户信息
    ClearUser ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(USER_ID)
        resolve()
      })
    }

  }
}

export default user
