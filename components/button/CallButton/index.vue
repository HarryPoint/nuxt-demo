<template>
  <button 
    class="btn-call" 
    @click="$emit('click')">呼叫</button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.btn-call {
  display: inline-block;
  width: 69px;
  height: 60px;
  padding: 0;
  padding-left: 3px;
  padding-right: 16px;
  font-size: 15px;
  font-weight: normal;
  color: #3b210a;
  line-height: 60px;
  vertical-align: middle;
  background-image: url('./images/bg-call.png');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
