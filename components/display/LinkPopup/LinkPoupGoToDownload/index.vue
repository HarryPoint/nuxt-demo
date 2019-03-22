<template>
  <link-popup 
    :img-url="require('./images/download_enter.png')"
    class="link-poup-go-to-charge"
    @click="handleClick"/>
</template>

<script>
import LinkPopup from '../index.vue'
export default {
  components: {
    LinkPopup
  },
  methods: {
    handleClick() {
      location.href = 'https://www.yay.com.cn/h5/download.html'
    }
  }
}
</script>

<style lang="scss" scoped>
.link-poup-go-to-charge {
  /deep/ {
    .link-popup__img {
      width: 45px;
      height: 64px;
    }
  }
}
</style>
