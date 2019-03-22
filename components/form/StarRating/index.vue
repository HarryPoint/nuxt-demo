<template>
  <ul 
    :class="size" 
    class="star-rating small">
    <li 
      v-for="n in maxRate" 
      :key="n">
      <image-icon
        v-if="n<=cRate" 
        class="icon-star" 
        type="star-se"/>
    </li>
  </ul>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  props: {
    // 最高分
    maxRate: {
      type: Number,
      default: 5
    },
    // 当前分
    rate: {
      type: Number,
      default: 0.5
    },
    // 大小 可选small
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    cRate() {
      return Math.round(this.rate)
    }
  }
}
</script>

<style lang="scss" scoped>
.star-rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon-star {
    margin-left: 8px;
  }
  &.small {
    .icon-star {
      width: 11px;
      height: 10.57px;
      margin-left: 4px;
    }
  }
}
</style>
