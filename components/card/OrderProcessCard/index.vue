<template>
  <div class="order-progress-card">
    <div class="order-progress-card__content">
      <div class="order-progress-card__content__right">
        <img 
          :src="avatarUrl" 
          class="order-progress-card__avatar" 
          alt="">
      </div>
      <div class="order-progress-card__content__center">
        <h4 class="order-progress-card__title">{{ title }}</h4>
        <p class="order-progress-card_subtitle">
          <age-label 
            :age="age" 
            :sex="sex" />
          <vip-label :level="vipLevel"/>
        </p>
      </div>
      <div class="order-progress-card__content__left">
        <button 
          class="btn-contact" 
          @click="$emit('btn-contact-click')">{{ btnText }}</button>
        <button 
          class="btn-more" 
          @click="$emit('btn-more-click')">
          <image-icon-more
            v-if="showIconMore" 
            class="icon-more" />
        </button>
      </div>
    </div>
    <div class="order-progress-card__footer">
      <process-bar 
        :data="progressData" 
        :current-index="processCurrentIndex" />
    </div>
  </div>
</template>

<script>
import AgeLabel from '@/components/label/AgeLabel'
import VipLabel from '@/components/label/VipLabel'
import ProcessBar from '@/components/display/ProcessBar'
import ImageIconMore from '@/components/imageIcon/ImageIconMore'
export default {
  components: {
    AgeLabel,
    VipLabel,
    ProcessBar,
    ImageIconMore
  },
  props: {
    // 是否显示更多图标
    showIconMore: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 按钮文字
    btnText: {
      type: String,
      default: '联系TA'
    },
    // 性别
    sex: {
      type: [String, Number],
      default: ''
    },
    // 年龄
    age: {
      type: [String, Number],
      default: ''
    },
    // 头像
    avatarUrl: {
      type: String,
      default: ''
    },
    // vip级别
    vipLevel: {
      type: [String, Number],
      default: ''
    },
    // 进度条的data
    progressData: {
      type: Array,
      default() {
        return undefined
      }
    },
    // 当前进度index
    processCurrentIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.order-progress-card {
  padding: 8px;
  background-color: #ffe84c;
  border-radius: 14px;
  .btn-more {
    height: 22px;
    line-height: 22px;
  }
}

.order-progress-card__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.2;
}

.order-progress-card__avatar {
  width: 50px;
  height: 50px;
  border-radius: 3px;
}
.order-progress-card__content__center {
  width: 0;
  flex: 1;
  margin: 0 8px;
}
.order-progress-card__title {
  font-size: 15px;
  font-weight: normal;
  color: #1b1b1b;
}
.order-progress-card_subtitle {
  margin-top: 6px;
  /deep/ {
    .image-icon {
      margin-left: 4px;
    }
  }
}
.btn-contact {
  height: 22px;
  padding: 0 6px;
  font-size: 10px;
  color: #1b1b1b;
  text-align: center;
  line-height: 22px;
  border-radius: 4px;
  background-color: transparent;
  border: solid 1px rgba($color: #1b1b1b, $alpha: 0.4);
}
.order-progress-card__footer {
  margin-top: 16px;
}
</style>
