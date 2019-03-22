<template>
  <span 
    :class="sex| fSexStr" 
    class="label-age">
    <image-icon 
      :type="sex | fSexStr" 
      class="icon-sex" />
    {{ age }}
  </span>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  filters: {
    fSexStr(value) {
      switch (value) {
        case 0:
          return 'male'
        case 1:
          return 'female'
        case 3:
          return 'all'
        default:
          return '' + value
      }
    }
  },
  props: {
    // 性别，取值为male,female
    sex: {
      type: [String, Number],
      default: 'male'
    },
    age: {
      type: [Number, String],
      default: '--'
    }
  }
}
</script>

<style lang="scss" scoped>
.label-age {
  display: inline-block;
  height: 14px;
  // 在真机上使文字看起来居中,所以设置padding-top: 1px;(没有测试ios,安卓上是对的)
  padding: 0 4px;
  font-size: 10px;
  color: #fff;
  line-height: 14px;
  text-align: center;
  border-radius: 3px;
  &.male {
    background-image: linear-gradient(90deg, #c1d5f9 0%, #a2c0f4 100%);
  }
  &.female {
    background-image: linear-gradient(90deg, #ffbedf 0%, #faa5cd 100%);
  }
}
.icon-sex {
  margin-top: -2px;
}
</style>
