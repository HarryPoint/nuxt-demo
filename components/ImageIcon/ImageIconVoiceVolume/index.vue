<template>
  <base-image-icon class="image-icon-voice-volume" />
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
.image-icon-voice-volume {
  width: 16px;
  height: 16px;
  background-image: url('./images/icon-voice-volume.png');
}
</style>
