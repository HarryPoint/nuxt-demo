<template>
  <div class="not-found-card">
    <img 
      :src="require('./images/not-found.png')"
      class="not-found-card_img" 
      alt="">
    <p class="not-found-card__text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '没有找到符合条件的大神'
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found-card {
  padding-top: 144px;
  padding-bottom: 32px;
  background-color: #fff;
}
.not-found-card_img {
  display: block;
  width: 90.5px;
  height: 79.5px;
  margin: 0 auto;
}
.not-found-card__text {
  margin-top: 20px;
  font-size: 12px;
  color: #a3a2a8;
  text-align: center;
}
</style>
