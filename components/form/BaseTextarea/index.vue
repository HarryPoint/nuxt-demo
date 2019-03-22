<template>
  <cube-textarea
    :auto-expand="false"
    :indicator="{remain:true,negative:false}" 
    :maxlength="maxlength"
    :placeholder="placeholder"
    v-bind="$attrs"
    class="base-textarea"
    v-on="$listeners"/>
</template>

<script>
export default {
  props: {
    maxlength: {
      type: Number,
      default: 40
    },
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
.base-textarea {
  height: 80px;
  margin-top: 12px;
  border: none;
  color: #1b1b1b;
  &::placeholder {
    color: #a3a2a8;
  }
  &::after,
  [class$='_active']::after {
    border: none;
  }
  /deep/ {
    .cube-textarea {
      font-family: inherit;
    }
  }
}
</style>
