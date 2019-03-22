<template>
  <base-image-icon class="image-icon-chat-emoji" />
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
.image-icon-chat-emoji {
  width: 24px;
  height: 24px;
  background-image: url('./images/icon-chat-emoji.png');
}
</style>
