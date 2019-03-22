/**
 * vue指令 v-focus autofocus
 */
import Vue from 'vue'

export default () => {
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el) {
      // 聚焦元素
      el.focus()
    }
  })
}
