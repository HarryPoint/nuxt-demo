<template>
  <base-image-icon class="image-icon-star-or" />
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
.image-icon-star-or {
  width: 22px;
  height: 22px;
  background-image: url('./images/icon-star-or.png');
}
</style>
