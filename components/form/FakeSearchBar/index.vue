<template>
  <div 
    class="fake-search-bar" 
    @click="$emit('bar-click')">
    <div class="fake-search-bar__left">
      <image-icon type="search" />
    </div>
    <div class="fake-search-bar__center">
      搜索
    </div>
  </div>
</template>

<script>
import imageIcon from '@/components/imageIcon'
export default {
  components: {
    imageIcon
  }
}
</script>

<style lang="scss" scoped>
.fake-search-bar {
  display: flex;
  align-items: center;
  width: 345px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 8px;
  padding: 0 9px;
  height: 30px;
  line-height: 1.2;
  background-color: #f5f5f5;
  border-radius: 5px;
}
.fake-search-bar__left {
  font-size: 0;
}
.fake-search-bar__center {
  margin-left: 5px;
  font-size: 12px;
  color: #4e4e4e;
}
</style>
