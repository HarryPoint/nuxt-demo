<template>
  <li 
    class="base-list-item" 
    @click="$emit('item-click')">
    <nuxt-link 
      :to="linkTo" 
      class="base-list-item_card">
      <div 
        v-if="$slots.left || leftText" 
        class="base-list-item_card__left">
        <slot 
          name="left">
          {{ leftText }}
        </slot>
      </div>
      <div 
        v-if="$slots.center || centerText" 
        :class="itemClass" 
        class="base-list-item_card__center">
        <slot 
          name="center">
          {{ centerText }}
        </slot>
      </div>
      <div 
        v-if="showArrow || $slots.right" 
        class="base-list-item_card__right">
        <slot 
          name="right">
          <image-icon-arrow v-if="showArrow" />
        </slot>
      </div>
    </nuxt-link>
  </li>
</template>


<script>
import ImageIconArrow from '@/components/imageIcon/ImageIconArrow'
export default {
  components: {
    ImageIconArrow
  },
  props: {
    // 左侧文字
    leftText: {
      type: String,
      default: ''
    },
    // 中间文字
    centerText: {
      type: String,
      default: ''
    },
    // 中间文字对齐方式
    centerTextAlign: {
      type: String,
      default: 'right'
    },
    // 中间文字可否换行
    centerTextWarp: {
      type: Boolean,
      default: false
    },
    // 是否显示箭头
    showArrow: {
      type: Boolean,
      default: true
    },
    // 链接到
    linkTo: {
      type: String,
      default: ''
    }
  },
  computed: {
    itemClass() {
      return {
        [`text-${this.centerTextAlign}`]: true,
        'text-wrap': this.centerTextWarp
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-list {
  background-color: #fff;
}
.base-list-item {
  padding-left: 16px;
  // border-bottom: solid 1px #f1f1f1;
  background-image: linear-gradient(to right, #f1f1f1 0, #f1f1f1 100%);
  background-repeat: no-repeat;
  background-position: 16px bottom;
  background-size: 100% 1px;
  &:last-child {
    background-image: none;
  }
}
.base-list-item_card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 16px;
  line-height: 1.2;
}
.base-list-item_card__left {
  margin-right: 8px;
  color: #a3a2a8;
}
.base-list-item_card__center {
  width: 0;
  flex: 1;
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1b1b1b;
  &.text-right {
    text-align: right;
  }
  &.text-left {
    text-align: left;
  }
  &.text-center {
    text-align: center;
  }
  &.text-wrap {
    white-space: initial;
    overflow: initial;
    text-overflow: initial;
  }
}
.base-list-item_card__right {
  margin-right: 8px;
}
</style>
