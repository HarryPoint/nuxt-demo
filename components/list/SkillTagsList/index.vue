<template>
  <ul
    class="tags-list">
    <li class="tags-list-item"><image-icon type="label" /></li>
    <li 
      v-for="(item,index) in data" 
      :key="index" 
      class="tags-list-item">{{ item }}</li>
  </ul>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-list {
  // 标签列表
  margin: 0 2px;
  display: flex;
}
.tags-list-item {
  margin-right: 8px;
  font-size: 12px;
  color: #a3a2a8;
  white-space: nowrap;
}
</style>
