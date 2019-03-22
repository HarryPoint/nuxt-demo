import { mapState, mapMutations, mapGetters } from 'vuex'

import fp from 'lodash/fp'
import store2 from 'store2'
import commonRecharge from '@/mixins/commonRecharge.js'
// 当从如 http://192.168.3.177:3333/?aim=recharge&result=0&msg=%E8%AE%A2%E5%8D%95%E4%B8%8D%E5%AD%98%E5%9C%A8    进入首页的时候就会进入到对应页面并且显示相应提示
export default {
  mixins: [commonRecharge],
  data() {
    return {
      recharge: undefined
    }
  },
  computed: {
    ...mapState('page', ['pageCallback']),
    ...mapGetters('ua', ['isYeDone']),
    rechargeStatus() {
      return fp.get('result', this.pageCallback)
    }
  },
  mounted() {
    if (this.isYeDone) return
    setTimeout(() => {
      this.showRechargeConfirmDialogIfNeeded()
    }, 400)
  },
  methods: {
    ...mapMutations('page', ['MERGE_PAGE_STATE']),
    // 清除vuex和localStorage里面的相关数据
    clearStore() {
      console.log('store2.remove("recharge")')
      this.MERGE_PAGE_STATE({
        key: 'pageCallback',
        value: {
          aim: undefined,
          result: undefined,
          msg: undefined
        }
      })
      store2.remove('recharge')
    },
    // 按需弹出充值结果提示信息
    showRechargeConfirmDialogIfNeeded() {
      this.recharge = store2('recharge')
      console.log({
        recharge: this.recharge,
        isYeDone: this.isYeDone,
        rechargeStatus: this.rechargeStatus
      })
      // 不需要弹出充值结果提示
      if (
        !this.recharge ||
        (!this.isYeDone && this.rechargeStatus === undefined)
      ) {
        console.log('不需要弹出充值结果提示')
      } else {
        if (this.rechargeStatus === '1') {
          this.$toast({
            type: 'correct',
            txt: '充值成功'
          })
        } else {
          this.createRechargeConfirmDialog()
        }
      }
      this.clearStore()
    },
    // 提示用户确认是否支付成功
    createRechargeConfirmDialog() {
      this.$createDialog({
        type: 'confirm',
        title: '请确认此次支付是否已完成',
        confirmBtn: {
          text: '已完成支付',
          active: true
        },
        cancelBtn: {
          text: '支付遇到问题,重新支付'
        },
        onConfirm: () => {
          this.checkRechargeStatus({
            errorCallBack: () => {
              this.$createDialog({
                type: 'alert',
                title: '充值失败',
                content: '请您重新充值'
              }).show()
            }
          })
        },
        onCancel: () => {
          this.checkRechargeStatus({
            errorCallBack: () => {
              this.commonRecharge({
                total_fee: this.recharge.total_fee,
                pay_way: this.recharge.pay_way,
                activity_id: this.recharge.activity_id
              })
            }
          })
        }
      }).show()
    },
    // 校验支付结果
    checkRechargeStatus({ errorCallBack = () => {} }) {
      const loading = this.$toast({
        type: 'loading',
        txt: '正在校验支付结果...',
        time: 0
      })
      this.$once('hook:beforeDestroy', () => {
        loading.hide()
      })
      this.$api
        .getRecharge({
          recharge_id: this.recharge.id
        })
        .then(({ data }) => {
          const status = fp.get('data.status', data)
          if (status === 1) {
            // 支付是成功的
            loading.hide()
            this.$toast({
              type: 'correct',
              txt: '支付成功'
            })
          } else if (status === 0) {
            // 支付是失败的
            loading.hide()
            errorCallBack()
          }
        })
        .catch(this.$fetchCatch)
    }
  }
}
