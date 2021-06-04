
export const constStore = {
  data: {
  },
  /**
   * 只在第一次调用时实际发起请求，之后调用都直接返回缓存值
   * @param request 请求方法
   * @param dataName 数据名
   * @returns {Promise<*>} 请求数据
   * @private
   */
  async _singletonRequest(request, dataName) {
    if (!this.data[dataName]) {
      const { success, data } = await request()
      if (success) {
        this.data[dataName] = data
      }
    }
    return this.data[dataName]
  }
}
