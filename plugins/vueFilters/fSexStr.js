/**
 * 转换性别数字对应为英文
 */
import Vue from 'vue'

export default () => {
  Vue.filter('fSexStr', function(value) {
    switch (value) {
      case 0:
        return 'male'
      case 1:
        return 'female'
      case 3:
        return 'all'
      default:
        return '' + value
    }
  })
}
