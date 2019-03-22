<template>
  <base-image-icon class="image-icon-close-white" />
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
.image-icon-close-white {
  width: 12.5px;
  height: 12.5px;
  background-image: url('./images/icon-close-white.png');
}
</style>
