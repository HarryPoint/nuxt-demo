<template>
  <base-image-icon 
    :class="cClass" 
    class="image-icon-chat-audio" />
</template>

<script>
import BaseImageIcon from '../BaseImageIcon'
export default {
  components: {
    BaseImageIcon
  },
  props: {
    // 是否正在播放
    playing: {
      type: Boolean,
      default: false
    },
    // 大头是否朝向左边
    isLeft: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cClass() {
      return {
        playing: this.playing,
        'is-left': this.isLeft
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes sound {
  100% {
    background-position-x: -59px;
  }
}
.image-icon.image-icon-chat-audio {
  width: 14.75px;
  height: 17px;
  background-image: url('./images/icon-chat-audio.png');
  background-size: auto 17px;
  &.playing {
    animation: sound 600ms steps(4, end) infinite;
  }
  &.is-left {
    transform: rotate(180deg);
  }
}
</style>
