<template>
  <div class="banner-slider">
    <cube-slide
      :data="data"
      v-bind="$attrs"
      v-on="$listeners">
      <cube-slide-item 
        v-for="(item, index) in data" 
        :key="index" 
        @click.native="$emit('item-click', item, index)">
        <div 
          :style="getStyle(item)" 
          class="pic-card"/>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [
          // 'http://119.27.167.20:8008//avatar/5b50440f83ee4.jpg',
          // 'http://119.27.167.20:8008//avatar/5b46f00ab3595.jpg',
          // 'http://119.27.167.20:8008//avatar/5b45c76a97d67.jpg'
        ]
      }
    }
  },
  methods: {
    getStyle(item) {
      return {
        backgroundImage: `url("${item.imgUrl}")`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-slider {
  // banner轮播
  width: 100%;
  height: 471px;
  margin: 0 auto;
  /deep/ {
    .cube-slide-dots {
      bottom: 13px;
      padding-right: 16px;
      text-align: right;
      span {
        width: 4px;
        height: 4px;
        margin: 0 3px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 0.66);
        transition: width 0.2s;
        &.active {
          width: 15px;
        }
      }
    }
  }
}
.pic-card {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
