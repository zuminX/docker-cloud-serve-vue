import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 用户仪表板API的基地址
 */
const baseUrl = 'dockerserve/dashboard'

const infoAPI = {
  statistics: new APIInfo('statistics', baseUrl)
}

/**
 * 获取当前用户的统计信息
 */
export const getStatistics = () => {
  return request(infoAPI.statistics)
}
