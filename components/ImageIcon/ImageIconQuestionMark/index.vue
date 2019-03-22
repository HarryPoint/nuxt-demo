<template>
  <base-image-icon class="image-icon-question-mark" />
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
.image-icon-question-mark {
  width: 16px;
  height: 16px;
  background-image: url('./images/icon-question-mark.png');
}
</style>
