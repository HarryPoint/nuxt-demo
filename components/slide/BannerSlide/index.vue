<template>
  <div class="banner-slider">
    <cube-slide
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<style lang="scss" scoped>
.banner-slider {
  // banner轮播
  width: 100%;
  height: 95px;
  margin: 0 auto;
  /deep/ {
    .cube-slide-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .cube-slide-dots {
      .active {
        background: rgb(243, 212, 32);
      }
    }
  }
}
</style>
