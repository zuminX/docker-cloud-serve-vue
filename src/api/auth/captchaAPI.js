import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 验证码API的基地址
 */
const baseUrl = 'auth/captcha'

const captchaAPI = {
  captchaImage: new APIInfo('captchaImage', baseUrl)
}

/**
 * 获取验证码
 */
export const captchaImage = () => {
  return request(captchaAPI.captchaImage)
}
