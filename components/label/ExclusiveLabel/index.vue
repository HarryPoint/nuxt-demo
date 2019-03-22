<template>
  <div class="exclusive-label">
    <image-icon-diamond/> 
    <span class="exclusive-label__text">{{ text }}</span>
  </div>
</template>

<script>
import ImageIconDiamond from '@/components/imageIcon/ImageIconDiamond'
export default {
  components: {
    ImageIconDiamond
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>


<style lang="scss" scoped>
.exclusive-label {
  position: relative;
  height: 14px;
  /deep/ {
    .image-icon {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateX(-50%);
    }
  }
}
.exclusive-label__text {
  display: inline-block;
  height: 14px;
  min-width: 100%;
  max-width: 100%;
  padding-left: 14px;
  padding-right: 4px;
  font-size: 10px;
  color: #fff;
  line-height: 14px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: #6599f9;
  border-radius: 4px;
}
</style>
