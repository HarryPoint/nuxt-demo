<template>
  <div 
    :class="cCardClass" 
    class="chat-msg-card">
    <div class="chat-msg-card__left">
      <avatar 
        v-if="avatarPosition==='left'" 
        :url="avatarUrl" 
        @click.native="$emit('avatar-click')"/>
    </div>
    <div 
      :style="cContentStyle" 
      class="chat-msg-card__center" 
      @click="$emit('content-click')">
      <slot>
        <p class="chat-msg-card__text">{{ text }}</p>
      </slot>
    </div>
    <div class="chat-msg-card__right">
      <avatar 
        v-if="avatarPosition==='right'" 
        :url="avatarUrl"
        @click.native="$emit('avatar-click')"/>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/display/Avatar'
export default {
  components: {
    Avatar
  },
  props: {
    // 头像url,
    avatarUrl: {
      type: String,
      default: 'http://119.27.167.20:8008//avatar/5c05e18e1ef09.jpg'
    },
    // 头像位置 left:头像在左,right:头像在右
    avatarPosition: {
      type: String,
      default: 'left'
    },
    // 内容卡片类型,tail:有尾巴,square:方正有圆角
    contentType: {
      type: String,
      default: 'tail'
    },
    // 内容卡片的背景颜色 #ffe84c
    contentBgColor: {
      type: String,
      default: ''
    },
    // 文本内容
    text: {
      type: String,
      default: '即击倒，意思是被踢出去，也就是在格斗类游戏里被击败了'
    }
  },
  computed: {
    cCardClass() {
      return {
        'avatar--left': this.avatarPosition === 'left',
        'avatar--right': this.avatarPosition === 'right',
        'content--tail': this.contentType === 'tail',
        'content--square': this.contentType === 'square'
      }
    },
    cContentStyle() {
      return {
        backgroundColor: this.contentBgColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-msg-card {
  display: flex;
  align-items: flex-end;
  line-height: 1.2;
  /deep/ {
    .avatar {
      width: 35px;
      height: 35px;
    }
  }
  &.avatar--right {
    justify-content: flex-end;
    .chat-msg-card__center {
      background-color: #ffe84c;
      border-radius: 20px 20px 0px 20px;
    }
  }
  &.content--square {
    .chat-msg-card__center {
      padding: 8px;
      background-color: #fff;
      box-shadow: 0px 2px 5px 0px rgba(182, 182, 182, 0.2);
      border-radius: 4px;
    }
  }
}
.chat-msg-card__left {
  margin-left: 15px;
  font-size: 0;
}
.chat-msg-card__center {
  max-width: 250px;
  padding: 10px 16px;
  margin-left: 12px;
  margin-right: 15px;
  background-color: #fff;
  border-radius: 20px 20px 20px 0px;
  border: solid 1px #e5e5e5;
}
.chat-msg-card__right {
  font-size: 0;
  margin-right: 15px;
}
.chat-msg-card__text {
  font-size: 16px;
  line-height: 1.32;
  color: #1b1b1b;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
