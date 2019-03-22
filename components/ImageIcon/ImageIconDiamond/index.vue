<template>
  <base-image-icon class="image-icon-diamond" />
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
.image-icon-diamond {
  width: 24px;
  height: 20px;
  background-image: url('./images/icon-diamond.png');
}
</style>
