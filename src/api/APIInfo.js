/**
 * API信息类
 */
export class APIInfo {
  _url;
  _type

  constructor(url, baseUrl, type = 'get') {
    this._url = `${baseUrl}/${url}`
    this._type = type;
  }

  get path() {
    return `/${this._url}`;
  }

  get url() {
    return this._url;
  }

  get type() {
    return this._type;
  }
}
