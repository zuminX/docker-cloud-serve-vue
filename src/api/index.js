/**
 * axios请求封装
 */
import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import {
  showErrorToast,
  showSuccessToast
} from '@/utils/publicUtils'
import { getData } from '@/utils/sessionStorageUtils'

// 设置POST请求的内容类型为JSON且编码格式为UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

/**
 * 使用axios中的拦截器对request进行请拦截
 */
axios.interceptors.request.use(config => {
  const token = getData('token')
  if (token) {
    config.headers['Authorization'] = `bearer ${token}`
  }
  return config
}, error => {
  showErrorToast({
    message: '请求失败'
  })
  console.log(error)
})

/**
 * 使用axios中的拦截器对response进行请拦截
 */
axios.interceptors.response.use(success => {
  const response = success.data
  const status = response.success
  // 请求失败
  if (!status) {
    // 显示错误信息
    showErrorToast({
      message: response.message
    })
  }
  return {
    success: status,
    data: response.data
  }
}, error => {
  let message
  // 根据请求响应的状态，显示不同的错误信息
  switch (error.response.status) {
    case 500:
    case 504:
      message = '服务器发生异常'
      break
    case 403:
      message = '权限不足'
      router.replace('/login')
      break
    case 401:
      message = '尚未登录，请先登录'
      router.replace('/login')
      break
    default :
      message = error.response.data.message || '未知错误'
      break
  }
  showErrorToast({
    message
  })
  return {
    success: false,
    data: null
  }
})

/**
 * 基地址
 */
const baseUrl = process.env.NODE_ENV === 'production' ? '/api' : ''

/**
 * 发送请求
 * @param apiInfo API信息
 * @param params 参数
 */
export const request = (apiInfo, params) => {
  return requestMap[apiInfo.type](apiInfo.path, params)
}

/**
 * 带加载的请求
 * @param request 请求
 * @param object 拥有加载变量的对象
 * @param property 控制加载的变量名或下标
 */
export const loadingRequest = async(request, object, property = 'loading') => {
  Vue.set(object, property, true)
  try {
    return await request
  } finally {
    Vue.set(object, property, false)
  }
}

/**
 * 当请求成功时，会显示提示信息
 * @param request 请求
 * @param message 提示信息
 */
export const messageRequest = async(request, message) => {
  const result = await request
  if (result.success) {
    showSuccessToast({ message })
  }
  return result
}

const requestMap = {
  'post': postRequest,
  'get': getRequest,
  'put': putRequest,
  'delete': deleteRequest,
  'file': fileRequest
}

/**
 * 发送文件上传请求
 * @param path 地址
 * @param data 参数
 */
function fileRequest(path, data) {
  return axios({
    method: 'post',
    url: `${baseUrl}${path}`,
    data
  })
}

/**
 * 发送POST请求
 * @param path 地址
 * @param params 参数
 */
function postRequest(path, params) {
  return axios({
    method: 'post',
    url: `${baseUrl}${path}`,
    data: JSON.stringify(params)
  })
}

/**
 * 发送GET请求
 * @param path 地址
 * @param params 参数
 */
function getRequest(path, params) {
  return axios({
    method: 'get',
    url: `${baseUrl}${path}`,
    params
  })
}

/**
 * 发送PUT请求
 * @param path 地址
 * @param params 参数
 */
function putRequest(path, params) {
  return axios({
    method: 'put',
    url: `${baseUrl}${path}`,
    data: JSON.stringify(params)
  })
}

/**
 * 发送DELETE请求
 * @param path 地址
 * @param params 参数
 */
function deleteRequest(path, params) {
  return axios({
    method: 'delete',
    url: `${baseUrl}${path}`,
    params
  })
}
