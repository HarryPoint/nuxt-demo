<template>
  <div 
    :style="style" 
    class="video-cover"
    @click="$emit('cover-click')"
  >
    <image-icon
      v-if="showBtnPlay" 
      class="btn-play" 
      type="play-big" 
      @click.native="$emit('btn-play-click')" />
  </div>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  props: {
    // cover图片的地址
    imgUrl: {
      type: String,
      default: ''
    },
    // 展示播放按钮
    showBtnPlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style() {
      return {
        backgroundImage: `url("${this.imgUrl}")`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-cover {
  position: relative;
  width: 375px;
  height: 250px;
  background-color: rgba($color: #1b1b1b, $alpha: 0.5);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.btn-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
