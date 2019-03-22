import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['authentication']),
    ...mapState('user', ['isWx', 'user'])
  },
  mounted() {
    console.log('mounted')
    // 如果是微信环境没有登录就先静默使用微信登录
    if (!this.authentication && this.isWx) {
      window.location.href = this.$api.wxLogin
      return
    }
    // 防止报TypeError: Cannot read property 'data' of undefined.不知道为什么放到this.$nextTick里面都不行
    const timer = setTimeout(() => {
      if (
        this.$store.state.user.isWx &&
        this.$store.state.user.user.un_bind_phone !== 0
      ) {
        // 在微信显示绑定手机号弹窗
        this.showBindPhoneDialogIfNeeded()
        // this.showLoginDialogIfNeeded()
      } else {
        // 在其他环境显示手机号登录弹窗
        this.showLoginDialogIfNeeded()
      }
    }, 400)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer)
    })
  },
  watch: {
    authentication() {
      this.showLoginDialogIfNeeded()
    }
  },
  methods: {
    // 显示登录弹窗如果有需要的话
    showLoginDialogIfNeeded() {
      // 在微信里面永远不会显示登录弹窗
      // if (this.$store.state.user.isWx) return
      console.log('showLoginDialogIfNeeded')
      if (this.authentication) {
        console.log('已登录')
        this.loginDialog && this.loginDialog.hide()
        this.loginDialog = null
      } else {
        console.log('未登录')
        if (this.loginDialog) {
          return
        }
        this.loginDialog = this.$createLoginDialog().show()
      }
    },
    // 显示绑定手机号弹窗如果有需要的话
    showBindPhoneDialogIfNeeded() {
      // 在微信里永远不会显示该弹窗
      if (!this.$store.state.user.isWx) return
      // 需要绑定手机号
      if (this.$store.getters['user/isNeedBindPhone']) {
        this.$createBindPhoneDialog().show()
      }
    }
  }
}
