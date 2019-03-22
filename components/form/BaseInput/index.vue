// 有bug v-model
<template>
  <cube-input 
    v-bind="$attrs"
    :placeholder="placeholder"
    class="base-input" 
    v-on="$listeners"/>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    }
  }
}
</script>

<style>
</style>

<style lang="scss" scoped>
.base-input {
  margin-top: 12px;
  border: none;
  &::after,
  [class$='_active']::after {
    border: none;
  }
  /deep/ {
    .cube-input-field {
      color: #1b1b1b;
      &::placeholder {
        color: #a3a2a8;
      }
    }
  }
}
</style>
