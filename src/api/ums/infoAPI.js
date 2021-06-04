import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 用户信息API的基地址
 */
const baseUrl = 'ums/info'

const infoAPI = {
  getBasicInfo: new APIInfo('basic', baseUrl),
  listNickname: new APIInfo('listNickname', baseUrl, 'post'),
  getNickname: new APIInfo('nickname', baseUrl)
}

/**
 * 获取用户的基本信息
 */
export const getBasicInfo = () => {
  return request(infoAPI.getBasicInfo)
}

/**
 * 批量获取用户的昵称
 */
export const listNicknameById = (userIdList) => {
  return request(infoAPI.listNickname, userIdList)
}

/**
 * 获取用户的昵称
 */
export const getNicknameById = (userId) => {
  return request(infoAPI.getNickname, { userId })
}

