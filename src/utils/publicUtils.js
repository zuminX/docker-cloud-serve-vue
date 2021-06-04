/**
 * 设置动画
 * @param element 元素
 * @param animation 动画名字
 * @param prefix animate前缀
 */
export const animateCSS = (element, animation, prefix = 'animate__') => {
  return new Promise((resolve, reject) => {
    // 拼接动画名
    const animationName = `${prefix}${animation}`
    // 获取节点
    const node = document.querySelector(element)
    // 添加class
    node.classList.add(`${prefix}animated`, animationName)

    // 处理动画结束后的事件
    function handleAnimationEnd() {
      // 移除添加的class
      node.classList.remove(`${prefix}animated`, animationName)
      // 移除动画结束后的事件监听器
      node.removeEventListener('animationend', handleAnimationEnd)
      resolve('Animation ended')
    }

    node.addEventListener('animationend', handleAnimationEnd)
  })
}

/**
 * 显示成功的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showSuccessToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'success',
      position,
      showIcon: 'checkmark',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 显示警告的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showWarnToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'warning',
      position,
      showIcon: 'exclamation',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 显示错误的提示消息
 * @param message 消息内容
 * @param displayTime 显示时间
 * @param position 位置
 */
export const showErrorToast = ({ message, displayTime = 5, position = 'top center' }) => {
  $('body')
    .toast({
      class: 'error',
      position,
      showIcon: 'remove',
      showProgress: 'bottom',
      displayTime: displayTime * 1000,
      message
    })
}

/**
 * 限制字符串的长度
 * @param str 字符串
 * @param maxLength 最大长度
 */
export const limitLength = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str
  }
  return str.substring(0, maxLength) + '...'
}

/**
 * 深拷贝数据
 * @param data 数据
 * @returns {string} 拷贝数据
 */
export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 获取二维number型数组
 * @returns {number[][]} 二维number型数组
 */
export const getTwoDimeNumArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, 0)
}

/**
 * 获取二维boolean型数组
 * @returns {boolean[][]} 二维boolean型数组
 */
export const getTwoDimeBoolArray = (row = 9, column = 9) => {
  return getTwoDimeArray(row, column, false)
}

export const getFileType = (fileName) => {
  const index = fileName.lastIndexOf('.')
  return index === -1 ? '' : fileName.substring(index + 1)
}

export const getFileName = (fileName) => {
  const index = fileName.lastIndexOf('.')
  return index === -1 ? '' : fileName.substring(0, index)
}

/**
 * 选择性赋值
 * @param source 源对象
 * @param target 目标对象
 */
export const selectiveAssign = (source, target) => {
  for (const key of Object.keys(target)) {
    target[key] = source[key]
  }
}

/**
 * 获取二维数组
 * @param row 行
 * @param column 列
 * @param initData 初始数据啊
 * @returns {[]} 二维数组
 */
const getTwoDimeArray = (row, column, initData) => {
  const result = []
  for (let i = 0; i < row; i++) {
    result.push([])
    for (let j = 0; j < column; j++) {
      result[i].push(initData)
    }
  }
  return result
}
