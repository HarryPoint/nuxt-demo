<template>
  <nuxt-link 
    :to="linkTo" 
    class="link-popup"
    @click.native="$emit('click')">
    <img
      :src="imgUrl"
      class="link-popup__img" 
      alt="">
  </nuxt-link>
</template>

<script>
export default {
  props: {
    // 内容展示位置 默认底部
    position: {
      type: String,
      default: 'bottom'
    },
    // 图片的url
    imgUrl: {
      type: String,
      default: ''
    },
    // 点击跳转到
    linkTo: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.link-popup {
  position: fixed;
  bottom: 60px;
  right: 16px;
  z-index: 999;
}
</style>
