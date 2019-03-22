<template>
  <base-image-icon class="image-icon-close-black" />
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
.image-icon-close-black {
  width: 12.5px;
  height: 12.5px;
  background-image: url('./images/icon-close-black.png');
}
</style>
