<template>
  <base-list class="payment-list">
    <base-list-item
      v-for="(item,index) in payments"
      :show-arrow="false"
      :key="item.id || index"
      :center-text="item.text" 
      center-text-align="left"
      @item-click="handleItemClick(item,index)">
      <image-icon-balance-b
        v-if="item.id === 'balance'" 
        slot="left"/>
      <image-icon-wechat-pay 
        v-if="item.id === 'wechat'" 
        slot="left"/>
      <image-icon-alipay
        v-if="item.id === 'alipay'" 
        slot="left"/>
      <image-icon-right-suc 
        v-if="item.id===value"
        slot="right"/>
    </base-list-item>
  </base-list>
</template>

<script>
import { BaseList, BaseListItem } from '@/components/list/BaseList/index.js'
import ImageIconRightSuc from '@/components/imageIcon/ImageIconRightSuc'
import ImageIconAlipay from '@/components/imageIcon/ImageIconAlipay'
import ImageIconWechatPay from '@/components/imageIcon/ImageIconWechatPay'
import ImageIconBalanceB from '@/components/imageIcon/ImageIconBalanceB'

export default {
  components: {
    BaseList,
    BaseListItem,
    ImageIconRightSuc,
    ImageIconAlipay,
    ImageIconWechatPay,
    ImageIconBalanceB
  },
  props: {
    // value,当前选中的支付方式的id
    value: {
      type: String,
      default: ''
    },
    // 要显示的支付方式
    payments: {
      type: Array,
      default() {
        return [
          { id: 'balance', text: '余额支付(余额:23Y)' },
          { id: 'wechat', text: '微信充值支付' },
          { id: 'alipay', text: '支付宝支付' }
        ]
      }
    }
  },
  methods: {
    handleItemClick(item, index) {
      this.$emit('input', item.id)
      this.$emit('item-click', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-list {
  /deep/ {
    .base-list-item {
      height: 50px;
    }
    .base-list-item_card {
      // 避免抖动,幺蛾子...
      height: 50px;
    }
    .base-list-item_card__left {
      // 避免选择的时候抖动
      min-width: 25.5px;
    }
  }
}
</style>
