<template>
  <base-image-icon class="image-icon-chat-keyboard" />
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
.image-icon-chat-keyboard {
  width: 24px;
  height: 24px;
  background-image: url('./images/icon-chat-keyboard.png');
}
</style>
