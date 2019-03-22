// 拥有顶部Sticky导航的布局
<template>
  <div class="nav-tab-bar-layout">
    <div 
      v-if="!isYeDone" 
      class="layout-header">
      <nav-sticky-topbar 
        :title="title" 
        :y="scrollY"/>
    </div>
    <div class="layout-content">
      <nuxt />
    </div>
  </div>
</template>


<script>
import NavStickyTopbar from '@/components/nav/NavStickyTopbar'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    NavStickyTopbar
  },
  computed: {
    ...mapState('navTopBar', ['title', 'scrollY']),
    ...mapGetters('ua', ['isYeDone'])
  }
}
</script>


<style lang="scss" scoped>
.nav-tab-bar-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.layout-content {
  height: 0;
  flex: 1;
}
.layout-header {
  /deep/ {
    .nav-top-bar__content {
      /*让标题文字看起来是居中的*/
      padding-right: 24px;
    }
  }
}
</style>
