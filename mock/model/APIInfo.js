/**
 * API信息类
 */
class APIInfo {
  _url;
  _type;
  _regExp;

  constructor(url, baseUrl, type = 'get', regExp = false) {
    this._url = `${baseUrl}/${url}`
    this._type = type;
    this._regExp = regExp
  }

  get path() {
    const path = `/${this._url}`
    return this._url ? RegExp(path) : path;
  }

  get url() {
    return this._url;
  }

  get type() {
    return this._type;
  }
}

module.exports = {
  APIInfo
}
