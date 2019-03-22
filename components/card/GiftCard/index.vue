<template>
  <div class="gift-card">
    <div class="badge">
      <img
        :src="imgUrl" 
        class="img" 
        alt="">
      <span class="badge-num">{{ cNum }}</span>
    </div>
    <h5 class="title">{{ title }}</h5>
    <p class="price">{{ price }}</p>
    
  </div>
</template>

<script>
export default {
  props: {
    // 图片
    imgUrl: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 价格
    price: {
      type: [Number, String],
      default: ''
    },
    // 数量
    num: {
      type: [Number, String],
      default: 0
    },
    // 最大徽标数
    maxNum: {
      type: Number,
      default: 99
    }
  },
  computed: {
    // 实际显示的徽标数
    cNum() {
      if (typeof this.num === 'number') {
        return this.num > 99 ? this.maxNum + '+' : this.num
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gift-card {
  padding: 4px 0;
  font-size: 11px;
  text-align: center;
  line-height: 1.2;
}
.badge {
  position: relative;
  display: inline-block;
}
.badge-num {
  position: absolute;
  top: 0;
  right: 0;
  height: 16px;
  padding: 0 4px;
  font-size: 10px;
  color: #1b1b1b;
  line-height: 16px;
  white-space: nowrap;
  border-radius: 8px;
  background-color: #ffe84c;
  transform: translate(60%, -60%);
}
.img {
  height: 43px;
}
.title {
  font-size: 11px;
  color: #1b1b1b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price {
  color: #a3a2a8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
