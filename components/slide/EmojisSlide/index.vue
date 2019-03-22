<template>
  <div class="emojis-slide">
    <cube-slide 
      ref="slide" 
      :data="cEmojisList"
      :auto-play="false" 
      :loop="false">
      <cube-slide-item 
        v-for="(emojisChunk, emojisChunkIndex) in cEmojisList"
        :key="emojisChunkIndex">
        <div class="emojis-chunk-card">
          <span
            v-for="(emojis,emojisIndex) in emojisChunk" 
            :key="emojisIndex"
            class="emojis-chunk-card__item" 
            @click="$emit('emojis-click',emojis)">{{ emojis }}</span>
          <span 
            class="emojis-chunk-card__item btn-del" 
            @click="$emit('btn-del-click')"><image-icon-chat-del/></span>
        </div>
      </cube-slide-item>
    </cube-slide>
    <div class="emojis-slide__footer">
      <button 
        class="btn-send" 
        @click="$emit('btn-send-click')">发送</button>
    </div>
  </div>
</template>

<script>
import fp from 'lodash/fp'
import { emojis } from '@/consts/emojis/index.js'
import ImageIconChatDel from '@/components/imageIcon/ImageIconChatDel'
export default {
  components: {
    ImageIconChatDel
  },
  data() {
    return {
      emojisList: emojis
    }
  },
  computed: {
    cEmojisList() {
      return fp.chunk(17, this.emojisList) || []
    }
  }
}
</script>

<style lang="scss" scoped>
.emojis-slide {
  /deep/ {
    .cube-slide {
      height: 197px;
    }
    .cube-slide-dots {
      bottom: 10px;
      span {
        height: 6px;
        width: 6px;
        margin: 0 3px;
        border-radius: 100%;
        background-color: #bbb;
        &.active {
          background-color: #838383;
        }
      }
    }
  }
}
.emojis-chunk-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  align-content: space-between;
  flex-wrap: wrap;
  height: 174px;
  .emojis-chunk-card__item {
    width: 16.6%;
    height: 58px;
    text-align: center;
    font-size: 24px;
    line-height: 58px;
  }
}
.emojis-slide__footer {
  border-top: solid 1px #f4f4f5;
}
.btn-send {
  display: block;
  width: 80px;
  height: 40xp;
  margin-left: auto;
  font-size: 15px;
  color: #1b1b1b;
  line-height: 40px;
  background-color: #fed101;
}
.btn-del {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
