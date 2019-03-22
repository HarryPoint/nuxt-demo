<template>
  <ul class="gifts-list">
    <li 
      v-for="(item,index) in data"
      :key="index" 
      class="list-item">
      <gift-card 
        :img-url="item.imgUrl"
        :num="item.num"
        :title="item.title"
        :price="item.price"
        class="gift-card"/>
    </li>
  </ul>
</template>

<script>
import GiftCard from '@/components/card/GiftCard'
export default {
  components: {
    GiftCard
  },
  props: {
    // 列表数据
    data: {
      type: Array,
      default() {
        return [
          {
            hobby: '',
            signature: '',
            giftNum: '',
            gifts: []
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gifts-list {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.gift-card {
  margin: 12px 12px 12px 0;
  width: 60px;
}
.list-item {
  &:last-child {
    margin-right: auto;
  }
}
</style>
