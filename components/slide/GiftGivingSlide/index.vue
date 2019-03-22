<template>
  <div class="gift-giving-slide">
    <!-- 头部 -->
    <div class="gift-giving-slide__header">
      <h4 class="gift-giving-slide__title">赠送礼物</h4>
      <p class="gift-giving-slide__balance"><strong>余额:{{ balance }}</strong></p>
      <button 
        class="btn-recharge" 
        @click="handleBtnRechargeClick">充值<image-icon-arrow/></button>
    </div>
    <div class="gift-giving-slide__content">
      <cube-slide 
        ref="slide"
        :data="cGiftChunkArr" 
        :auto-play="false" 
        :loop="false"
        @click.native="$refs.input.blur()">
        <cube-slide-item 
          v-for="(giftChunk, cGiftChunkIndex) in cGiftChunkArr"
          :key="cGiftChunkIndex">
          <ul class="gift-chunk-list">
            <li 
              v-for="(gift,giftIndex) in giftChunk"
              :key="gift.id || giftIndex" 
              class="gift-chunk-list__item"
              @click="handleItemClick(gift,giftIndex)">
              <div
                :class="{
                  active: !customInputValue && gift.id === selectedGiftId
                }"
                class="gift-chunk-list__card">
                <img 
                  :src="gift.imgUrl"
                  class="gift-img" 
                  alt="">
                <p class="gift-title">{{ gift.title }}</p>
                <p class="gift-price">{{ gift.priceStr }}</p>
              </div>
            </li>
          </ul>
        </cube-slide-item>
      </cube-slide>
    </div>
    <!-- 尾部 -->
    <div class="gift-giving-slide__footer">
      <div class="money-input-wrap">
        <h5 
          v-show="inputFocus" 
          class="money-input-wrap__title">金额</h5>
        <input
          v-input-adjust
          ref="input" 
          v-model="customInputValue"
          :placeholder="inputPlaceholder"
          class="money-input-wrap__input" 
          type="number"
          @focus="inputFocus = true"
          @blur="inputFocus = false">
        <span 
          v-show="inputFocus" 
          class="money-input-wrap__unit">Y</span>
      </div>
      <button 
        class="btn-give" 
        @click="handleBtnGiveClick">赠送</button>
    </div>
  </div>
</template>

<script>
import fp from 'lodash/fp'
import ImageIconArrow from '@/components/imageIcon/ImageIconArrow'
export default {
  components: {
    ImageIconArrow
  },
  props: {
    // 余额
    balance: {
      type: [Number, String],
      default: 0
    },
    // 礼物列表数据
    giftData: {
      type: Array,
      default() {
        return [
          // {
          //   // id是必填的
          //   id: '1',
          //   title: '拍手',
          //   imgUrl: 'http://119.27.167.20:8008/gift/5a002610b1c02.gif',
          //   priceNum: 1,
          //   priceStr: '1Y币'
          // }
        ]
      }
    }
  },
  data() {
    return {
      // 选中的礼物的id
      selectedGiftId: undefined,
      // 输入的金额
      customInputValue: '',
      // 输入框是否获得焦点
      inputFocus: false
    }
  },
  computed: {
    // 礼物列表分块
    cGiftChunkArr() {
      return fp.chunk(10, this.giftData)
    },
    // 输入框的placeholder
    inputPlaceholder() {
      return this.inputFocus ? '输入金额' : '自定义金额'
    }
  },
  methods: {
    // 礼物项点击事件
    handleItemClick(item) {
      this.customInputValue = ''
      this.selectedGiftId = item.id
    },
    // 充值按钮点击事件
    handleBtnRechargeClick() {
      this.$emit('btn-recharge-click')
    },
    // 赠送按钮点击事件
    handleBtnGiveClick() {
      let options = {}
      if (this.customInputValue) {
        options = {
          type: 'custom',
          value: this.customInputValue
        }
      } else if (this.selectedGiftId) {
        options = {
          type: 'gift',
          giftId: this.selectedGiftId
        }
      } else {
        options = {
          type: ''
        }
      }
      this.customInputValue = ''
      this.$emit('btn-give-click', options)
    }
  }
}
</script>

<style lang="scss" scoped>
.gift-giving-slide {
  /deep/ {
    .cube-slide-dots {
      span {
        bottom: 14px;
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
.gift-giving-slide__header {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  font-size: 14px;
  line-height: 1.2;
}
.gift-giving-slide__balance {
  margin-left: auto;
}
.gift-giving-slide__title {
  font-size: 14px;
  font-weight: normal;
  color: #1b1b1b;
}
.gift-giving-slide__balance {
  font-size: 14px;
  color: #1b1b1b;
}
.btn-recharge {
  padding: 0;
  margin-left: 18px;
  margin-top: -2px;
  font-size: 15px;
  font-weight: normal;
  color: #fd5e68;
  /deep/ {
    .image-icon {
      margin-top: -1px;
      margin-left: 6px;
    }
  }
}
.gift-giving-slide__content {
  height: 255px;
  border-top: solid 1px #e5e5e5;
}
.gift-chunk-list {
  display: flex;
  flex-wrap: wrap;
  padding-top: 18px;
}
.gift-chunk-list__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
}
.gift-chunk-list__card {
  width: 74px;
  height: 106px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 2px transparent;
  &.active {
    border-color: #fed101;
  }
}

.gift-img {
  display: block;
  height: 42px;
  margin: 0 auto;
  margin-top: 15px;
}

.gift-title {
  width: 100%;
  margin-top: 7px;
  margin-bottom: 1px;
  font-size: 14px;
  font-weight: normal;
  color: #1b1b1b;
  text-align: center;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.gift-price {
  width: 100%;
  font-size: 13px;
  color: #a3a2a8;
  text-align: center;
}

.gift-giving-slide__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  padding: 0 15px;
  background-color: #f7f7f7;
}
.money-input-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 255px;
  height: 35px;
  padding: 0 11px;
  background-color: #ffffff;
  border-radius: 5px;
  border: solid 1px transparent;
  &:focus-within {
    border-color: #fed101;
  }
}
.money-input-wrap__title {
  margin-right: 11px;
  font-size: 13px;
  color: #1b1b1b;
}
.money-input-wrap__input {
  width: 130px;
  flex: 1;
  font-size: 13px;
  color: #a3a2a8;
  line-height: 35px;
  &:focus {
    text-align: right;
  }
}
.money-input-wrap__unit {
  margin-left: 11px;
  font-size: 13px;
  color: #1b1b1b;
}
.btn-give {
  width: 75px;
  height: 35px;
  font-size: 15px;
  color: #1b1b1b;
  line-height: 35px;
  text-align: center;
  background-color: #fed101;
  border-radius: 5px;
  border: solid 1px #fed101;
}
</style>
