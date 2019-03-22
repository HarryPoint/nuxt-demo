<template>
  <base-image-icon class="image-icon-more" />
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
.image-icon-more {
  width: 19px;
  height: 4px;
  background-image: url('./images/icon-more.png');
}
</style>
