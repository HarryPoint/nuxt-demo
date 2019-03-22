<template>
  <h3 class="base-list-title"><slot>{{ title }}</slot></h3>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '简单列表标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-list-title {
  height: 38px;
  padding-left: 16px;
  line-height: 38px;
  font-size: 14px;
  color: #a3a2a8;
}
</style>
