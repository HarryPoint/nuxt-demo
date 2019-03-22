<template>
  <div 
    :class="cBadgeClass" 
    class="badge">
    <slot/>
    <span 
      v-if="showDot" 
      class="badge-dot"/>
    <span 
      v-else-if="num!==0" 
      class="badge-num">{{ cNum }}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 数量
    num: {
      type: [Number, String],
      default: 0
    },
    // 最大徽标数
    maxNum: {
      type: Number,
      default: 99
    },
    // 只显示小圆点
    showDot: {
      type: Boolean,
      default: false
    },
    // 自定义徽标的位置
    dotOffset: {
      type: Object,
      default() {
        return {
          left: '',
          right: ''
        }
      }
    }
  },
  computed: {
    // 实际显示的徽标数
    cNum() {
      return this.num < this.maxNum ? this.num : `${this.maxNum}+`
    },
    cBadgeClass() {
      return {
        'no-slot': !this.$slots.default
      }
    }
  },
  mounted() {
    console.log('121212')
    console.log(!this.$slots.default)
  }
}
</script>

<style lang="scss" scoped>
.badge {
  position: relative;
  display: inline-block;
  &.no-slot {
    .badge-dot,
    .badge-num {
      position: static;
      transform: none;
    }
  }
}
.badge-dot {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #fd5e68;
  transform: translate(100%, -50%);
}
.badge-num {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  height: 18px;
  padding: 0 6px;
  font-size: 12px;
  color: #fff;
  line-height: 18px;
  text-align: center;
  border-radius: 9px;
  background-color: #fd5e68;
  transform: translate(100%, -50%);
}
</style>
