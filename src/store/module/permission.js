import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    /**
     * 更新路由表
     */
    updateRouters: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    /**
     * 生成路由表
     */
    async GenerateRoutes({ commit }, data) {
      const { roles } = data
      return asyncRouterMap.filter(v => {
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              return hasPermission(roles, child)
            })
          }
          return true
        }
        return false
      })
    },
    /**
     * 清理路由信息
     */
    async clearRoute({ commit }) {
      commit('updateRouters', [])
    }
  }
}

export default permission

/**
 * 判断角色列表中是否包含路由所要求的角色
 * @param roles 角色列表
 * @param route 需角色认证的路由
 * @returns {boolean} 若包含则返回true，否则返回false
 */
const hasPermission = (roles, route) => {
  return route.meta && route.meta.role ? roles.some(role => route.meta.role.indexOf(role) >= 0) : true
}
