<template>
  <div class="compressed-text">
    <span 
      :style="lineStyle" 
      class="compressed-text__line"/>
    <span class="compressed-text__content">
      <slot>{{ text }}</slot>
    </span>
    <span 
      :style="textStyle" 
      class="compressed-text__line"/>
  </div>
</template>

<script>
export default {
  props: {
    // 文字内容
    text: {
      type: String,
      default: '#f1f1f1'
    },
    // 线的颜色
    lineColor: {
      type: String,
      default: ''
    },
    // 文字颜色
    textColor: {
      type: String,
      default: '#999'
    }
  },
  computed: {
    // 线的样式
    lineStyle() {
      return {
        backgroundColor: this.lineColor
      }
    },
    // 文字的样式
    textStyle() {
      return {
        color: this.textColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.compressed-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.2;
}
.compressed-text__line {
  min-width: 30px;
  height: 1px;
  flex: 1;
  background-color: #f1f1f1;
}
.compressed-text__content {
  margin: 0 14px;
  font-size: 13px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
