/**
 * vue指令 v-input-adjust 调整底部输入框的位置
 */
import Vue from 'vue'

export default function() {
  // 调整移动端底部输入框的位置在屏幕中
  Vue.directive('input-adjust', {
    // 当被绑定的元素插入到 DOM 中时
    inserted(el) {
      let timer = null
      // 获得焦点时
      el.handleFoucus = function() {
        console.log('v-input-adjust 使输入框不被遮挡')
        if (timer) return
        timer = setTimeout(function() {
          document.body.scrollTop = document.body.scrollHeight
        }, 480)
      }
      // 失去焦点时
      el.handleBlur = function() {
        clearTimeout(timer)
        timer = null
        setTimeout(function() {
          document.body.scrollTop = document.body.scrollHeight
        }, 0)
      }
      // 注册事件
      el.addEventListener('focus', el.handleFoucus)
      el.addEventListener('blur', el.handleBlur)
    },
    // 指令与元素解绑时
    unbind(el) {
      // 移除事件
      el.removeEventListener('focus', el.handleFoucus)
      el.removeEventListener('blur', el.handleBlur)
    }
  })
}
