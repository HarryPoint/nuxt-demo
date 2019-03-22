<template>
  <base-image-icon class="image-icon-play-big" />
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
.image-icon-play-big {
  width: 37px;
  height: 37px;
  background-image: url('./images/icon-play-big.png');
}
</style>
