/**
 * Mock信息类
 */
class MockInfo {
  _apiInfo;
  _param

  constructor(apiInfo, param) {
    this._apiInfo = apiInfo;
    this._param = param;
  }

  get apiInfo() {
    return this._apiInfo;
  }

  get param() {
    return this._param;
  }
}

module.exports = {
  MockInfo
}
