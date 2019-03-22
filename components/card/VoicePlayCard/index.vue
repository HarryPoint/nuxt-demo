<template>
  <div class="voice-play-card">
    <div class="voice-play-card__left">
      <span class="time">{{ btnAudioPlayText }}</span>
      <image-icon-voice-stop 
        v-if="isAudioPlaying" 
        @click.native="stopPlay"/>
      <image-icon-voice-play 
        v-else 
        @click.native="startPlay" />
    </div>
    <div class="voice-play-card__center">
      <img 
        v-if="isAudioPlaying"
        class="img-voice-wave"
        src="./images/icon-voice-wave-gif.gif" 
        alt="">
      <img
        v-else
        class="img-voice-wave"
        src="./images/icon-voice-wave.png" 
        alt="">
    </div>
    <div class="voice-play-card__right">
      <button 
        v-if="isIOS"><image-icon-voice-volume/></button>
      <button 
        v-else-if="isMute" 
        @click="turnOnVolume"><image-icon-voice-mute/></button>
      <button 
        v-else 
        @click="turnOffVolume"><image-icon-voice-volume/></button>

    </div>
    <audio
      v-if="audioUrl" 
      ref="audio"
      :src="audioUrl"
      :autoplay="false"
      :volume="initialIsMute ? 0 : 0.6"
      style="display: none"
      @playing="onAudioPlaying"
      @pause="onAudioPause"
      @ended="onAudioEnded"/>
  </div>
</template>

<script>
import fp from 'lodash/fp'
import { mapGetters } from 'vuex'
import ImageIconVoicePlay from '@/components/imageIcon/ImageIconVoicePlay'
import ImageIconVoiceMute from '@/components/imageIcon/ImageIconVoiceMute'
import ImageIconVoiceStop from '@/components/imageIcon/ImageIconVoiceStop'
import ImageIconVoiceVolume from '@/components/imageIcon/ImageIconVoiceVolume'
export default {
  components: {
    ImageIconVoicePlay,
    ImageIconVoiceMute,
    ImageIconVoiceStop,
    ImageIconVoiceVolume
  },
  props: {
    // 音频的地址
    audioUrl: {
      type: String,
      default: ''
    },
    // 是否正在播放,默认自动正在播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 初始是否静音
    initialIsMute: {
      type: Boolean,
      default: true
    },
    // 初始的音频长度
    initialAudioDuration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 音频是否正在播放
      isAudioPlaying: false,
      // 音频当前播放时间
      audioCurrentTime: 0,
      // 音频是否静音
      isMute: this.initialIsMute
    }
  },
  computed: {
    ...mapGetters('ua', ['isIOS']),
    btnAudioPlayText() {
      const time = fp.padCharsStart(
        '0',
        3,
        parseInt(this.initialAudioDuration - this.audioCurrentTime, 10) + '”'
      )
      return time
    }
  },
  mounted() {
    this.$nextTick(() => {
      const handleTouchstart = () => {
        console.log('touchstart')
        this.startPlay()
        document.removeEventListener('touchstart', handleTouchstart)
      }
      if (this.isIOS) {
        document.addEventListener('touchstart', handleTouchstart)
        this.$once('hook:beforeDestroy', function() {
          document.removeEventListener('touchstart', handleTouchstart)
        })
      }
      this.turnOffVolume()
      // autoPlay在uc浏览器有bug
      const timer = setTimeout(() => {
        if (this.isMute) {
          console.log('初始静音')
          this.turnOffVolume()
        }
        if (this.autoPlay) {
          console.log('初始自动播放')
          this.startPlay()
        }
      }, 500)
      this.$once('hook:beforeDestroy', function() {
        clearTimeout(timer)
      })
    })
  },
  methods: {
    // 设置静音
    turnOffVolume() {
      if (!this.$refs.audio) return
      this.isMute = true
      this.$refs.audio.volume = 0
    },
    // 取消静音
    turnOnVolume() {
      if (!this.$refs.audio) return
      this.isMute = false
      this.$refs.audio.volume = 0.6
    },
    // 开始播放
    // 停止播放
    startPlay() {
      console.log('开始播放音频1')
      if (!this.$refs.audio) return
      console.log('开始播放音频2')
      this.$refs.audio.play()
    },
    stopPlay() {
      if (!this.$refs.audio) return
      this.$refs.audio.pause()
      this.audioCurrentTime = 0
      this.$refs.audio.currentTime = 0
      clearInterval(this.timer)
    },
    // 音频播放时
    onAudioPlaying(event) {
      console.log('onAudioPlaying')
      this.isAudioPlaying = true
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        console.log('timer for 音频播放')
        this.audioCurrentTime = this.$refs.audio.currentTime
      }, 500)
      this.$once('hook:beforeDestroy', function() {
        clearInterval(this.timer)
      })
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
.voice-play-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 68px;
  padding: 0 15px;
  font-size: 12px;
  line-height: 1.2;
  background-color: #fff;
}
.img-voice-wave {
  width: 280px;
  max-width: 100%;
  height: 40px;
}
.voice-play-card__left {
  position: relative;
}
.voice-play-card__center {
  margin-left: 8px;
}
.time {
  position: absolute;
  top: -14px;
  left: 1px;
  display: block;
  width: 33px;
  font-size: 11px;
  color: #535353;
  text-align: center;
}
</style>
