// 拥有顶部导航的布局
<template>
  <div class="nav-tab-bar-layout">
    <div 
      v-if="!isYeDone" 
      class="layout-header">
      <nav-top-bar :title="title"/>
    </div>
    <div class="layout-content">
      <nuxt class="" />
    </div>
  </div>
</template>


<script>
import NavTopBar from '@/components/nav/NavTopBar'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    NavTopBar
  },
  computed: {
    ...mapState('navTopBar', ['title']),
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
