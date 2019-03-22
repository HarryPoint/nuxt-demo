<template>
  <ul class="coupons-list">
    <li 
      v-for="(item,index) in data" 
      :key="item.id"
      class="coupons-list__item"
      @click="$emit('item-click',item,index)">
      <div class="coupons-card">
        <div class="coupons-card__left">
          <p class="coupons-card__price">￥<strong>{{ item.price }}</strong></p>
          <p class="coupons-card__condition">{{ item.condition }}</p>
        </div>
        <div class="coupons-card__center">
          <h4 class="coupons-card__title"><span class="coupons-card__title__text">{{ item.title }}</span></h4>
          <p class="coupons-card__time">{{ item.time }}</p>
        </div>
        <div class="coupons-card__right">
          <image-icon-right-suc v-if="item.selected" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import ImageIconRightSuc from '@/components/imageIcon/ImageIconRightSuc'
export default {
  components: {
    ImageIconRightSuc
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          // {
          //   id: '-1',
          //   // 价格
          //   price: '10',
          //   // 使用条件
          //   condition: '满90可用',
          //   // 名称
          //   title:
          //     '王者荣耀专用王者荣耀专用王者荣耀专用王者荣耀专用王者荣耀专用',
          //   // 使用时间
          //   time: '2017.09.05-2017.09.20',
          //   // 收否选中
          //   selected: false
          // }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.coupons-list {
  margin-top: 10px;
}
.coupons-list__item {
  margin-top: 7px;
  &:first-child {
    margin-top: 0;
  }
}
.coupons-card {
  width: 331.5px;
  height: 83px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.2;
  background-image: url('./images/bg-coupon.png');
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}
.coupons-card__left {
  width: 102px;
  text-align: center;
}
.coupons-card__center {
  flex: 1;
  width: 0;
  margin-left: 18px;
  margin-right: 18px;
}
.coupons-card__right {
  margin-right: 11px;
}
.coupons-card__price {
  font-size: 15px;
  color: #1b1b1b;
  letter-spacing: -2px;
  strong {
    font-size: 30px;
    font-weight: normal;
  }
}
.coupons-card__condition {
  padding: 0 14px;
  font-size: 12px;
  color: #1b1b1b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coupons-card__title {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: normal;
  color: #1b1b1b;
}
.coupons-card__title__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coupons-card_label {
  flex-shrink: 0;
  width: 50px;
  height: 17px;
  font-size: 11px;
  color: #ffffff;
  text-align: center;
  line-height: 17px;
  border-radius: 3px;
  &.warning {
    background-color: #ff6d6d;
  }
}
.coupons-card__time {
  margin-top: 9px;
  font-size: 12px;
  color: #a3a2a8;
}
</style>
