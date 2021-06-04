const Mock = require('mockjs')

const mockAPI = (mockInfo) => {
  const apiInfo = mockInfo.apiInfo
  Mock.mock(apiInfo.path, apiInfo.type, mockInfo.param)
}

module.exports = {
  mockAPI
}
