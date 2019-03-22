<template>
  <ul class="chat-msg-list">
    <li
      v-for="(item,index) in data"
      :key="item.id||index" 
      class="chat-msg-list__item">
      <!-- 文字消息 -->
      <chat-msg-card 
        v-if="item.itemType === 'text'"
        :avatar-url="item.avatarUrl" 
        :avatar-position="item.avatarPosition"
        :text="item.text"
        content-type="tail"
        @avatar-click="$emit('item-avatar-click',item,index)"
        @content-click="$emit('item-content-click',item,index)"/>
      <!-- 礼物消息 -->
      <chat-msg-gift-card 
        v-else-if="item.itemType === 'gift'"
        :avatar-url="item.avatarUrl"
        :avatar-position="item.avatarPosition" 
        :img-url="item.giftImgUrl"
        :op-text="item.giftOpText"
        :gift-name="item.giftName"
        :price="item.giftPrice"
        content-type="square"
        @avatar-click="$emit('item-avatar-click',item,index)"
        @content-click="$emit('item-content-click',item,index)"/>
      <!-- 红包消息 -->
      <chat-msg-gift-card 
        v-else-if="item.itemType === 'redPacket'"
        :avatar-url="item.avatarUrl"
        :avatar-position="item.avatarPosition" 
        :op-text="item.redPacketOpText"
        :img-url="require('./images/icon-redbag.png')"
        :gift-name="item.redPacketTitle"
        :price="item.redPacketPrice"
        content-type="square"
        @avatar-click="$emit('item-avatar-click',item,index)"
        @content-click="$emit('item-content-click',item,index)"/>
      <!-- 图片消息 -->
      <chat-msg-img-card 
        v-else-if="item.itemType === 'image'"
        :avatar-url="item.avatarUrl" 
        :avatar-position="item.avatarPosition" 
        :img-url="item.imgUrl"
        content-type="square"
        @avatar-click="$emit('item-avatar-click',item,index)"
        @content-click="$emit('item-content-click',item,index)"/>
      <!-- 语音消息 -->
      <chat-mag-voice-card 
        v-else-if="item.itemType === 'voice'"
        :avatar-url="item.avatarUrl" 
        :avatar-position="item.avatarPosition"
        :initial-audio-duration="item.initialAudioDuration"
        :audio-url="item.audioUrl"
        content-type="tail"
        @voice-click="$emit('voice-click',item,index)"/>
    </li>
  </ul>
</template>

<script>
import ChatMsgCard from '@/components/card/ChatMsgCard'
import ChatMsgGiftCard from '@/components/card/ChatMsgGiftCard'
import ChatMsgImgCard from '@/components/card/ChatMsgImgCard'
import ChatMagVoiceCard from '@/components/card/ChatMagVoiceCard'

export default {
  components: {
    ChatMsgCard,
    ChatMsgGiftCard,
    ChatMsgImgCard,
    ChatMagVoiceCard
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          // {
          //   id: '',
          //   // 消息的类型,gift:礼物,text:文本消息,image:图片消息,voice:语音
          //   itemType: 'text',
          //   avatarUrl: 'http://119.27.167.20:8008//avatar/5c05e18e1ef09.jpg',
          //   avatarPosition: 'left',
          //   contentType: 'tail',
          //   text: '即击倒，意思是被踢出去，也就是在格斗类游戏里被击败了',
          //   giftImgUrl: 'http://119.27.167.20:8008/gift/5a002610b1c02.gif',
          //   giftOpText: '收到',
          //   giftName: '礼物',
          //   giftPrice: '123Y币',
          //   imgUrl:
          //     'http://p.qpic.cn/opensdk_im/0/1747880695484334722_1968948460_161B6DA6E52593BC1CC917EB386F4A1B/720'
          //   voiceUrl: ''
          // }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-msg-list {
  padding: 16px 0;
}
.chat-msg-list__item {
  margin-top: 24px;
  &:first-child {
    margin-top: 0;
  }
}
</style>
