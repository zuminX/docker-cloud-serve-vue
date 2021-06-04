/**
 * 显示弹出层
 * @param selector ID选择器
 */
export const showModal = (selector) => {
  $(`#${selector}`).modal('setting', 'closable', false).modal('show')
}
