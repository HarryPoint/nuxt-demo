<template>
  <!-- 设计说效果不好的话要替换img-goto-charge.png,所以放到服务器上 -->
  <link-popup 
    img-url="https://www.yay.com.cn/static/img/img-goto-charge.png"
    link-to="/userCenter/account/recharge"
    class="link-poup-go-to-charge"/>
</template>

<script>
import LinkPopup from '../index.vue'
export default {
  components: {
    LinkPopup
  }
}
</script>

<style lang="scss" scoped>
.link-poup-go-to-charge {
  /deep/ {
    .link-popup__img {
      width: 91.5px;
      height: 94.5px;
    }
  }
}
</style>
