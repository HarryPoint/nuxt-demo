import fp from 'lodash/fp'

export const state = () => ({
  // 数据结构和后端接口一致
  user: {},
  // 是否是微信环境
  isWx: false
})

export const mutations = {
  // 设置user的值
  SET_USER(state, user) {
    state.user = user
  },
  // 设置是否是微信环境
  SET_IS_WX(state, isWx = false) {
    state.isWx = isWx
  }
}

export const getters = {
  // 假设用户有权限的条件就是user不为空对象
  authentication({ user }) {
    return !!fp.size(user)
  },
  // 是否需要绑定手机号,用户在微信中已经微信登录但未绑定手机号就需要绑定手机号
  isNeedBindPhone({ isWx, user }) {
    return isWx && user.mobilephone ? true : true
  }
}

export const actions = {
  // 使用短信验证码登录
  loginBySMS({ commit }, { mobilephone, captcha }) {
    return this.$api
      .loginBySMS({
        mobilephone,
        captcha
      })
      .then(res => {
        commit('SET_USER', fp.get('data.data', res) || {})
        return res
      })
  },
  // 请求用户信息
  fetchUser({ commit }) {
    return this.$api.getMember({ commit }).then(res => {
      commit('SET_USER', fp.get('data.data', res) || {})
      return res
    })
  }
}
