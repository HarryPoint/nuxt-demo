<template>
  <base-image-icon class="image-icon-voice-mute" />
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
.image-icon-voice-mute {
  width: 16px;
  height: 16px;
  background-image: url('./images/icon-voice-mute.png');
}
</style>
