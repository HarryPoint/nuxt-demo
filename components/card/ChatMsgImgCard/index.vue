<template>
  <chat-msg-card 
    v-bind="$attrs"
    class="chat-msg-gift-card"
    v-on="$listeners">
    <img 
      :src="imgUrl"
      class="img" 
      alt="">
  </chat-msg-card>
</template>

<script>
import ChatMsgCard from '@/components/card/ChatMsgCard'
export default {
  components: {
    ChatMsgCard
  },
  props: {
    // 图片地址
    imgUrl: {
      type: String,
      default:
        'http://p.qpic.cn/opensdk_im/0/1747880695484334722_1968948460_161B6DA6E52593BC1CC917EB386F4A1B/720'
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  max-width: 100%;
}
</style>
