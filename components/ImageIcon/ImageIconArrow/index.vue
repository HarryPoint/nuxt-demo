<template>
  <base-image-icon class="image-icon-arrow" />
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
.image-icon-arrow {
  width: 5px;
  height: 10px;
  background-image: url('./images/icon-arrow.png');
}
</style>
