<template>
  <ul class="recharge-amounts-list">
    <li 
      v-for="(item,index) in data" 
      :key="item.id || index"
      :class="{
        active: index === selectedIndex
      }" 
      class="recharge-amounts-list__item"
      @click="handleItemClick(index)">
      <div class="recharge-amounts-card">
        ￥{{ item.amount }}
        <span 
          v-if="item.showBadge" 
          class="amounts-badge">送{{ item.discountAmount }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    // 列表数据
    data: {
      type: Array,
      default() {
        return [
          {
            // // id
            // id: undefined,
            // // 金额
            // amount: 6,
            // // 赠送金额
            // discountAmount: 4,
            // // 是否显示徽标数
            // showBadge: true
          }
        ]
      }
    },
    // .sync 当前选中的索引
    propSelectedIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 当前选中的索引
      selectedIndex: this.propSelectedIndex
    }
  },
  watch: {
    propSelectedIndex(val) {
      this.selectedIndex = val
    }
  },
  methods: {
    // 列表项点击事件
    handleItemClick(index) {
      this.selectedIndex = index
      this.$emit('update:propSelectedIndex', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge-amounts-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  line-height: 1.2;
  background-color: #fff;
}
.recharge-amounts-list__item {
  width: 33.333333%;
  text-align: center;
  margin-top: 19px;
  &:nth-child(-n + 3) {
    margin-top: 0;
  }
  &:nth-child(3n + 3) {
    text-align: right;
  }
  &:nth-child(3n + 1) {
    text-align: left;
  }
}
.recharge-amounts-card {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 35px;
  margin: 0 auto;
  font-size: 15px;
  color: #1b1b1b;
  line-height: 35px;
  text-align: center;
  background-color: rgba($color: #ececec, $alpha: 0.68);
  border-radius: 18px;
  .recharge-amounts-list__item.active &,
  &.active {
    background-color: #fed101;
  }
}
.amounts-badge {
  position: absolute;
  top: -9px;
  right: -5px;
  display: inline-block;
  height: 20px;
  padding: 0 10px;
  font-size: 10px;
  color: #ffffff;
  line-height: 20px;
  background-color: #e64441;
  border-radius: 10px;
}
</style>
