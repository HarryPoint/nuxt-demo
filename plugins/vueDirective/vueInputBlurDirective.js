/**
 * vue指令 v-click-input-blur 容器点击时内部的input textarea失去焦点
 */
import Vue from 'vue'

export default () => {
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('click-input-blur', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el) {
      el.handleClick = function(e) {
        console.log('v-click-input-blur')
        const nodeName = e.target.nodeName.toLowerCase()
        if (nodeName === 'input' || nodeName === 'textarea') return
        const nodes = document.querySelectorAll('input,textarea')
        for (let i = 0, len = nodes.length; i < len; i++) {
          if (document.activeElement === nodes[i]) {
            nodes[i].blur()
          }
        }
      }
      // 监听点击事件
      el.addEventListener('click', el.handleClick)
    },
    // 指令与元素解绑时
    unbind(el) {
      // 移除事件
      el.removeEventListener('click', el.handleClick)
    }
  })
}
