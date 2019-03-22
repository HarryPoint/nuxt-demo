<template>
  <i
    v-if="url"
    :style="iconStyle"
    class="image-icon"
    v-on="$listeners" />
  <i
    v-else
    :class=" type ? `image-icon-${type}` : ''"
    class="image-icon"
    v-on="$listeners" />
</template>

<script>
export default {
  props: {
    // 图标类型
    type: {
      type: String,
      default: ''
    },
    // 图片地址
    url: {
      type: String,
      default: ''
    },
    // 图标宽度
    width: {
      type: [String, Number],
      default: ''
    },
    // 图标高度
    height: {
      type: [String, Number],
      default: ''
    },
    // 将px转化为rem
    rem: {
      type: Boolean,
      default: true
    },
    // rem基准
    remRatio: {
      type: Number,
      default: 37.5
    }
  },
  computed: {
    // 实际的宽度
    cWidth() {
      if (this.width === '') return
      if (typeof this.width === 'number') {
        return this.rem ? this.width / this.remRatio + 'rem' : this.width
      }
      return this.width
    },
    // 实际的高度
    cHeight() {
      if (this.height === '') return
      if (typeof this.height === 'number') {
        return this.rem ? this.height / this.remRatio + 'rem' : this.height
      }
      return this.height
    },
    // 图标样式
    iconStyle() {
      return {
        backgroundImage: `url(${this.url})`,
        width: this.cWidth,
        height: this.cHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-icon {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
