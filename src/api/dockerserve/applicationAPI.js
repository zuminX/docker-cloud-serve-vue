import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 应用API的基地址
 */
const baseUrl = 'dockerserve/application'

const infoAPI = {
  searchCurrentUser: new APIInfo('list', baseUrl),
  searchShare: new APIInfo('listShare', baseUrl),
  save: new APIInfo('save', baseUrl, 'post'),
  start: new APIInfo('start', baseUrl),
  stop: new APIInfo('stop', baseUrl),
  detail: new APIInfo('detail', baseUrl)
}

/**
 * 搜索当前用户的应用
 */
export const searchCurrentUserApplication = (name, page, pageSize) => {
  return request(infoAPI.searchCurrentUser, { name, page, pageSize })
}

/**
 * 搜索共享的应用
 */
export const searchShareApplication = (name, page, pageSize) => {
  return request(infoAPI.searchShare, { name, page, pageSize })
}

/**
 * 保存应用
 */
export const saveApplication = (form) => {
  return request(infoAPI.save, form)
}

/**
 * 启动应用
 */
export const startApplication = (application) => {
  return request(infoAPI.start, { application })
}

/**
 * 停止应用
 */
export const stopApplication = (application) => {
  return request(infoAPI.stop, { application })
}

/**
 * 获取应用的详细信息
 */
export const detailApplication = (application) => {
  return request(infoAPI.detail, { application })
}
