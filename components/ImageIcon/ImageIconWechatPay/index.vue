<template>
  <base-image-icon class="image-icon-wechat-pay" />
</template>

<script>
import BaseImageIcon from '../BaseImageIcon'
export default {
  components: {
    BaseImageIcon
  }
}
</script>

<style lang="scss" scoped>
.image-icon-wechat-pay {
  width: 22px;
  height: 20px;
  background-image: url('./images/icon-wechat-pay.png');
}
</style>
