<template>
  <cube-swipe>
    <base-list class="chat-list">
      <base-list-item
        v-for="(item,index) in data"
        :key="item.id || index"
        :show-arrow="false"
        :link-to="item.linkTo" 
        class="chat-list__item" 
        center-text-align="left">
        <cube-swipe-item 
          slot="center"
          ref="swipeItem"
          :btns="[{
            action: 'delete',
            text: '删除',
            color: '#fd5e68'
          }]" 
          :index="index"
          class="chat-card"
          @btn-click="$emit('btn-del-click',item,$refs.swipeItem[index],index)">
          <!-- cube-swipe-item的item-click不管用,还不知道原因 -->
          <div 
            class="chat-card__left" 
            @click="$emit('item-click',item,$refs.swipeItem[index],index)" >
            <avatar
              :url="item.avatarUrl"/>
          </div>
          <div 
            class="chat-card__center" 
            @click="$emit('item-click',item,$refs.swipeItem[index],index)">
            <h4 class="chat-card__title">{{ item.title }}</h4>
            <p :class="{ 'chat-card__text' : true, 'chat-card__text-active': (item.text == '[红包]' || item.text == '[礼物]') && item.badgeNum }">{{ item.text }}</p>
          
          </div>
          <div 
            class="chat-card__right" 
            @click="$emit('item-click',item,$refs.swipeItem[index],index)">
            <p class="chat-card__time">{{ item.time }}</p>
            <badge 
              v-if="item.badgeNum"
              :num="item.badgeNum"
              class="chat-card__badge"/>
          </div>
        </cube-swipe-item>
      </base-list-item> 
    </base-list>
  </cube-swipe>
</template>

<script>
import { BaseList, BaseListItem } from '@/components/list/BaseList/index.js'
import Avatar from '@/components/display/Avatar'
import Badge from '@/components/display/Badge'
export default {
  components: {
    Avatar,
    BaseList,
    BaseListItem,
    Badge
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          // {
          //   id: '',
          //   avatarUrl: 'http://119.27.167.20:8008//avatar/5bcd7a619fd05.jpg',
          //   title:
          //     '艾希啊啊啊啊啊啊艾希啊啊啊啊啊啊艾希啊啊啊啊啊啊艾希啊啊啊啊啊啊',
          //   text:
          //     '已收到订单, 会尽快确认已收到订单, 会尽快确认已收到订单, 会尽快确认已收到订单, 会尽快确认',
          //   time: '昨天22:44',
          //   badgeNum: 3,
          //   linkTo: '/msgCenter/chat/83bc9e06bb0e1426'
          // }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-list {
  /deep/ {
    .base-list-item {
      background-position: 67px bottom;
    }
    .base-list-item_card {
      padding-top: 0;
      padding-bottom: 0;
    }
    .base-list-item_card__center {
      padding-top: 0;
      padding-bottom: 0;
      margin-right: 0;
    }
    .avatar {
      width: 45px;
      height: 45px;
      margin-top: 16px;
      margin-bottom: 16px;
    }
  }
}
.chat-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chat-card__center {
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
  overflow: hidden;
}
.chat-card__right {
  padding-right: 8px;
}
.chat-card__title {
  margin-top: 12px;
  font-size: 17px;
  font-weight: normal;
  color: #1b1b1b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chat-card__text {
  margin-top: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #a3a2a8;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chat-card__text-active {
  color: #ff0000;
}
.chat-card__time {
  color: #a3a2a8;
  font-size: 14px;
}
.chat-card__badge {
  width: 100%;
  margin-top: 9px;
  text-align: right;
}
</style>
