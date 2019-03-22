// 参考https://github.com/cube-ui/cube-application-guide/tree/ec5ca18854daf25706ba8751bad1c1270cb96675
<template>
  <div class="payment-dialog">   
    <cube-popup 
      ref="popup"
      @mask-click="hide">
      <transition 
        enter-active-class="animated zoomIn fastest">
        <div 
          v-show = "isShow" 
          class="payment-dialog__card">
          <div class="payment-dialog__header">
            <h4 class="payment-dialog__title">
              合计: <strong>￥{{ totalPrice }}</strong>
            </h4>
          </div>
          <payment-list
            :payments="payments" 
            v-model="payment" 
            class="payment-dialog__list"
            @item-click="select"/>
          <button 
            class="btn-payment" 
            @click="confirm">{{ cBtnPayConfirmText }}</button>
        </div>
      </transition>
    </cube-popup>
  </div>
</template>

<script>
import PaymentList from '@/components/list/PaymentList'
export default {
  name: 'PaymentDialog',
  components: {
    PaymentList
  },
  props: {
    // 合计总价
    totalPrice: {
      type: Number,
      default: 0
    },
    // 账户余额
    balance: {
      type: Number,
      default: 0
    },
    // 支付方式列表
    payments: {
      type: Array,
      default() {
        return []
      }
    },
    // 按钮文字
    btnText: {
      type: String,
      default: '立即支付'
    }
  },
  data() {
    return {
      // 当前选中的支付方式
      payment: 'balance',
      // 当前是否显示,用于动画
      isShow: false
    }
  },
  computed: {
    // 余额是否不足
    cBalanceLow() {
      return this.balance < this.totalPrice
    },
    // 支付弹窗按钮是否该跳转到充值页面
    cBtnPayConfirmToRecharge() {
      return this.cBalanceLow && this.payment === 'balance'
    },
    // 支付弹窗按钮文字
    cBtnPayConfirmText() {
      return this.cBtnPayConfirmToRecharge ? '余额不足,立即充值' : '立即支付'
    }
  },
  methods: {
    show() {
      console.log('show payment-dialog')
      this.$refs.popup.show()
      this.isShow = true
      this.$emit('show')
    },
    hide() {
      console.log('hide payment-dialog')
      this.$refs.popup.hide()
      this.isShow = false
      this.$emit('hide')
    },
    confirm() {
      this.$emit('confirm', {
        payment: this.payment,
        useBlance: this.payment === 'balance',
        balanceLow: this.cBalanceLow
      })
    },
    select(item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-dialog__card {
  width: 298px;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
}

.payment-dialog__title {
  height: 65px;
  font-size: 15px;
  font-weight: normal;
  color: #a3a2a8;
  text-align: center;
  line-height: 65px;
  background-image: linear-gradient(to right, #f1f1f1 0, #f1f1f1 100%);
  background-repeat: no-repeat;
  background-position: 16px bottom;
  background-size: 100% 1px;
  strong {
    font-size: 18px;
    font-weight: normal;
    color: #fd5e68;
  }
}
.btn-payment {
  display: block;
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #222222;
  text-align: center;
  line-height: 50px;
  background-color: #fed62c;
}
</style>
