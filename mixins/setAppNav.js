// 混入根据appNavTitle设置app的nav
export default {
  watch: {
    appNavTitle: {
      handler(val) {
        if (
          process.client &&
          this.$route.name === 'skill-type-id' &&
          window.history.length === 1
        ) {
          // 如果直接进入到技能详情页就返回到首页
          this.setAppNav(
            val,
            document.location.protocol + '//' + window.location.host
          )
        } else {
          this.setAppNav(val)
        }
      },
      immediate: true
    }
  },
  methods: {
    setAppNav(appNavTitle = '', url) {
      // 不是客户端直接return,避免出错
      if (process.server) return
      console.log('setAppNav:来自混入', { appNavTitle, url })
      // 这个时候获取是不是悦动不太准确
      // const isYeDone = this.$store.getters['ua/isYeDone']
      const isAndroid = this.$store.getters['ua/isAndroid']
      const isIOS = this.$store.getters['ua/isIOS']
      let str = ''
      if (url) {
        str = url
      } else {
        str = window.history.state === null ? 'goBack' : 'backHis'
      }
      str = `${appNavTitle} ${str}`
      try {
        if (isAndroid) {
          window.Android.setNav(str)
        } else if (isIOS) {
          window.webkit.messageHandlers.setNav.postMessage(str)
        }
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
