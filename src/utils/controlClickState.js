// 禁止按钮短时间内重复点击
export default {
  install(Vue) {
    Vue.directive('preventClick', {
      inserted(button, bind) {
        button.addEventListener('click', () => {
          if (!button.disabled) {
            button.disabled = true
            setTimeout(() => {
              button.disabled = false
            }, 1000)
          }
        })
      }
    })
  }
}
