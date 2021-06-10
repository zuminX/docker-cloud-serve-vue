import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import { getUrl } from '@/utils/coreUtils'

Vue.use(VueRouter)

const url = getUrl()

// 修改路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

// 所有权限通用路由表
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录'
    },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '我的应用',
        icon: 'home'
      }
    }]
  },
  {
    path: '/userInformation',
    component: Layout,
    children: [{
      path: '',
      name: 'UserInformation',
      component: () => import('@/views/user-information/index'),
      meta: {
        title: '个人信息',
        icon: 'people'
      }
    }]
  },
  {
    path: '/image',
    component: Layout,
    children: [{
      path: '',
      name: 'ImageTable',
      component: () => import('@/views/image-table/index'),
      meta: {
        title: '镜像',
        icon: 'table'
      }
    }]
  },
  {
    path: '/application',
    component: Layout,
    children: [{
      path: '',
      name: 'ApplicationTable',
      component: () => import('@/views/application-table/index'),
      meta: {
        title: '应用',
        icon: 'component'
      }
    }]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index'),
    meta: {
      title: '注册'
    },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

// 异步挂载的路由
export const asyncRouterMap = [
  {
    path: '/external-link',
    component: Layout,
    meta: {
      role: ['ADMIN']
    },
    children: [{
      path: `${url}/admin`,
      meta: {
        title: '后台管理',
        icon: 'link'
      }
    }]
  }
]

/**
 * 创建路由
 * @returns {VueRouter} 路由对象
 */
const createRouter = () => new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

const router = createRouter()

export default router

/**
 * 重置路由表
 */
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

