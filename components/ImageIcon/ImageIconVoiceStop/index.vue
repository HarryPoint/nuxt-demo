<template>
  <base-image-icon class="image-icon-voice-stop" />
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
.image-icon-voice-stop {
  width: 33px;
  height: 33px;
  background-image: url('./images/icon-voice-stop.png');
}
</style>
