import qs from 'qs'
import fp from 'lodash/fp'

export default ({ app, store }) => {
  const { $axios } = app
  // 客户端中axios的拦截器配置，参考https://axios.nuxtjs.org/helpers
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data)
  })
  $axios.onResponseError(error => {
    console.log('axios拦截器检测到错误')
    const code = error.code || fp.get('response.data.err_code', error)
    // 没有登录的话,清除当前用户
    if (code === 'UN_LOGIN') {
      console.log('没有登录的话,清除当前用户')
      store.commit('user/SET_USER', {})
    }
  })
}
