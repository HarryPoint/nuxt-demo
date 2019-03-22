<template>
  <ul class="order-list">
    <li 
      v-for="(item,index) in data" 
      :key="item.id || index"
      class="order-list__item" 
      @click="$emit('item-click',item,index)">
      <nuxt-link :to="item.linkTo || ''">
        <!-- 卡片 -->
        <div class="order-card">
          <!-- 主体 -->
          <div class="order-card__content">
            <div class="order-card__content__left">
              <img 
                :src="item.avatar" 
                class="order-card__avatar" 
                alt="">
            </div>
            <div class="order-card__content__center">
              <div class="order-card__content__heder">
                <h4 class="order-card__title">{{ item.userName }}</h4>
                <age-label 
                  :age="item.age" 
                  :sex="item.sex" />
                <level-label :type="item.level"/>
                <!-- <vip-label 
                  v-if="item.level" 
                  :level="item.level"/> -->
                <exclusive-label 
                  v-if="item.exclusiveLabelText" 
                  :text="item.exclusiveLabelText"/>
              </div>
              <div class="order-card__text">
                <p class="order-card__subtitle">{{ item.skill }}</p>
                <p class="order-card__time">{{ item.orderDesc }}</p>
              </div>
            </div>
          </div>
          <!-- 尾部 -->
          <div class="order-card__footer">
            <div class="order-card__footer__center">
              {{ item.footerLeftTitle }}<strong>{{ item.price }}</strong>
            </div>
            <div class="order-card__footer__right">
              <p 
                :class="{
                  red: item.statusCode === 1
                }"
                class="order-card__status">{{ item.status }}</p>
              <button 
                v-if="item.statusCode === 1" 
                class="order-card__btn"
                @click.prevent="handleBtnClick(item,index)">付款</button>
              <button 
                v-else-if="[3,4].indexOf(item.statusCode) !== -1" 
                class="order-card__btn"
                @click.prevent="handleBtnClick(item,index)">完成</button>
              <button 
                v-else-if="item.statusCode === 5" 
                class="order-card__btn"
                @click.prevent="handleBtnClick(item,index)">评价</button>
            </div>
          </div>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import AgeLabel from '@/components/label/AgeLabel'
import LevelLabel from '@/components/label/LevelLabel'
import VipLabel from '@/components/label/VipLabel'
import ExclusiveLabel from '@/components/label/ExclusiveLabel'
export default {
  components: {
    AgeLabel,
    LevelLabel,
    VipLabel,
    ExclusiveLabel
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          // {
          //   // item的id
          //   id: '12312asd2',
          //   // 用户姓名
          //   userName: '甜甜百变蜜',
          //   avatar: '',
          //   // 性别
          //   sex: 'male',
          //   // 年龄
          //   age: '',
          //   // 技能名称
          //   skill: 'LOL',
          //   // 订单描述
          //   orderDesc: '9月27日 07：00 2小时',
          //   // 金额
          //   price: '250Y币',
          //   // 状态
          //   status: '已付款',
          //   // 状态码 参考http://192.168.1.219/snto_yay/doc/yayMobile.html#orderStatus
          //   statusCode: 1,
          //   linkTo: '',
          //   exclusiveLabelText: ''
          //   footerLefttitle: ''
          //   level: ''
          // }
        ]
      }
    }
  },
  methods: {
    // 列表按钮点击事件
    handleBtnClick(item, index) {
      this.$emit('item-btn-click', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list {
  padding: 22px 15px 22px 15px;
  background-color: #fff;
}
.order-list__item {
  margin-top: 22px;
  &:first-child {
    margin-top: 0;
  }
}
.order-card {
  min-height: 115px;
  padding: 10px;
  line-height: 1.2;
  font-size: 12px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 0px rgba(84, 84, 84, 0.15);
  border-radius: 5px;
}
.order-card__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: solid 1px #ddd;
}
.order-card__content__left {
  margin-right: 6px;
  height: 52px;
}
.order-card__avatar {
  position: relative;
  top: -23px;
  left: 0;
  width: 71px;
  height: 71px;
  box-shadow: 0px 1px 5px 0px rgba(84, 84, 84, 0.2);
}
.order-card__content__center {
  width: 0;
  flex: 1;
}
.order-card__content__heder {
  display: flex;
  align-items: center;
  /deep/ {
    .image-icon,
    .label-age,
    .level-label {
      flex-shrink: 0;
      margin-left: 4px;
    }
    .exclusive-label {
      width: 0;
      flex: 1;
      margin-left: 12px;
      .exclusive-label__text {
        min-width: initial;
        max-width: 100%;
      }
    }
  }
}
.order-card__title {
  max-width: 50%;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: normal;
  color: #1b1b1b;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.order-card__text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 9px;
  font-size: 13px;
  color: #a3a2a8;
}
.order-card__subtitle {
  width: 0;
  flex: 1;
  margin-right: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.order-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}
.order-card__footer__center {
  font-size: 13px;
  color: #a3a2a8;
  strong {
    font-size: 14px;
    color: #1b1b1b;
  }
}
.order-card__footer__right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-card__status {
  margin-right: 8px;
  font-size: 13px;
  color: #a3a2a8;
  &.red {
    color: #fd5e68;
  }
}
.order-card__btn {
  height: 30px;
  padding: 0 15px;
  font-size: 13px;
  color: #222;
  line-height: 30px;
  background-color: #fed101;
  border-radius: 15px;
  &.outline {
    color: #222;
    background-color: #fff;
    border-radius: 15px;
    border: solid 1px #222;
  }
}
</style>
