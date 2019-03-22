import fp from 'lodash/fp'
import store2 from 'store2'
import { mapState, mapGetters } from 'vuex'

// 通用的充值方法,会将把相关信息存在localStorage里面
export default {
  computed: {
    ...mapState('page', ['pageCallback']),
    ...mapGetters('ua', ['isYeDone', 'isAndroid', 'isIOS']),
    rechargeStatus() {
      return fp.get('result', this.pageCallback)
    }
  },
  methods: {
    commonRecharge({ total_fee, pay_way, activity_id }) {
      // 注册悦动的充值的回调
      if (this.isYeDone) {
        window.handlePayBack = () => {
          console.log('handlePayBack:充值')
          const recharge = store2('recharge')
          if (!recharge.id) return
          const loading = this.$toast({
            type: 'loading',
            txt: '正在校验支付结果...',
            time: 0
          })
          this.$api
            .getRecharge({
              recharge_id: recharge.id
            })
            .then(({ data }) => {
              const status = fp.get('data.status', data)
              if (status === 1) {
                console.log('充值是成功的')
                // 支付是成功的
                loading.hide()
                this.$toast({
                  type: 'correct',
                  txt: '支付成功'
                })
                this.$router.push('/userCenter')
                store2.remove('recharge')
              } else if (status === 0) {
                console.log('充值是失败的')
                // 支付是失败的
                loading.hide()
                this.showRechargeConfirmDialogIfNeeded &&
                  this.showRechargeConfirmDialogIfNeeded()
              }
            })
            .catch(error => {
              loading.hide()
              this.$fetchCatch(error)
              store2.remove('recharge')
            })
        }
      }
      const loading = this.$toast({
        type: 'loading',
        txt: '正在拉起支付...',
        time: 0
      })
      this.$api
        .recharge({
          total_fee,
          pay_way,
          activity_id
        })
        .then(({ data }) => {
          const payUrl = fp.get('data.payInfo', data)
          const rechargeId = fp.get('data.rechargeInfo._id', data)
          if (payUrl) {
            // 支付记录相关信息存在localStorage里面备用
            store2('recharge', {
              id: rechargeId,
              url: this.$route.path,
              hasShowTip: false,
              total_fee,
              pay_way,
              activity_id
            })
            // 悦动
            if (this.isYeDone) {
              console.log('是悦动:进行悦动支付')
              if (this.isAndroid) {
                window.Android.openURL(payUrl)
              } else if (this.isIOS) {
                window.webkit.messageHandlers.openURL.postMessage(payUrl)
              }
            } else {
              location.href = payUrl
            }
          } else {
            this.$toast({
              type: 'error',
              txt: '拉起支付失败,请稍候再试'
            })
          }
        })
        .catch(this.$fetchCatch)
        .finally(() => {
          loading.hide()
        })
    }
  }
}
