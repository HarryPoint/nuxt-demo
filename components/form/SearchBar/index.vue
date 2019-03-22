<template>
  <div 
    class="search-bar">
    <input
      v-focus
      :value="value"
      class="search-bar-input"
      placeholder="搜索昵称"
      type="text"
      @input="$emit('input',$event.target.value)">
    <div
      v-show="!!value"
      class="btn-del" 
      @click="handleBtnDelClick">
      <image-icon type="delete" />
    </div>
    <!-- 加div是为了扩大点击区域 -->
    <div 
      class="btn-search" 
      @click="$emit('btn-search-click', value)">
      <image-icon type="search" />
    </div>
  </div>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    // 删除按钮点击事件
    handleBtnDelClick() {
      this.$emit('input', '')
      this.$emit('btn-del-click')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  // 搜索条
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding-left: 17px;
  background-color: #f7f7f7;
  border-radius: 15px;
}
.search-bar-input {
  // 搜索框
  flex: 1;
  height: 20px;
  margin-right: 8px;
  font-size: 13px;
  line-height: 20px;
  color: #1b1b1b;
  background-color: transparent;
  outline: none;
  &::placeholder {
    color: #a3a2a8;
  }
}
.btn-del {
  // 删除按钮
  width: 32px;
  text-align: right;
}
.btn-search {
  width: 32px;
  text-align: center;
}
</style>
