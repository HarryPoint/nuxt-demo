<template>
  <div class="page-scroll">
    <cube-scroll
      v-bind="$attrs"
      v-on="$listeners">
      <slot/>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.page-scroll {
  // 页面
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f7;
}
</style>
