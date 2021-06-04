const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 安全相关API的基地址
 */
const baseUrl = 'security'

const securityAPI = {
  login: new APIInfo('login', baseUrl, 'post'),
  captchaImage: new APIInfo('captchaImage', baseUrl),
  logout: new APIInfo('logout', baseUrl, 'post')
}

module.exports = [
  new MockInfo(securityAPI.login, () => {
    return require('./data/login.json')
  }),
  new MockInfo(securityAPI.captchaImage, () => {
    return require('./data/captchaImage.json')
  }),
  new MockInfo(securityAPI.logout, () => {
    return require('./data/logout.json')
  })
]
