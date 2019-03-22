export const actions = {
  async nuxtServerInit({ commit, getters }, { req, route, redirect }) {
    commit('ua/SET_USER_AGENT', req.headers['user-agent'] || '')
    commit('ua/SET_INITIAL_HOST', req.headers['host'] || '')
    //  判断是不是PC访问
    const isPc = getters['ua/isPC']
    if (isPc) {
      console.log('是pc端,跳转到pc端页面')
      let pcUrl =
        process.env.API_FORMAL === 'apiFormal'
          ? 'http://pei.yay.com.cn/'
          : 'http://test.pei.yay.com.cn/'
      // 技能详情页
      if (route.name === 'skill-type-id') {
        pcUrl = `${pcUrl}${route.params.type}/${route.params.id}.html`
      }
      console.log(pcUrl, { route })
      redirect(pcUrl)
      return
    }
    // 判断是不是微信,以后业务上的代码都从直接getters['ua/isWx']取得是不是微信的信息
    const isWx = getters['ua/isWx']
    commit('user/SET_IS_WX', isWx)
    // 请求登录用户数据并填充到store中,如果不能请求到用户数据说明没有登录
    try {
      const { data } = await this.$api.getMember()
      commit('user/SET_USER', data.data || {})
    } catch (error) {
      commit('user/SET_USER', {})
    }
  }
}
