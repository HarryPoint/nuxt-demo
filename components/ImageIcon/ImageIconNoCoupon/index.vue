<template>
  <base-image-icon class="image-icon-no-coupon" />
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
.image-icon-no-coupon {
  width: 92.5px;
  height: 62.5px;
  background-image: url('./images/icon-no-coupon.png');
}
</style>
