<template>
  <div class="nav-chat-and-order">
    <nuxt-link 
      :to="leftBtnLinkTo"
      class="btn btn-chat" 
      @click.native="$emit('left-btn-click')">
      <slot name="left">
        <image-icon 
          class="icon" 
          type="chat" />聊一聊
      </slot>
    </nuxt-link>
    <nuxt-link 
      :to="rightBtnLinkTo"
      class="btn btn-order" 
      @click.native="$emit('right-btn-click')">
      <slot name="right">
        <image-icon 
          class="icon"
          type="order" />下单
      </slot>
    </nuxt-link>
  </div>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  props: {
    rightBtnLinkTo: {
      type: String,
      default: ''
    },
    leftBtnLinkTo: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-chat-and-order {
  display: flex;
  justify-content: space-around;
}
.btn {
  height: 45px;
  font-size: 15px;
  text-align: center;
  line-height: 45px;
  color: #222;
}
.btn-chat {
  width: 150px;
  background: #fff;
}
.btn-order {
  flex: 1;
  background-color: #fed62c;
}
.icon {
  margin-right: 4px;
}
</style>
