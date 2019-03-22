<template>
  <div class="okami-personal-list">
    <ul class="list">
      <li 
        class="list-item" 
        @click="$emit('item-click','hobby')">
        <div class="list-card">
          <div class="list-card-left">
            <h4 class="title">爱好</h4>
          </div>
          <div class="list-card-center">
            <p class="text">{{ hobby }}</p> 
          </div>
        </div>
      </li>
      <li 
        class="list-item" 
        @click="$emit('item-click','signature')">
        <div class="list-card">
          <div class="list-card-left">
            <h4 class="title">签名</h4>
          </div>
          <div class="list-card-center">
            <p class="text">{{ signature }}</p>
          </div>
        </div>
      </li>
      <li 
        class="list-item" 
        @click="$emit('item-click','gift')">
        <div class="list-card">
          <div class="list-card-left">
            <h4 class="title">
              礼物
              <span class="subtitle">{{ giftNumber }}</span>
            </h4>
          </div>
          <div class="list-card-center">
            <gifts-list :data="giftsList" />
          </div>
          <div class="list-card-right">
            <image-icon type="arrow" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
import GiftCard from '@/components/card/GiftCard'
import GiftsList from '@/components/list/GiftsList'
export default {
  components: {
    ImageIcon,
    GiftCard,
    GiftsList
  },
  props: {
    // 爱好
    hobby: {
      type: String,
      default: ''
    },
    // 签名
    signature: {
      type: String,
      default: ''
    },
    // 礼物总数
    giftNumber: {
      type: [Number, String],
      default: 0
    },
    // 礼物列表
    giftsList: {
      type: Array,
      default() {
        return [
          // {
          //   imgUrl: 'http://119.27.167.20:8008//img/red_envelope.png',
          //   title: '红包红包红包红包红包',
          //   num: 99,
          //   price: '50Y币'
          // }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.okami-personal-list {
  font-size: 15px;
  line-height: 1.2;
  background-color: #fff;
}
.list {
  padding-left: 14px;
}
.list-item {
  padding: 10px 14px 10px 2px;
  border-bottom: solid 1px #f1f1f1;
}
.list-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list-card-left {
  width: 42px;
  text-align: center;
}
.list-card-center {
  flex: 1;
  margin: 0 14px;
}
.title {
  font-size: 15px;
  font-weight: normal;
  color: #a3a2a8;
}
.subtitle {
  display: block;
  font-size: 11px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text {
  font-size: 15px;
  color: #1b1b1b;
}
.gift-card {
  margin: 12px 12px 12px 0;
  display: inline-block;
  width: 60px;
}
</style>
