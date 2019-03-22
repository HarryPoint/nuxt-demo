<template>
  <button 
    class="btn-operation" 
    @click="$emit('click')"><slot>操作按钮</slot></button>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.btn-operation {
  display: block;
  width: 320px;
  height: 45px;
  margin: 26px auto 0 auto;
  font-size: 16px;
  color: #1b1b1b;
  line-height: 45px;
  text-align: center;
  border: none;
  outline: none;
  background-color: #fed101;
  border-radius: 23px;
}
</style>
