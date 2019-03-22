<template>
  <chat-msg-card 
    v-bind="$attrs"
    :content-type="contentType"
    class="chat-msg-gift-card" 
    v-on="$listeners">
    <div class="chat-msg-gift-card__left">
      <img 
        :src="imgUrl"
        class="gift-img" 
        alt="">
    </div>
    <div class="chat-msg-gift-card__center">
      <h4 class="gift-title">{{ opText }}<strong class="gift-name">{{ giftName }}</strong> </h4>
      <p class="gift-price">{{ price }}</p>
    </div>
  </chat-msg-card>
</template>

<script>
import ChatMsgCard from '@/components/card/ChatMsgCard'
export default {
  components: {
    ChatMsgCard
  },
  props: {
    contentType: {
      type: String,
      default: 'square'
    },
    // 礼物图片
    imgUrl: {
      type: String,
      default: 'http://119.27.167.20:8008/gift/5a002610b1c02.gif'
    },
    // 操作：收到还是送出
    opText: {
      type: String,
      default: '送出'
    },
    // 礼物名称
    giftName: {
      type: String,
      default: '礼物'
    },
    // 礼物价格
    price: {
      type: String,
      default: '123Y币'
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-msg-gift-card {
  /deep/ {
    .chat-msg-card__center {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 160px;
      line-height: 1.2;
    }
  }
}
.chat-msg-gift-card__center {
  flex: 1;
  overflow: hidden;
}
.gift-img {
  width: 45px;
  margin-right: 10px;
}
.gift-title {
  font-size: 13px;
  font-weight: normal;
  color: #1b1b1b;
}
.gift-name {
  margin-left: 4px;
  font-size: 13px;
  font-weight: normal;
  color: #fd5e68;
}
.gift-price {
  margin-top: 4px;
  font-size: 11px;
  color: #a3a2a8;
}
</style>
