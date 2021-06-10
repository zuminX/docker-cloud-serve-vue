import {
  getNicknameById,
  listNicknameById
} from '@/api/ums/infoAPI'

/**
 * 是否处于开发环境
 * @return {boolean} 若处于开发环境则返回true，否则返回false
 */
export const isDev = () => {
  return process.env.NODE_ENV === 'development'
}

/**
 * 是否开启Mock
 * @return {boolean} 若开启则返回true，否则返回false
 */
export const isMock = () => {
  return process.env.VUE_APP_MOCK === 'true'
}

/**
 * 获取项目访问URL
 */
export const getUrl = () => {
  return isDev() ? 'http://www.dockercloud.com' : 'http://dockercloud.cn1.utools.club'
}

/**
 * 为对象添加用户昵称属性
 * @param object 对象
 * @return {Promise<*>} 添加用户昵称的对象
 */
export const appendNickname = async(object) => {
  const userId = object.userId
  if (!userId) {
    throw new Error('Missing UserId')
  }
  object.nickname = ''
  const { success, data } = await getNicknameById(userId)
  if (success) {
    object.nickname = data
  }
  return object
}

/**
 * 为列表中的对象添加用户昵称属性
 * @param list 列表
 * @return {Promise<*>} 列表元素添加用户昵称
 */
export const batchAppendNickname = async(list) => {
  const userIdList = list.map(object => object.userId)
  if (userIdList.length !== list.length) {
    throw new Error('Not Matched list')
  }
  for (const item of list) {
    item.nickname = ''
  }
  const { success, data } = await listNicknameById(userIdList)
  if (success) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      list[i].nickname = data[i]
    }
  }
  return list
}
