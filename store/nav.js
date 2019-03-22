import fp from 'lodash/fp'

// 储存接口/nav.json的数据....先放在这里,好像没必要使用这个store
export const state = () => ({
  list: []
})

export const mutations = {
  SET_LIST(state, list = []) {
    state.list = list
  }
}

export const actions = {
  // 请求list的数据
  fetchList({ commit }) {
    return this.$api.getNav().then(res => {
      commit('SET_USER', fp.get('data.data', res) || {})
      return res
    })
  },
  // 有必要再请求数据
  fetchListIfNeeded({ state, dispatch }) {
    if (state.length) {
      return Promise.resolve()
    } else {
      return dispatch('fetchList')
    }
  }
}
