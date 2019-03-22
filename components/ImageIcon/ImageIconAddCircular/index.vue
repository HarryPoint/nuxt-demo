<template>
  <base-image-icon class="image-icon-add-circular" />
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
.image-icon-add-circular {
  width: 22px;
  height: 22px;
  background-image: url('./images/icon-add-circular.png');
}
</style>
