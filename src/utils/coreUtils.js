import {
  getNicknameById,
  listNicknameById
} from '@/api/ums/infoAPI'

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
    for (let i = 0; i < data.length; i++) {
      list[i].nickname = data[i]
    }
  }
  return list
}
