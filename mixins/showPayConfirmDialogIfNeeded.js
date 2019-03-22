import { mapState, mapMutations, mapGetters } from 'vuex'

import fp from 'lodash/fp'
import store2 from 'store2'
import commonPay from '@/mixins/commonPay'
// 当从如 http://192.168.3.177:3333/?aim=pay&result=0&msg=%E8%AE%A2%E5%8D%95%E4%B8%8D%E5%AD%98%E5%9C%A8    进入首页的时候就会进入到对应页面并且显示相应提示
export default {
  mixins: [commonPay],
  data() {
    return {
      pay: undefined,
      yeDoneHasCheck: false
    }
  },
  computed: {
    ...mapState('page', ['pageCallback']),
    ...mapGetters('ua', ['isYeDone']),
    payStatus() {
      return fp.get('result', this.pageCallback)
    }
  },
  mounted() {
    this.pay = store2('pay')
    setTimeout(() => {
      if (this.isYeDone && this.pay) {
        this.checkPayStatus()
        // this.clearStore()
      } else {
        this.showPayConfirmDialogIfNeeded()
      }
    }, 400)
  },
  methods: {
    ...mapMutations('page', ['MERGE_PAGE_STATE']),
    // 清除vuex和localStorage里面的相关数据
    clearStore() {
      this.MERGE_PAGE_STATE({
        key: 'pageCallback',
        value: {
          aim: undefined,
          result: undefined,
          msg: undefined
        }
      })
      store2.remove('pay')
    },
    // 按需弹出支付结果提示信息
    showPayConfirmDialogIfNeeded() {
      console.log('showPayConfirmDialogIfNeeded')
      if (!this.pay || (!this.isYeDone && this.payStatus === undefined)) {
        console.log('不需要弹出支付结果提示', this.pay, this.payStatus)
      } else if (this.payStatus === '1') {
        this.$toast({
          type: 'correct',
          txt: '支付成功'
        })
      } else {
        this.createPayConfirmDialog()
      }
      this.clearStore()
    },
    createPayConfirmDialog() {
      this.$createDialog({
        type: 'confirm',
        title: '请确认此次支付是否已完成',
        confirmBtn: {
          text: '已完成支付',
          active: true
        },
        cancelBtn: {
          text: '支付遇到问题'
        },
        onConfirm: () => {
          this.checkPayStatus()
        },
        onCancel: () => {
          this.$router.go(0)
        }
      }).show()
    },
    // 校验支付结果
    checkPayStatus() {
      const loading = this.$toast({
        type: 'loading',
        txt: '正在校验支付结果...',
        time: 0
      })
      this.$once('hook:beforeDestroy', () => {
        loading.hide()
      })
      this.$api
        .getOrder({
          order_id: fp.get('orderId', this.pay)
        })
        .then(({ data }) => {
          const { status_value, server_im_id, rec_time_avg } = data.data || {}
          console.log({ data })
          if (status_value === 2) {
            // 支付是成功的
            loading.hide()
            let paySuccessDialog
            // goToChat
            const goToChat = () => {
              paySuccessDialog.hide()
              if (server_im_id) {
                this.$router.push(`/msgCenter/chat/${server_im_id}`)
              } else {
                this.$router.go(0)
              }
            }
            // 显示支付成功提示并跳转到跳转到聊天页面
            paySuccessDialog = this.$createPaySuccessDialog({
              $props: {
                title: `大神平均接单时长为${parseInt(rec_time_avg / 60)}分钟`
              },
              $events: {
                maskClick: () => {
                  goToChat()
                }
              }
            }).show()
            // 5秒后跳转到聊天页面
            setTimeout(() => {
              goToChat()
            }, 5000)
            this.clearStore()
          } else {
            // 支付是失败的
            loading.hide()
            if (this.isYeDone && !this.yeDoneHasCheck) {
              this.showPayConfirmDialogIfNeeded()
              this.yeDoneHasCheck = true
            } else {
              this.$toast({
                type: 'warn',
                txt: '支付失败'
              })
              this.$router.go(0)
            }
          }
        })
        .catch(error => {
          loading.hide()
          // this.$fetchCatch(error)
        })
    }
  }
}
