<template>
  <div 
    :class="ThemeInTransparent" 
    class="nav-sticky-topbar">
    <transition 
      name="slideInDown" 
      mode="out-in">
      <!-- 不透明的导航 -->
      <div 
        v-if="opacity" 
        key="opacity">
        <div
          slot="nav-sticky" 
          :style="NavStickyStyle"
          class="nav2">
          <nav-top-bar 
            :title="title" 
            v-bind="$attrs"/>
        </div>
      </div>
      <!-- 透明的导航 -->
      <div 
        v-if="!opacity" 
        key="notOpacity">
        <div
          slot="nav-transparent" 
          :class="ThemeInTransparent"
          class="nav-transparent">
          <nav-top-bar 
            :title="showTitleInTransparent ? title : ''"
            v-bind="$attrs">
            <image-icon 
              v-if="ThemeInTransparent==='white'"
              slot="left" 
              type="arrow-white" 
              @click="$router.back()"/>
            <image-icon 
              v-else
              slot="left" 
              type="back" 
              @click="$router.back()"/>
          </nav-top-bar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import NavTopBar from '@/components/nav/NavTopBar'
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    NavTopBar,
    ImageIcon
  },
  inheritAttrs: false,
  props: {
    // 要展示不透明导航的临界值
    maxShowNavStickyY: {
      type: Number,
      default: -10
    },
    // 不透明导航透明度最小的时候的Y的值
    minNavStickyOpacityY: {
      type: Number,
      default: -80
    },
    // 当前的y的值
    y: {
      type: Number,
      default: 0
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 透明导航是否显示标题
    showTitleInTransparent: {
      type: Boolean,
      default: false
    },
    // 透明导航的主题,将影响返回键和标题颜色
    ThemeInTransparent: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    // 透明度
    opacity() {
      if (this.y > this.maxShowNavStickyY) {
        return 0
      }
      if (this.y < this.minNavStickyOpacityY) {
        return 1
      }
      const percentage =
        1 -
        parseFloat(
          (this.y - this.minNavStickyOpacityY) /
            (this.maxShowNavStickyY - this.minNavStickyOpacityY)
        )
      return percentage.toFixed(2)
    },
    NavStickyStyle() {
      return {
        opacity: this.opacity
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-sticky-topbar {
  // 用absolute,是因为用fixed有问题,若没问题可改回来
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.1)
  );
  &.black {
    background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.3)
    );
  }
}
.nav-transparent {
  background-color: transparent;
  /deep/ {
    .nav-top-bar {
      background-color: transparent;
      border-bottom-color: transparent;
    }
    .title {
      color: #fff;
    }
  }
  &.black {
    /deep/ {
      .title {
        color: #1b1b1b;
      }
    }
  }
}
// slideInDown的过渡效果
.slideInDown-enter-active {
  transition: opacity 0.4s, transform 0.4s;
}
.slideInDown-leave-active {
  transition: opacity 0s transform 0s;
}
.slideInDown-enter,
.slideInDown-leave-active {
  opacity: 1;
  transform: translateY(-100%);
}
.fadeIn-enter-active {
  transition: opacity 0.4s;
}
.fadeIn-leave-active {
  transition: opacity 0s;
}
.fadeIn-enter,
.fadeIn-leave-active {
  opacity: 1;
}
</style>
