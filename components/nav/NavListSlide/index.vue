<template>
  <div class="nav-list-scroll">
    <cube-slide
      ref="slide"
      :data="cData"
      v-bind="$attrs"
      class="slide"
      v-on="$listeners">
      <cube-slide-item
        v-for="(item, index) in cData"
        :key="index" 
        class="slide-item">
        <nuxt-link 
          v-for="subItem in item"
          :key="subItem._id" 
          :to="`/skill/${subItem.alias}/`" 
          class="slide-sub-item">
          <img 
            :src="subItem.thumb" 
            :alt="$utils.imgAlt.getNavSlideImgAlt({name:subItem.name, productType:subItem.type})" 
            class="sub-item-img">
          <span class="sub-item-name">{{ subItem.name }}</span>
        </nuxt-link>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
import fp from 'lodash/fp'
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    // 分组数据
    cData() {
      return fp.chunk(5, this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-list-scroll {
  height: 77px;
}
.slide {
  padding-bottom: 19px;
  /deep/ {
    .cube-slide-dots {
      span {
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background-color: rgba($color: #bfbfbf, $alpha: 0.5);
        transition: width 0.2s, background-color 0.2s;
      }
      .active {
        width: 12px;
        background-color: #ffe777;
      }
    }
  }
}
.slide-item {
  display: flex;
  align-items: center;
}
.slide-sub-item {
  display: block;
  width: 20%;
  text-align: center;
}
.sub-item-img {
  display: block;
  margin: 0 auto;
  height: 32px;
  width: 32px;
}
.sub-item-name {
  display: block;
  margin-top: 10px;
  font-size: 11px;
  color: #222;
  line-height: 1.2;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
