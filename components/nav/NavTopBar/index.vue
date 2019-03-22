// todo: 把左中右插槽放出来
<template>
  <div class="nav-top-bar">
    <slot name="left">
      <div 
        class="nav-top-bar__left">
        <image-icon 
          type="back" 
          @click="$router.back()"/>
      </div>
    </slot>
    <div class="nav-top-bar__content">
      <slot name="center">
        <h1 class="title">{{ title }}</h1>
      </slot>
    </div>
    <div class="nav-top-bar__right">
      <slot name="right"/>
    </div>
  </div>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-top-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 16px;
  font-size: 16px;
  background-color: #fff;
  border-bottom: 1px solid rgb(225, 225, 225);
  overflow: hidden;
}
.nav-top-bar__left {
  // 让返回图标更居中
  font-size: 0;
}
.nav-top-bar__content {
  width: 0;
  flex: 1;
  padding: 0 16px;
  text-align: center;
  overflow: hidden;
}
.title {
  font-size: 16px;
  color: #222;
  font-weight: normal;
  line-height: 1.5;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
