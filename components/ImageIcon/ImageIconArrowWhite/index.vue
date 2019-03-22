<template>
  <base-image-icon class="image-icon-arrow-white" />
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
.image-icon-arrow-white {
  width: 8px;
  height: 16px;
  background-image: url('./images/icon-arrow-white.png');
}
</style>
