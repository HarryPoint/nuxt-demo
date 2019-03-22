<template>
  <div 
    :class="cListClass" 
    class="okami-identity-label-list">
    <div class="okami-identity-label-list__left">
      <image-icon-okami-christmas/>
      <h4 
        v-if="type!=='small'" 
        class="okami-identity-label-list__title">{{ title }}</h4>
    </div>
    <div class="okami-identity-label-list__center">
      <p class="okami-identity-label-list__text">{{ cLabelText }}</p>
    </div>
  </div>
</template>

<script>
import ImageIconOkamiChristmas from '@/components/imageIcon/ImageIconOkamiChristmas'
export default {
  components: {
    ImageIconOkamiChristmas
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '认证：'
    },
    // default:显示标题，small：不显示标题,字体偏小
    type: {
      type: String,
      default: 'default'
    },
    // 是否可以换行
    noWrap: {
      type: Boolean,
      default: false
    },
    // 标签数据
    labelData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    // class
    cListClass() {
      return {
        [this.type]: true,
        'no-wrap': this.noWrap
      }
    },
    // 专属标签文本
    cLabelText() {
      if (Object.prototype.toString.call(this.labelData) !== '[object Array]')
        return ''
      return this.labelData.join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.okami-identity-label-list {
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  font-weight: normal;
  color: #999;
  line-height: 1.2;
  &.small {
    align-items: center;
    font-size: 10px;
    .okami-identity-label-list__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }
  }
  &.no-wrap {
    align-items: center;
    .okami-identity-label-list__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.okami-identity-label-list__left {
  display: flex;
  align-items: center;
  /deep/ {
    .image-icon {
      margin-right: 4px;
    }
  }
}
.okami-identity-label-list__center {
  width: 0;
  flex: 1;
}
.okami-identity-label-list__text {
  line-height: 1.2;
}
</style>
