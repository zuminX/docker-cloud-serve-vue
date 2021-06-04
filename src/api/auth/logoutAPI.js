import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * OAuthAPI的基地址
 */
const baseUrl = 'auth/oauth'

const logoutAPI = {
  logout: new APIInfo('logout', baseUrl, 'delete')
}

/**
 * 获取验证码
 */
export const logout = () => {
  return request(logoutAPI.logout)
}
