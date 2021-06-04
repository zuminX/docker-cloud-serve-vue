import {
  getData,
  removeData,
  setData
} from '@/utils/sessionStorageUtils'
import { resetRouter } from '@/router'
import { logout } from '@/api/auth/logoutAPI'

const state = {
  user: getData('user'),
  token: getData('token')
}

const mutations = {
  /**
   * 设置用户
   */
  SET_USER(state, user) {
    state.user = user
    setData('user', user)
  },
  /**
   * 设置令牌
   */
  SET_TOKEN(state, token) {
    state.token = token
    setData('token', token)
  },
  SET_AVATAR: (state, avatar) => {
    state.user.avatar = avatar
    setData('user', state.user)
  },
  /**
   * 重置状态
   */
  RESET_STATE(state) {
    state.user = ''
    state.token = ''
  }
}

const actions = {
  /**
   * 账户登出
   */
  async logout({ commit, state }) {
    await logout()
    removeData('token')
    removeData('user')
    resetRouter()
    commit('RESET_STATE')
  }
}

export default {
  state,
  mutations,
  actions,
  modules: {}
}
