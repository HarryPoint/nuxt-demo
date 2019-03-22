// 修改store中user.isWx的值,用于app判断是否是微信
export default ({ store }) => {
  if (process.client) {
    const { isWx } = require('@/plugins/utils/isWx.js')
    if (isWx()) {
      store.commit('user/SET_IS_WX', true)
    } else {
      store.commit('user/SET_IS_WX', false)
    }
  }
}
