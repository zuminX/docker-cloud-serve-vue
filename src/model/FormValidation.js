/**
 * 表单校验类
 */
export class FormValidation {
  /**
   * 校验表单
   * @param selector ID选择器
   * @returns {boolean} 合法返回true，否则返回false
   */
  static validateForm(selector) {
    const $form = $(`#${selector}`)
    $form.form('validate form')
    return $form.form('is valid')
  }

  /**
   * 初始化表单校验
   * @param selector ID选择器
   * @param fields 字段校验规则
   * @param successCallback 验证成功的回调方法
   */
  static init(selector, fields, successCallback) {
    $(`#${selector}`).form({
      transition: 'slide down',
      fields,
      /**
       * 验证成功后的回调方法
       */
      onSuccess() {
        if (successCallback) {
          successCallback()
        }
        // 防止表单验证成功后自动发送GET请求
        return false
      }
    })
  }

  /**
   * 非空规则
   * @param fieldName 字段名
   */
  static notEmptyRule(fieldName) {
    return this._getTypeAndPrompt('empty', `${fieldName}不能为空`)
  }

  /**
   * 限制最大长度规则
   * @param fieldName 字段名
   * @param maxLength 最大长度
   */
  static maxLengthRule(fieldName, maxLength) {
    return this._getTypeAndPrompt(`maxLength[${maxLength}]`, `${fieldName}不能多于${maxLength}个字符`)
  }

  /**
   * 普通字符串规则
   * @param fieldName 字段名
   * @param minLength 最小长度
   * @param maxLength 最大长度
   */
  static normalStringRule({ fieldName, minLength, maxLength }) {
    return this._getRules([
      this._getTypeAndPrompt(`minLength[${minLength}]`, `${fieldName}不能少于${minLength}个字符`),
      this._getTypeAndPrompt(`maxLength[${maxLength}]`, `${fieldName}不能多于${maxLength}个字符`),
      this._getTypeAndPrompt('regExp[/^[0-9a-zA-Z]+$/]', `${fieldName}只能是数字和字母的组合`)
    ])
  }

  /**
   * 名称字符串规则
   * @param fieldName 字段名
   * @param minLength 最小长度
   * @param maxLength 最大长度
   */
  static nameStringRule({ fieldName, minLength, maxLength }) {
    return this._getRules([
      this._getTypeAndPrompt(`minLength[${minLength}]`, `${fieldName}不能少于${minLength}个字符`),
      this._getTypeAndPrompt(`maxLength[${maxLength}]`, `${fieldName}不能多于${maxLength}个字符`),
      this._getTypeAndPrompt('regExp[/^[0-9a-zA-Z-]+$/]', `${fieldName}只能包含数字、字母或短横杠(-)`)
    ])
  }

  /**
   * 镜像版本校验规则
   */
  static get imageVersionRules() {
    $.fn.form.settings.rules.version = function(value) {
      if (!value) {
        return false
      }
      if (value === 'latest') {
        return true
      }
      const versionNumber = value.split('\\.')
      if (versionNumber.length !== 3) {
        return false
      }
      for (const number of versionNumber) {
        if (!Number.isInteger(number) || Number.parseInt(number) < 0) {
          return false
        }
      }
      return true
    }
    return this._getRules([
      this._getTypeAndPrompt('version', `版本号必须为latest或X.Y.Z的形式（其中X、Y、Z为正整数）`)
    ])
  }

  /**
   * 用户名校验规则
   */
  static get usernameRules() {
    return FormValidation.normalStringRule({ fieldName: '用户名', minLength: 4, maxLength: 16 })
  }

  /**
   * 密码校验规则
   */
  static get passwordRules() {
    return FormValidation.normalStringRule({ fieldName: '密码', minLength: 6, maxLength: 32 })
  }

  /**
   * 重复密码校验规则
   */
  static get repeatPasswordRules() {
    return this._getRules([
      this._getTypeAndPrompt('match[password]', '重复输入的密码与密码不一致')
    ])
  }

  /**
   * 昵称校验规则
   */
  static get nicknameRules() {
    return this._getRules([
      this._getTypeAndPrompt('minLength[4]', '昵称的长度不能小于4位'),
      this._getTypeAndPrompt('maxLength[16]', '昵称的长度不能大于16位')
    ])
  }

  /**
   * 验证码校验规则
   */
  static get captchaRules() {
    return FormValidation.normalStringRule({ fieldName: '验证码', minLength: 4, maxLength: 4 })
  }

  /**
   * 获取rules对象
   * @param rules 校验规则
   * @returns {{rules: *[]}} rules对象
   * @private
   */
  static _getRules(rules = []) {
    return { rules }
  }

  /**
   * 获取校验类型和校验失败时的提示
   * @param type 校验类型
   * @param prompt 校验失败时的提示
   * @returns {{type: String, prompt: String}} 包含type和prompt属性的对象
   * @private
   */
  static _getTypeAndPrompt(type, prompt) {
    return { type, prompt }
  }
}
