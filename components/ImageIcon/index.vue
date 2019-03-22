<template>
  <i
    v-if="url"
    :style="iconStyle"
    class="image-icon"
    v-on="$listeners" />
  <i
    v-else
    :class="`image-icon-${type}`"
    class="image-icon"
    v-on="$listeners" />
</template>

<script>
export default {
  props: {
    // 图标类型
    type: {
      type: String,
      default: ''
    },
    // 图片地址
    url: {
      type: String,
      default: ''
    },
    // 图标宽度
    width: {
      type: [String, Number],
      default: ''
    },
    // 图标高度
    height: {
      type: [String, Number],
      default: ''
    },
    // 将px转化为rem
    rem: {
      type: Boolean,
      default: true
    },
    // rem基准
    remRatio: {
      type: Number,
      default: 37.5
    }
  },
  computed: {
    // 实际的宽度
    cWidth() {
      if (this.width === '') return
      if (typeof this.width === 'number') {
        return this.rem ? this.width / this.remRatio + 'rem' : this.width
      }
      return this.width
    },
    // 实际的高度
    cHeight() {
      if (this.height === '') return
      if (typeof this.height === 'number') {
        return this.rem ? this.height / this.remRatio + 'rem' : this.height
      }
      return this.height
    },
    // 图标样式
    iconStyle() {
      return {
        backgroundImage: `url(${this.url})`,
        width: this.cWidth,
        height: this.cHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-icon {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  background-size: contain;
  background-repeat: no-repeat;
}
.image-icon-back {
  width: 8px;
  height: 18px;
  background-image: url('./images/icon-back.png');
}
.image-icon-search {
  width: 11px;
  height: 11px;
  background-image: url('./images/icon-search.png');
}
.image-icon-msg {
  width: 17px;
  height: 15px;
  background-image: url('./images/icon-msg.png');
}
.image-icon-arrow {
  width: 5px;
  height: 10px;
  background-image: url('./images/icon-arrow.png');
}
.image-icon-female {
  width: 8px;
  height: 8px;
  background-image: url('./images/icon-female.png');
}
.image-icon-male {
  width: 8px;
  height: 8px;
  background-image: url('./images/icon-male.png');
}
.image-icon-delete {
  width: 13px;
  height: 13px;
  background-image: url('./images/icon-delete.png');
}
.image-icon-arrow-white {
  width: 8px;
  height: 16px;
  background-image: url('./images/icon-arrow-white.png');
}
.image-icon-send-out {
  width: 13px;
  height: 11px;
  background-image: url('./images/icon-send-out.png');
}
.image-icon-vip-1 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-1.png');
}
.image-icon-vip-2 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-2.png');
}
.image-icon-vip-3 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-3.png');
}
.image-icon-vip-4 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-4.png');
}
.image-icon-vip-5 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-5.png');
}
.image-icon-vip-6 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-6.png');
}
.image-icon-vip-7 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-7.png');
}
.image-icon-vip-8 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-8.png');
}
.image-icon-vip-9 {
  width: 32px;
  height: 14px;
  background-image: url('./images/icon-vip-9.png');
}
.image-icon-play {
  width: 5.5px;
  height: 7px;
  background-image: url('./images/icon-play.png');
}
.image-icon-voice {
  width: 9.5px;
  height: 7px;
  background-image: url('./images/icon-voice.png');
}
.image-icon-label {
  width: 12.5px;
  height: 12.5px;
  background-image: url('./images/icon-label.png');
}
.image-icon-play-big {
  width: 37px;
  height: 37px;
  background-image: url('./images/icon-play-big.png');
}
.image-icon-voice-white {
  width: 11.5px;
  height: 12px;
  background-image: url('./images/icon-voice-white.png');
}
.image-icon-customer-service-small {
  width: 15px;
  height: 13px;
  background-image: url('./images/icon-customer-service-small.png');
}
.image-icon-alarm-clock {
  width: 12px;
  height: 12px;
  background-image: url('./images/icon-alarm-clock.png');
}
.image-icon-security {
  width: 10.5px;
  height: 12px;
  background-image: url('./images/icon-security.png');
}
.image-icon-star-se {
  width: 26px;
  height: 25px;
  background-image: url('./images/icon-star-se.png');
}
.image-icon-star-or {
  width: 26px;
  height: 25px;
  background-image: url('./images/icon-star-or.png');
}
.image-icon-order-se {
  width: 17.5px;
  height: 21px;
  background-image: url('./images/icon-order-se.png');
}
.image-icon-coupon-s {
  width: 17.5px;
  height: 15px;
  background-image: url('./images/icon-coupon-s.png');
}
.image-icon-customer-service {
  width: 16px;
  height: 16px;
  background-image: url('./images/icon-customer-service.png');
}
.image-icon-make-up {
  width: 16px;
  height: 16px;
  background-image: url('./images/icon-make-up.png');
}
.image-icon-order {
  width: 14.5px;
  height: 17px;
  background-image: url('./images/icon-order.png');
}
.image-icon-chat {
  width: 21.5px;
  height: 21.5px;
  background-image: url('./images/icon-chat.png');
}
</style>
