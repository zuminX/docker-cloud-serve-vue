const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,
  user: state => state.user.user,
  token: state => state.user.token,
  avatar: state => state.user.user.avatar,
  /**
   * 获取角色名列表
   * @param state 状态对象
   * @returns {*} 角色名列表
   */
  roleNameList(state) {
    const roleList = state.user.user.roleList
    // 去除角色名的前缀ROLE_
    return roleList.map(role => role.name.slice(5))
  }
}

export default getters
