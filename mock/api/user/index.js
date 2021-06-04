const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 用户API的基地址
 */
const baseUrl = 'user'

const userAPI = {
  register: new APIInfo('register', baseUrl, 'post')
}

module.exports = [
  new MockInfo(userAPI.register, () => {
    return require('../../data/voidSuccess.json')
  })
]
