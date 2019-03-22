<template>
  <div class="nav-tab-bar">
    <router-link
      tag="div"
      to="/">
      <image-icon
        :url="require('./images/icon_home_or.png')"
        :width="21.5"
        :height="21.5"
        class="link-icon"/>
      <image-icon
        :url="require('./images/icon_home_se.png')"
        :width="21.5"
        :height="21.5"
        class="link-icon active"/>
    </router-link>
    <router-link
      tag="div"
      class="order"
      to="/userCenter/orderList/">
      <image-icon 
        :url="require('./images/icon_order_or.png')"
        :width="17.5"
        :height="21"
        class="link-icon"/>
      <image-icon 
        :url="require('./images/icon_order_se.png')"
        :width="17.5"
        :height="21"
        class="link-icon active"/>
    </router-link>
    <router-link
      tag="div"
      to="/msgCenter/friend">
      <badge :num="unreadNum">
        <image-icon 
          :url="require('./images/icon_chat_or.png')"
          :width="22.5"
          :height="22"
          class="link-icon"/>
        <image-icon 
          :url="require('./images/icon_chat_se.png')"
          :width="22.5"
          :height="22"
          class="link-icon active"/>
      </badge>
    </router-link>
    <router-link
      tag="div"
      to="/userCenter">
      <image-icon 
        :url="require('./images/icon_mine_or.png')"
        :width="19"
        :height="22.5"
        class="link-icon"/>
      <image-icon 
        :url="require('./images/icon_mine_se.png')"
        :width="19"
        :height="22.5"
        class="link-icon active"/>
    </router-link>
  </div>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
import Badge from '@/components/display/Badge'
export default {
  components: {
    ImageIcon,
    Badge
  },
  props: {
    // 数量
    unreadNum: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 47px;
  font-size: 0;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  overflow: hidden;
}
.link-icon.active {
  display: none;
}

.nuxt-link-exact-active,
.order.nuxt-link-active {
  .link-icon {
    display: none;
  }
  .link-icon.active {
    display: inline-block;
  }
}
</style>
