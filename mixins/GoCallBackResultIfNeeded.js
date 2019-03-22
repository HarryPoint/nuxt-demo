import { mapMutations } from 'vuex'
import store2 from 'store2'

export default {
  beforeMount() {
    console.log('showCallBackResult:支付充值回调检查')
    const { aim, result, msg } = this.$route.query
    const recharge = store2('recharge')
    const pay = store2('pay')
    console.log({
      aim,
      pay,
      recharge
    })
    // 先操作store
    this.MERGE_PAGE_STATE({
      key: 'pageCallback',
      value: { aim, result, msg }
    })
    if (aim === 'recharge' && recharge) {
      // 满足这个条件认为是充值操作的回调链接
      // 回到之前充值的页面
      this.$router.push(recharge.url)
      console.log('showCallBackResult:回到之前充值的页面')
    } else if (aim === 'myOrderList' && pay) {
      // 满足这个条件认为是充值操作的回调链接
      // 回到之前的支付页面
      this.$router.push(pay.url)
      console.log('showCallBackResult:回到之前的支付页面')
    } else {
      // 否则清除相关数据
      this.MERGE_PAGE_STATE({
        key: 'pageCallback',
        value: {
          aim: undefined,
          result: undefined,
          msg: undefined
        }
      })
      // store2.remove('recharge')
      console.log('showCallBackResult:什么都不做')
      this.$router.replace('/')
    }
  },
  methods: {
    ...mapMutations('page', ['MERGE_PAGE_STATE'])
  }
}
