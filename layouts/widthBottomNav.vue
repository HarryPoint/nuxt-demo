// 拥有底部导航的布局
<template>
  <div class="nav-tab-bar-layout">
    <div class="layout-content">
      <nuxt class="" />
    </div>
    <div class="layout-footer">
      <nav-tab-bar :unread-num="gImTotalUnreadCount" />
    </div>
    <link-poup-at-bottom-right/>
  </div>
</template>


<script>
import NavTabBar from '@/components/nav/NavTabBar'
import DownloadApp from '@/components/display/DownloadApp'
import LinkPoupAtBottomRight from '@/components/display/LinkPopup/LinkPoupAtBottomRight'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    NavTabBar,
    DownloadApp,
    LinkPoupAtBottomRight
  },
  computed: {
    ...mapState('navTopBar', ['title']),
    ...mapGetters('im', ['gImTotalUnreadCount']),
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
  margin-bottom: 47px;
  flex: 1;
}
.layout-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 50;
}
</style>
