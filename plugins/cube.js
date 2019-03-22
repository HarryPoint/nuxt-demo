/**
 * 注册cube-ui库
 */
import Vue from 'vue'
import Cube from 'cube-ui'
import '@/components/createApi/createLoginDialog'
import '@/components/createApi/createPaymentDialog'
import '@/components/createApi/createBindPhoneDialog'
import '@/components/createApi/createPaySuccessDialog'

export default ({}, inject) => {
  // 按需引入需要手动处理.按需引入体积反而过大!!!
  // Vue.use(Button)
  // Vue.use(TabBar)
  // Vue.use(TabPanels)
  // Vue.use(Scroll)
  // Vue.use(Slide)
  // Vue.use(IndexList)
  // Vue.use(Swipe)
  // Vue.use(Popup)
  // Vue.use(Toast)
  // Vue.use(Dialog)
  // Vue.use(TimePicker)
  // Vue.use(ActionSheet)
  // Vue.use(ImagePreview)
  // Vue.use(Input)
  // Vue.use(Textarea)
  // Vue.use(Rate)
  Vue.use(Cube)
  if (process.client) {
    // 联合注入
    inject('toast', (options = {}) => {
      return Cube.Toast.$create({
        ...{
          type: 'txt'
        },
        ...options
      }).show()
    })
  }
  if (process.server) {
    // 联合注入
    inject('toast', () => {
      return {
        hide: () => {},
        show: () => {}
      }
    })
  }
}
