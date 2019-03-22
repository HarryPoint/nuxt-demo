<template>
  <div class="skill-recommend-okami">
    <!-- header -->
    <div 
      v-if="showHeader" 
      class="header">
      <h3 class="title">{{ title }}</h3>
      <div 
        class="btn-more" 
        @click="$emit('btn-more-click')">更多<image-icon 
          class="btn-more_icon" 
          type="arrow" /></div>
    </div>
    <!-- 列表 -->
    <ul class="list">
      <li 
        v-for="(item, index) in data" 
        :key="item.id || index"
        class="list-item" 
      >
        <nuxt-link 
          :event="getEvent(item)"
          :to="item.linkTo || ''"
          class="list-card"
          @click.native="$emit('item-click',item,index)"
        >
          <div class="img-card">
            <img
              :src="item.avatar"
              :alt="item.avatarAlt" 
              class="list-card_avatar">
            <div 
              v-if="item.labelsArr && item.labelsArr.length !== 0" 
              class="img-card__footer">
              <!-- 圣诞活动功能 -->
              <okami-identity-label-list
                v-if="item.labelsArr && item.labelsArr.length !== 0" 
                :label-data="item.labelsArr"
                type="small" 
                class="identity-label-list"/>
            </div>
          </div>
          <p class="list-card_row">
            <span class="list-card_name">{{ item.name }}</span>
            <age-label
              :sex="item.sex"
              :age="item.age"
              class="age-label"
            />
            <level-label 
              :type="item.level" 
              :text="item.level" 
              class="list-card_level"/>
          </p>
          <p class="list-card_row">
            <span class="list-card_order-times">接单{{ item.orderTimes }}次</span>
            <span class="list-card_price">{{ item.price }}</span>
          </p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
import LevelLabel from '@/components/label/LevelLabel'
import AgeLabel from '@/components/label/AgeLabel'
import OkamiIdentityLabelList from '@/components/list/OkamiIdentityLabelList'

export default {
  components: {
    ImageIcon,
    LevelLabel,
    AgeLabel,
    OkamiIdentityLabelList
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    // 是否展示header
    showHeader: {
      type: Boolean,
      default: true
    },
    // 列表数据
    data: {
      type: Array,
      default() {
        return [
          // {
          //   id: '',
          //   avatar: 'http://119.27.167.20:8008//avatar/5ba1f8383c300.png',
          //   avatarAlt: '',
          //   name: '小猫',
          //   age: 22,
          //   level: '高级',
          //   price: '99/小时',
          //   orderTimes: 123,
          //   sex: 'male',
          //   linkTo: '/'
          //   labelsArr: []
          // }
        ]
      }
    }
  },
  methods: {
    getEvent(item = {}) {
      if (this.$listeners['item-click']) return ''
      return !!item.linkTo ? 'click' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.skill-recommend-okami {
  padding-bottom: 16px;
  line-height: 1.2;
}
.header {
  // header
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  // 标题
  width: 0;
  padding-top: 12px;
  margin-bottom: 12px;
  flex: 1;
  font-size: 14px;
  font-weight: normal;
  columns: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-more {
  // 更多按钮
  font-size: 12px;
  color: #a3a2a8;
  vertical-align: middle;
}

.btn-more_icon {
  // 更多按钮 图标
  margin-top: -2px;
  margin-left: 6px;
}

.list {
  // 大神列表
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

.list-item {
  margin-top: 18px;
  &:nth-child(-n + 2) {
    margin-top: 0;
  }
}

.list-card {
  display: block;
  width: 168px;
}

.img-card {
  font-size: 0;
  position: relative;
  .identity-label-list {
    padding: 0 4px;
    color: #fff;
  }
}

.img-card__footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 51px;
  background-image: linear-gradient(
    to top,
    rgba($color: #222, $alpha: 0.6) 0,
    rgba($color: #222, $alpha: 0) 100%
  );
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  .identity-label-list {
    position: absolute;
    left: 0;
    bottom: 6px;
    width: 100%;
    padding: 0 4px;
    color: #fff;
  }
}
.list-card_avatar {
  // 大神头像
  width: 168px;
  height: 168px;
  border-radius: 6px;
}
.list-card_row {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}
.list-card_name {
  font-size: 13px;
  color: #1b1b1b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-card_age {
  font-size: 13px;
}
.list-card_order-times {
  margin-right: auto;
  font-size: 11px;
  color: #999;
}
.list-card_price {
  font-size: 11px;
  color: #f94e56;
}
.age-label {
  margin-left: 9px;
  margin-right: 3px;
  flex-shrink: 0;
}
.list-card_level {
  flex-shrink: 0;
}
</style>
