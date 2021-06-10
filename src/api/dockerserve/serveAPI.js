import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 应用服务API的基地址
 */
const baseUrl = 'dockerserve/serve'

const infoAPI = {
  search: new APIInfo('search', baseUrl),
  info: new APIInfo('infoByApplication', baseUrl),
  basicInfo: new APIInfo('basicInfo', baseUrl),
  accessToken: new APIInfo('accessToken', baseUrl)
}

/**
 * 搜索共享的服务
 */
export const searchServe = (name) => {
  return request(infoAPI.search, { name })
}

/**
 * 获取服务的信息
 * @param application 应用ID
 */
export const getServeInfo = (application) => {
  return request(infoAPI.info, { application })
}

/**
 * 获取所有服务的简要信息
 */
export const getServeBasicInfo = () => {
  return request(infoAPI.basicInfo)
}

/**
 * 获取访问服务的路径令牌
 */
export const getAccessToken = (serve, port) => {
  return request(infoAPI.accessToken, { serve, port })
}
