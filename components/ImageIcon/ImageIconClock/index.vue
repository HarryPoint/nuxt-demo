<template>
  <base-image-icon class="image-icon-clock" />
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
.image-icon-clock {
  width: 12px;
  height: 12px;
  background-image: url('./images/icon-clock.png');
}
</style>
