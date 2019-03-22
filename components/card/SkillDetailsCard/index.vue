<template>
  <div class="skill-details-card">
    <div class="card-center">
      <!-- 标题 -->
      <h4 class="title">
        <span class="title-text">{{ title }}</span>
        <level-label
          :type="level" 
          class="title-label" />
      </h4>
      <!-- 价格 -->
      <p class="price"><strong>{{ price }}</strong><del>{{ originalPrice }}</del></p>
      <!-- 技能标签 -->
      <skill-tags-list 
        v-if="tags.length !== 0"
        :data="tags" 
        class="tags-ist"/>
      <!-- 播放按钮 -->
      <div 
        v-if="showBtnBtnPlay"
        class="btn-play" 
        @click="$emit('btn-play-click')">
        <image-icon type="voice-white"/><span class="btn-play-text">{{ btnPlayText }}</span>
      </div>
      <!-- 签名 -->
      <p class="signature">{{ signature }}</p>
    </div>
    <div class="card-left">
      <!-- 接单次数 -->
      <p class="order-times">{{ orderTimes }}</p>
      <!-- 优惠信息 -->
      <p 
        v-if="showDiscount" 
        class="discount">{{ discount }}</p>
    </div>
  </div>
</template>

<script>
import LevelLabel from '@/components/label/LevelLabel'
import SkillTagsList from '@/components/list/SkillTagsList'
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    LevelLabel,
    SkillTagsList,
    ImageIcon
  },
  props: {
    // 标题
    title: {
      type: String,
      default:
        '线下LOL线下LOL线下LOL线下LOL线下LOL线下LOL线下LOL线下LOL线下LOL线下LOL'
    },
    level: {
      type: String,
      default: '初级'
    },
    // 接单次数
    orderTimes: {
      type: String,
      default: '接单12次'
    },
    // 折扣信息
    discount: {
      type: String,
      default: '约3免1'
    },
    // 是否显示折扣信息
    showDiscount: {
      type: Boolean,
      default: false
    },
    // 价格
    price: {
      type: String,
      default: '30Y币/每小时'
    },
    // 原价
    originalPrice: {
      type: String,
      default: '40Y币/每小时'
    },
    // 个性签名
    signature: {
      type: String,
      default: '稳上分每一种奇怪现象的背后都有妖怪在作山'
    },
    // 播放按钮文字
    btnPlayText: {
      type: String,
      default: '10s'
    },
    // 是否展示播放按钮
    showBtnBtnPlay: {
      type: Boolean,
      default: true
    },
    // 标签列表
    tags: {
      type: Array,
      default() {
        return ['LOL', '带节奏']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.skill-details-card {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-size: 12px;
  line-height: 1.2;
  background-color: #fff;
}
.card-center {
  width: 0;
  flex: 1;
  margin-right: 16px;
}
.title {
  display: flex;
  align-items: center;
}
.title-text {
  font-size: 14px;
  font-weight: normal;
  color: #1b1b1b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-label {
  flex-shrink: 0;
}
.price {
  margin-top: 12px;
  strong {
    font-size: 15px;
    font-weight: normal;
    color: #fd5e68;
  }
  del {
    font-size: 12px;
    color: #999;
  }
}
.signature {
  margin-top: 13px;
  font-size: 13px;
  color: #1b1b1b;
}
.order-times {
  margin-top: 2px;
  font-size: 11px;
  text-align: right;
  color: #999;
}
.discount {
  display: block;
  width: 40.5px;
  height: 15px;
  margin-top: 12px;
  margin-left: auto;
  font-size: 10px;
  color: #1b1b1b;
  text-align: center;
  line-height: 15px;
  background-image: url('./images/bg-free.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.tags-ist {
  margin-top: 12px;
}
.btn-play {
  width: 85px;
  height: 28px;
  margin-top: 12px;
  font-size: 10px;
  line-height: 28px;
  color: #fff;
  text-align: center;
  background-image: linear-gradient(
    90deg,
    #ffd43f 32%,
    #ffc636 71%,
    #ffb72d 100%
  );
  border-radius: 14px;
}
.btn-play-text {
  margin-left: 22px;
}
</style>
