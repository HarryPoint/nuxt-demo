<template>
  <ul class="refund-list">
    <li class="list-item"><image-icon 
      class="list-item-icon" 
      type="security"/><span>未开始随时退</span></li>
    <li class="list-item"><image-icon 
      class="list-item-icon" 
      type="alarm-clock"/><span>超时自动退</span></li>
    <li class="list-item"><image-icon 
      class="list-item-icon" 
      type="customer-service-small"/><span>不满意可退单</span></li>
  </ul>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  }
}
</script>

<style lang="scss" scoped>
.refund-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px;
  font-size: 11px;
  line-height: 1.2;
  color: #999;
  background-color: #fff;
}
.list-item {
  margin-left: 8px;
  &:first-child {
    margin-left: 0;
  }
}
.list-item-icon {
  margin-top: -2px;
  margin-right: 6px;
}
</style>
