import { constantRouterMap } from '@/config/router.config'
// eslint-disable-next-line
import { BasicLayout, RouteView, BlankLayout, PageView, IframeView } from '@/layouts'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  IframeView: IframeView

  // ...more
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

export const routerFilter = (routerMap) => {
  return routerMap
    .filter(item => {
      if (item.childResources && item.childResources.length > 0) {
        item.childResources = routerFilter(item.childResources)
      }

      // 剔除掉按钮级的资源
      if (item.resourceType !== 'O') {
        return true
      }
    })
}

export const generator = (routerMap, parent) => {
  return routerFilter(routerMap)
    .map(item => {
      let path
      const reURL = /^(http|https|ftp|file):\/\/.+$/

      if (reURL.test(item.resourceUri)) {
        path = item.resourceUri
      } else {
        path = `${parent && parent.resourceUri || ''}/${item.resourceUri}`

        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        path = path.replace('//', '/')
      }

      let routerComponent = constantRouterComponents[item.resourceView]
      if (!routerComponent && item.resourceView) {
        routerComponent = () => import('@/views/' + item.resourceView)
      }

      const currentRouter = {
        // 路由地址 动态拼接生成
        path: path,
        // 路由名称，建议唯一
        name: item.resourceKey,
        // 该路由对应页面的 组件
        component: routerComponent,
        // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
        meta: { title: item.resourceName, icon: item.resourceIcon || undefined, permission: item.resourceKey && [ item.resourceKey ] || null, url: reURL.test(item.resourceRedirect) ? item.resourceRedirect : undefined }
      }
      // 重定向
      item.resourceRedirect && !reURL.test(item.resourceRedirect) && (currentRouter.redirect = item.resourceRedirect)
      // 是否有子菜单，并递归处理
      if (item.childResources && item.childResources.length > 0) {
      // Recursion
        currentRouter.children = generator(item.childResources, item)
      }
      return currentRouter
    })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GeneratorDynamicRouter ({ commit }, res) {
      return new Promise(resolve => {
        const resources = res.data
        if (resources != null && resources.length > 0) {
          // const filterResources = routerFilter(resources)
          // const routers = generator(filterResources)
          const assign = JSON.parse(JSON.stringify(resources))
          const routers = generator(assign)
          routers.push(notFoundRouter)
          commit('SET_ROUTERS', routers)
        }

        resolve()
      })
    }
  }
}

export default permission
