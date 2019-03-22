<template>
  <span 
    :class="className" 
    class="level-label">{{ text || type }}</span>
</template>

<script>
export default {
  props: {
    // 标签类型,有高级 初级 中级
    type: {
      type: [String, Number],
      default: ''
    },
    // 标签文字
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    className() {
      switch (this.type) {
        case '高级':
          return 'senior'
        case '中级':
          return 'intermediate'
        case '初级':
          return 'primary'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/stylus">
.level-label {
  // 级别标签
  display: inline-block;
  height: 14px;
  padding: 0 4px;
  font-size: 10px;
  color: #fff;
  text-align: center;
  line-height: 14px;
  border-radius: 3px;
  &.senior {
    // 高级
    background-color: #fed101;
  }
  &.intermediate {
    // 中级
    background-color: rgb(255, 149, 149);
  }
  &.primary {
    // 初级
    background-color: #80c269;
  }
}
</style>
