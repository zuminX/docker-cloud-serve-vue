import { APIInfo } from '@/api/APIInfo'
import { request } from '@/api'

/**
 * 用户资源API的基地址
 */
const baseUrl = 'ums/profile'

const profileAPI = {
  uploadAvatar: new APIInfo('uploadAvatarPolicy', baseUrl, 'post')
}

/**
 * 获取上传头像的凭证
 */
export const getUploadAvatarPolicy = () => {
  return request(profileAPI.uploadAvatar)
}
