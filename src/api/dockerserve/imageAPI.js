import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 镜像API的基地址
 */
const baseUrl = 'dockerserve/image'

const infoAPI = {
  build: new APIInfo('build', baseUrl, 'file'),
  searchCurrentUser: new APIInfo('list', baseUrl),
  searchShare: new APIInfo('listShare', baseUrl),
  search: new APIInfo('search', baseUrl),
  modify: new APIInfo('modify', baseUrl, 'post')
}

export const buildImage = (form) => {
  return request(infoAPI.build, form)
}

/**
 * 搜索当前用户的镜像
 */
export const searchCurrentUserImageForPage = (name, page, pageSize) => {
  return request(infoAPI.searchCurrentUser, { name, page, pageSize })
}

/**
 * 搜索共享的镜像
 */
export const searchShareImageForPage = (name, page, pageSize) => {
  return request(infoAPI.searchShare, { name, page, pageSize })
}

/**
 * 搜索共享的镜像
 */
export const searchImage = (name) => {
  return request(infoAPI.search, { name })
}

/**
 * 修改镜像
 */
export const editImage = (form) => {
  return request(infoAPI.modify, form)
}

