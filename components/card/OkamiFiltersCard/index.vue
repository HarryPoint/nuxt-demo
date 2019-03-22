<template>
  <div class="okami-filters-card">
    <div class="okami-filters-card__header">
      <h4 class="okami-filters-card__title">筛选</h4>
      <button 
        class="btn-confirm" 
        @click="handleBtnConfirmClick">确定</button>
    </div>
    <!-- 区域选择 -->
    <dl class="option-list">
      <dt class="option-list__header">
        <span class="option-list__title">区域</span>
        <button 
          class="option-list__more" 
          @click="handleBtnMoreClick('更多')">更多<image-icon-arrow/></button>
      </dt>
      <dd 
        v-for="(city,index) in hotCityList" 
        :key="index" 
        :class="{active:currentCity === city}" 
        class="option-list__item"
        @click="handleOptionListItemClick('currentCity',city)">{{ city }}</dd>
    </dl>
    <!-- 性别选择 -->
    <dl class="option-list">
      <dt class="option-list__header">
        <span class="option-list__title">性别</span>
      </dt>
      <dd 
        v-for="sex in sexList" 
        :key="sex.id" 
        :class="{active:currentSex === sex.id}" 
        class="option-list__item"
        @click="handleOptionListItemClick('currentSex',sex.id)">{{ sex.text }}</dd>
    </dl>
    <!-- 等级选择 -->
    <dl class="option-list">
      <dt class="option-list__header">
        <span class="option-list__title">等级</span>
      </dt>
      <dd 
        v-for="level in levelList" 
        :key="level.id" 
        :class="{active:currentLevel === level.id}" 
        class="option-list__item"
        @click="handleOptionListItemClick('currentLevel',level.id)">{{ level.text }}</dd>
    </dl>
  </div>
</template>

<script>
import ImageIconArrow from '@/components/imageIcon/ImageIconArrow'
export default {
  components: {
    ImageIconArrow
  },
  props: {
    // 默认选中的城市
    initialCity: {
      type: String,
      default: '全部'
    },
    // 默认选中的性别
    initialSex: {
      type: Number,
      default: 3
    },
    // 默认选中的级别
    initialLevel: {
      type: [String, Number],
      default: 'all'
    },
    // 热门城市列表
    hotCityList: {
      type: Array,
      default() {
        return ['全部', '北京', '上海', '苏州', '广州', '深圳', '重庆']
      }
    },
    // 性别列表0：男 ；1：女； 3：所有性别
    sexList: {
      type: Array,
      default() {
        return [
          {
            id: 3,
            text: '全部'
          },
          {
            id: 0,
            text: '男'
          },
          {
            id: 1,
            text: '女'
          }
        ]
      }
    },
    // 等级
    levelList: {
      type: Array,
      default() {
        return [
          {
            id: 'all',
            text: '全部'
          },
          {
            id: 1,
            text: '初级'
          },
          {
            id: 2,
            text: '中级'
          },
          {
            id: 3,
            text: '高级'
          }
        ]
      }
    }
  },
  data() {
    return {
      currentCity: this.initialCity,
      currentSex: this.initialSex,
      currentLevel: this.initialLevel
    }
  },
  watch: {
    // 感觉这里的处理不是很好
    initialCity(val) {
      this.currentCity = val
    }
  },
  methods: {
    // 列表项点击事件
    handleOptionListItemClick(key, value) {
      this[key] = value
    },
    // 确定按钮点击事件
    handleBtnConfirmClick() {
      this.$emit('btn-confirm-click', {
        city: this.currentCity,
        sex: this.currentSex,
        level: this.currentLevel
      })
    },
    // 更多按钮点击事件
    handleBtnMoreClick(title) {
      this.$emit('btn-more-click', title)
    }
  }
}
</script>

<style lang="scss" scoped>
.okami-filters-card {
  background-color: #fff;
}
.okami-filters-card__header {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.2;
  background-color: #f7f7f7;
}
.okami-filters-card__title {
  flex: 1;
  padding-left: 55px;
  font-size: 16px;
  font-weight: normal;
  color: #1b1b1b;
  text-align: center;
}
.btn-confirm {
  margin-right: 11px;
  font-size: 16px;
  color: #a3a2a8;
}
.option-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 13px;
  line-height: 1.2;
}
.option-list__header {
  width: 100%;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.2;
}
.option-list__title {
  font-size: 13px;
  font-weight: normal;
  color: #999999;
}
.option-list__more {
  padding: 0;
  font-size: 12px;
  color: #a3a2a8;
  /deep/ {
    .image-icon {
      margin-top: -4px;
      margin-left: 7px;
    }
  }
}
.option-list__item {
  min-width: 75px;
  height: 30px;
  margin-right: 10px;
  margin-top: 13px;
  padding: 0 10px;
  font-size: 13px;
  color: #a3a2a8;
  line-height: 30px;
  text-align: center;
  border-radius: 15px;
  border: solid 1px #e5e5e5;
  &.active {
    color: #1b1b1b;
    background-color: #fed62c;
    border-color: #fed62c;
  }
}
</style>
