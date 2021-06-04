import router from './router'
import store from './store'

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 若具有token
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 若没有初始化路由表，则先进行初始化
      if (store.getters.addRouters.length === 0) {
        const roles = store.getters.roleNameList
        // 生成可访问的路由表
        store.dispatch('GenerateRoutes', { roles }).then(r => {
          store.commit('updateRouters', r)
          // 动态添加可访问路由表
          router.addRoutes(store.getters.addRouters)
          // 确保addRoutes已完成
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    }
    // 放行去向路径为白名单路径
  } else if (whiteList.includes(to.path)) {
    next()
    // 否则，跳转到登录页面
  } else {
    next('/login')
  }
})
