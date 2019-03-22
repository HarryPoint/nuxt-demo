<template>
  <div 
    class="chat-skill-card" 
    @click="$emit('card-click')">
    <div class="chat-skill-card__left">
      <img 
        :src="imgUrl"
        class="chat-skill-card__img" 
        alt="">
    </div>
    <div class="chat-skill-card__center">
      <h4 class="chat-skill-card__title">{{ title }}</h4>
      <p class="chat-skill-card__desc">{{ desc }}</p>
    </div>
    <div class="chat-skill-card__right">
      <button 
        v-if="showBtn"
        class="btn-operation" 
        @click.stop="$emit('btn-operation-click')">{{ btnText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 技能图片
    imgUrl: {
      type: String,
      default: 'http://119.27.167.20:8008/product/5c0654818e448.png'
    },
    // 标题
    title: {
      type: String,
      default: '绝地求生'
    },
    // 文字描述
    desc: {
      type: String,
      default: '9Y币/半小时'
    },
    // 操作按钮文字
    btnText: {
      type: String,
      default: '下单'
    },
    // 是否显示操作按钮
    showBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-skill-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 15px;
  font-size: 12px;
  line-height: 1.2;
  background: #fff;
}
.chat-skill-card__left {
  margin-right: 10px;
}
.chat-skill-card__center {
  width: 0;
  flex: 1;
}
.chat-skill-card__right {
  margin-left: 10px;
}
.chat-skill-card__img {
  width: 40px;
  height: 40px;
}
.chat-skill-card__title {
  font-size: 15px;
  font-weight: normal;
  color: #000000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chat-skill-card__desc {
  margin-top: 3px;
  font-size: 14px;
  color: #fd5e68;
}
.btn-operation {
  min-width: 55px;
  height: 28px;
  font-size: 14px;
  color: #1b1b1b;
  line-height: 28px;
  text-align: center;
  background-color: #fed101;
  border-radius: 14px;
}
</style>
