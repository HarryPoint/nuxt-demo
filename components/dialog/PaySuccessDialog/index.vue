// 参考https://github.com/cube-ui/cube-application-guide/tree/ec5ca18854daf25706ba8751bad1c1270cb96675
<template>
  <div class="payment-dialog">   
    <cube-popup 
      ref="popup"
      @mask-click="$emit('maskClick')">
      <transition 
        enter-active-class="animated zoomIn fastest">
        <div 
          v-show = "isShow" 
          class="payment-dialog__card">
          <h4 class="card__title">{{ title }}</h4>
          <p class="card__text">{{ text }}</p>
        </div>
      </transition>
    </cube-popup>
  </div>
</template>

<script>
export default {
  name: 'PaySuccessDialog',
  props: {
    // 标题
    title: {
      type: String,
      default: '大神接单后会主动联系您请耐心等待!'
    },
    // 内容
    text: {
      type: String,
      default:
        '若大神15分钟内未及时接单，订单将会自动取消，金额会自动退回余额，且平台会对大神进行惩罚'
    }
  },
  data() {
    return {
      // 当前是否显示,用于动画
      isShow: false
    }
  },
  computed: {},
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
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-dialog__card {
  width: 312px;
  height: 315px;
  padding: 160px 25px 25px 25px;
  background-image: url('./images/bg-pay-success.png');
  background-repeat: no-repeat;
  background-size: contain;
}
.card__title {
  font-size: 23px;
  font-weight: normal;
  color: #222222;
  text-align: center;
  line-height: 1.2;
}
.card__text {
  margin-top: 23px;
  font-size: 15px;
  color: #222222;
  opacity: 0.72;
  line-height: 1.2;
}
</style>
