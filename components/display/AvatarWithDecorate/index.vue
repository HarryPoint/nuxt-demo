<template>
  <div 
    class="avatar-with-decorate">
    <img 
      :src="url || require('./images/default-avatar.png')"
      class="avatar" 
      alt="">
    <img 
      v-if="decorateUrl"
      :src="decorateUrl" 
      class="decorate" 
      alt="">
  </div>
</template>

<script>
export default {
  props: {
    // 头像的url
    url: {
      type: String,
      default: ''
    },
    // 装饰的url
    decorateUrl: {
      type: String,
      default: ''
    },
    // 头像的类型ginger：姜饼榜
    type: {
      type: String,
      default: 'ginger'
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.avatar-with-decorate {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
.avatar {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  z-index: 1;
}
.decorate {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  transform: scale(1.1);
  transform-origin: center center;
  z-index: 2;
}
</style>
