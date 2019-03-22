<template>
  <div class="okami-matching-card">
    <!-- 不想再等了 -->
    <div 
      v-if="currentMatchingStatus === 'BEFORE_MATCHING'" 
      class="okami-matching-card__not-match">
      <div class="not-match__center">
        <h4 class="not-match__title">{{ beforeMatchingTitle }}</h4>
        <p class="not-match__text">{{ beforeMatchingText }}</p>
      </div>
      <div class="not-match__right">
        <call-button 
          class="btn-call" 
          @click="handleBtnCallClick" />
      </div>
    </div>
    <!-- 正在匹配 -->
    <div 
      v-if="currentMatchingStatus === 'MATCHING'"
      class="matching">
      <div class="matching__left">
        <i class="icon-matching animated infinite zoomIn fast"/>
      </div>
      <div class="matching__center">
        <p class="matching__text">{{ matchingText }}&nbsp;&nbsp;{{ timingText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CallButton from '@/components/button/CallButton'
export default {
  components: {
    CallButton
  },
  props: {
    // .sync 初始匹配状态 BEFORE_MATCHING:匹配前,MATCHING:匹配中,MATCHING_SUCCESS: 匹配成功,MATCHING_FAILURE:匹配失败
    matchingStatus: {
      type: String,
      default: 'BEFORE_MATCHING'
    },
    // 匹配开始的时间戳 10位或者13位
    startTimeStamp: {
      type: Number,
      default: +new Date()
    },
    // 开始匹配前面板的title
    beforeMatchingTitle: {
      type: String,
      default: '不想再等了！'
    },
    // 开始匹配前面板的描述
    beforeMatchingText: {
      type: String,
      default: '找个在线同资质大神为我服务'
    },
    // 正在匹配中的描述
    matchingText: {
      type: String,
      default: '正在为您匹配大神'
    }
  },
  data() {
    return {
      // 当前匹配状态
      currentMatchingStatus: this.matchingStatus,
      // 当前计时
      matchTimingText: '',
      timingText: ''
    }
  },
  computed: {
    // 格式化的开始时间戳,主要是处理unix时间戳
    cStartTimeStamp() {
      const str = '' + this.startTimeStamp
      if (str.length === 10) {
        return +(str + '000')
      }
      return this.startTimeStamp
    }
  },
  watch: {
    matchingStatus(val) {
      this.currentMatchingStatus = val
    },
    currentMatchingStatus: {
      handler(val) {
        this.$emit('update:matchingStatus', val)
        if (val === 'MATCHING') {
          this.startMatching()
        } else if (
          ['BEFORE_MATCHING', 'MATCHING_SUCCESS', 'MATCHING_FAILURE'].indexOf(
            val
          ) !== -1
        ) {
          clearInterval(this.timer)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 呼叫按钮点击事件
    handleBtnCallClick() {
      this.$emit('btn-call-click')
      // this.startMatching()
    },
    // 开始匹配
    startMatching() {
      this.timer = setInterval(() => {
        const now = +new Date()
        const diff = parseInt((now - this.cStartTimeStamp) / 1000)
        let mm = parseInt(diff / 60)
        let ss = diff % 60
        mm = mm <= 9 ? '0' + mm : mm
        ss = ss <= 9 ? '0' + ss : ss
        this.timingText = `${mm}:${ss}`
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.okami-matching-card {
  padding: 0 21px;
  background-image: linear-gradient(90deg, #ffdf0f 0%, #ffde04 100%);
}
.okami-matching-card__not-match {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 65px;
  font-size: 12px;
  line-height: 1.2;
  .btn-call {
    transform: translateY(2px);
  }
}
.not-match__title {
  font-size: 18px;
  font-weight: normal;
  color: #3b210a;
}
.not-match__text {
  margin-top: 1px;
  font-size: 15px;
  color: #3b210a;
  opacity: 0.75;
}
.matching {
  display: flex;
  align-items: center;
  min-height: 65px;
  font-size: 12px;
  line-height: 1.2;
}
.matching__center {
  margin-left: 12px;
}
.matching__text {
  font-size: 17px;
  color: #3b210a;
}
.icon-matching {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: solid 4px #5c320c;
  border-radius: 100%;
}
</style>
