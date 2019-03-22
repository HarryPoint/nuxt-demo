<template>
  <base-image-icon class="image-icon-filter" />
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
.image-icon-filter {
  width: 16.5px;
  height: 17px;
  background-image: url('./images/icon-filter.png');
}
</style>
