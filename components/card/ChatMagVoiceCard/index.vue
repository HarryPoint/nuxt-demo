<template>
  <chat-msg-card 
    v-bind="$attrs"
    :avatar-position="avatarPosition"
    :class="cCardClass"
    content-type="tail" 
    class="chat-mag-voice-card"
    v-on="$listeners"
    @content-click="handleContentClick">
    <!-- 头像在左侧时 -->
    <div 
      v-if="avatarPosition==='left'" 
      class="chat-msg-gift-center__left">
      {{ initialAudioDuration }}"
    </div>
    <div 
      v-if="avatarPosition==='left'" 
      class="chat-msg-gift-center__center">
      <image-icon-chat-audio 
        :playing="isAudioPlaying"/>
    </div>
    <!-- 头像在右侧时 -->
    <div 
      v-if="avatarPosition==='right'" 
      class="chat-msg-gift-center__left">
      <image-icon-chat-audio 
        :is-left="true"
        :playing="isAudioPlaying"/>
    </div>
    <div 
      v-if="avatarPosition==='right'" 
      class="chat-msg-gift-center__center">
      {{ initialAudioDuration }}{{ audioUrl }}"
    </div>
    <audio
      v-if="audioUrl" 
      ref="audio"
      :src="audioUrl"
      style="display: none"
      @playing="onAudioPlaying"
      @pause="onAudioPause"
      @ended="onAudioEnded"/>
  </chat-msg-card>
</template>

<script>
import ChatMsgCard from '@/components/card/ChatMsgCard'
import ImageIconChatAudio from '@/components/imageIcon/ImageIconChatAudio'
export default {
  components: {
    ChatMsgCard,
    ImageIconChatAudio
  },
  props: {
    //avatarPosition
    avatarPosition: {
      type: String,
      default: 'right'
    },
    // 初始的音频的长度
    initialAudioDuration: {
      type: Number,
      default: 0
    },
    // 音频的url
    audioUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 音频是否正在播放
      isAudioPlaying: false
    }
  },
  computed: {
    // card的class
    cCardClass() {
      return {
        right: this.avatarPosition === 'right'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('click', this.handleDocumentClick)
    })
  },
  beforeDestroy() {
    this.$refs && this.$refs.audio.pause()
    // 避免造成内存泄露
    document.removeEventListener('click', this.handleDocumentClick)
    this.$refs.audio === null
  },
  methods: {
    // handleContentClick
    handleContentClick() {
      // 要注意避免造成内存泄露
      window.$refsAudio = this.$refs.audio
      if (!this.$refs.audio) return
      if (this.isAudioPlaying) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
    },
    handleDocumentClick(e) {
      if (!this.$refs.audio) return
      if (window.$refsAudio !== this.$refs.audio) {
        this.$refs.audio.pause()
      }
    },
    // 音频播放时
    onAudioPlaying(event) {
      console.log('onAudioPlaying')
      this.isAudioPlaying = true
    },
    // 音频暂停时
    onAudioPause() {
      console.log('onAudioPause')
      this.isAudioPlaying = false
    },
    // 音频播放停止时
    onAudioEnded() {
      console.log('onAudioEnded')
      this.isAudioPlaying = false
      clearInterval(this.timer)
      this.audioCurrentTime = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-mag-voice-card {
  /deep/ {
    .chat-msg-card__center {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 1.2;
    }
  }
}
.chat-msg-gift-center__left {
  margin-right: 8px;
}
</style>
