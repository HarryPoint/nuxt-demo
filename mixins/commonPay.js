import { mapState, mapGetters } from 'vuex'
import fp from 'lodash/fp'
import store2 from 'store2'

// 通用的支付方法,拥有完成的支付流程,会将把相关信息存在localStorage里面
export default {
  props: {},
  data() {
    return {
      // 支付总价
      commonPayTotalPrice: 0,
      // Y币余额
      commonPayBalance: 0
    }
  },
  computed: {
    ...mapState('user', ['isWx']),
    ...mapGetters('ua', ['isYeDone', 'isAndroid', 'isIOS'])
  },
  methods: {
    /**
     * 通用的支付方法,拥有完成的支付流程,会将把相关信息存在localStorage里面
     * @param {Object} options
     * @param {String} options.order_id 订单id
     * @param {String} options.pay_way 支付方式
     */
    commonPay({
      // 总价
      totalPrice = 0,
      // 余额
      balance = 0,
      // 支付方式
      payments = [
        { id: 'balance', text: `余额支付(余额:Y)` },
        { id: 'wechat', text: '微信充值支付' },
        { id: 'alipay', text: '支付宝充值支付' }
      ],
      // 订单id
      orderId,
      // 订单大神id
      okamiImId,
      // 取消支付回调
      onCancel = () => {},
      // 平均接单时长（秒）
      receiptOrderTime = 900
    }) {
      // 注册悦动的下单的回调
      if (this.isYeDone) {
        window.handlePayBack = () => {
          console.log('handlePayBack 悦动的下单的回调')
          // this.$router.push('/userCenter/orderList/all')
          this.$router.push(`/order/detials/${orderId}`)
          if (this.$route.name === 'order-detials-id') {
            this.$router.push('/userCenter/orderList/all')
          } else {
            this.$router.push(`/order/detials/${orderId}`)
          }
          // this.showPayConfirmDialogIfNeeded()
        }
      }
      // 支付成功提示弹窗
      let paySuccessDialog
      // 支付方式弹窗
      let paymentDialog
      // 是否点击了支付按钮
      let btnPayClicked = false
      // 修正payments的Y币余额
      payments = fp.flowRight(
        fp.forEach(item => {
          if (item.id === 'balance') {
            item.text = `余额支付(余额:${balance}Y)`
            return false
          }
        }),
        // 函数式
        fp.cloneDeep
      )(payments)
      // 微信里面去掉支付宝选项
      if (this.isWx) {
        payments = fp.filter(item => item.id !== 'alipay', payments)
      }
      // 跳转到聊天页面或者首页的方法
      const goToChatOrIndex = () => {
        if (okamiImId) {
          this.$router.push(`/msgCenter/chat/${okamiImId}`)
        } else {
          this.$router.push(`/`)
        }
      }
      // 显示支付列表弹窗
      paymentDialog = this.$createPaymentDialog({
        $props: {
          totalPrice,
          balance,
          payments
        },
        $events: {
          confirm: options => {
            btnPayClicked = true
            const { payment, balanceLow } = options
            if (payment === 'balance' && balanceLow) {
              // 余额不足,跳转到充值页面
              this.$router.push('/userCenter/account/recharge')
              return
            }
            this.$api
              .payOrder({
                order_id: orderId,
                pay_way: payment
              })
              .then(({ data }) => {
                // 如果是余额支付
                if (payment === 'balance') {
                  // 刷新用户信息
                  this.$store.dispatch('user/fetchUser').catch(() => {})
                  paySuccessDialog = this.$createPaySuccessDialog({
                    $props: {
                      title: `大神平均接单时长为${parseInt(
                        receiptOrderTime / 60
                      )}分钟`
                    },
                    $events: {
                      maskClick() {
                        paySuccessDialog.hide()
                        goToChatOrIndex()
                      }
                    }
                  }).show()
                  const goChatTimer = setTimeout(() => {
                    // 跳转到聊天页面
                    goToChatOrIndex()
                  }, 5000)
                  this.$once('hook:beforeDestroy', () => {
                    clearTimeout(goChatTimer)
                  })
                } else if (payment === 'wechat' || payment === 'alipay') {
                  const payInfo = fp.get('data.pay_info', data) || ''
                  if (this.isWx) {
                    // 微信环境直接调起微信支付
                    console.log('微信环境直接调起微信支付')
                    this.$utils.invokeWxPay(
                      payInfo,
                      () => {
                        paySuccessDialog = this.$createPaySuccessDialog({
                          $props: {
                            title: `大神平均接单时长为${parseInt(
                              receiptOrderTime / 60
                            )}分钟`
                          },
                          $events: {
                            maskClick() {
                              paySuccessDialog.hide()
                              goToChatOrIndex()
                            }
                          }
                        }).show()
                        this.$store.dispatch('user/fetchUser').catch(() => {})
                        const goChatTimer = setTimeout(() => {
                          // 跳转到聊天页面
                          goToChatOrIndex()
                        }, 5000)
                        this.$once('hook:beforeDestroy', () => {
                          clearTimeout(goChatTimer)
                        })
                      },
                      () => {
                        console.log('微信内支付失败,请稍后再试')
                        this.$toast({
                          type: 'error',
                          txt: '支付失败,请稍后再试'
                        })
                      }
                    )
                  } else if (this.isYeDone) {
                    console.log('是悦动:进行悦动下单支付')
                    if (this.isAndroid) {
                      store2('pay', {
                        orderId: orderId,
                        url: `/order/detials/${orderId}`
                      })
                      window.Android.openURL(payInfo)
                    } else if (this.isIOS) {
                      window.webkit.messageHandlers.openURL.postMessage(payInfo)
                    }
                  } else {
                    // 普通H5支付
                    store2('pay', {
                      orderId: orderId,
                      url: '/userCenter/orderList/all'
                    })
                    // 支付宝或者微信支付(不是微信环境)
                    location.href = payInfo
                  }
                }
                // 隐藏一些弹出层
                paymentDialog.hide()
              })
              .catch(this.$fetchCatch)
          },
          hide: () => {
            if (btnPayClicked) return
            // 提示用户是否继续付款
            this.$createDialog({
              type: 'confirm',
              // title: '取消付款?',
              content: '此订单将为您保留15分钟，请及时支付！',
              confirmBtn: {
                text: '继续付款',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '稍后付款',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onCancel: () => {
                // 回调函数
                onCancel()
              },
              onConfirm: () => {
                // 重新显示支付方式选择弹窗
                paymentDialog.show()
              }
            }).show()
          }
        }
      }).show()
    }
  }
}
