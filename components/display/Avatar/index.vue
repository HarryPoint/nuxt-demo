<template>
  <img 
    :src="url || require('./images/default-avatar.png')"
    class="avatar" 
    alt="">
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>
