// 默认的布局,没有自定义layout的page将会使用这个layout
<template>
  <div class="default-layout">
    <nuxt/>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100%;
  overflow: hidden;
}
</style>
