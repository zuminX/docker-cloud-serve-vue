/**
 * 向storage中设置数据
 * @param key 键
 * @param value 值
 */
export const setData = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从storage中取出数据
 * @param key 键
 */
export const getData = (key) => {
  const data = window.sessionStorage.getItem(key)
  return data ? JSON.parse(data) : data
}

/**
 * 从storage中移除数据
 * @param key 键
 */
export const removeData = (key) => {
  window.sessionStorage.removeItem(key)
}
