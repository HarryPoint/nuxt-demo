// 参考https://github.com/cube-ui/cube-application-guide/tree/ec5ca18854daf25706ba8751bad1c1270cb96675
<template>
  <div class="login-dialog">
    <cube-popup 
      ref="popup">
      <transition 
        enter-active-class="animated zoomIn fastest">
        <login-card 
          v-show="isShow"
          title="绑定手机号"
          @confirm="onConfirm" 
          @btn-code-click="handleBtnCodeClick"
          @btn-close-click="$router.push('/')"/>
      </transition>
    </cube-popup>
  </div>
</template>

<script>
import LoginCard from '@/components/card/LoginCard'
export default {
  name: 'BindPhoneDialog',
  components: {
    LoginCard
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      console.log('show BindPhoneDialog')
      this.$refs.popup.show()
      this.isShow = true
      this.$emit('show')
    },
    hide() {
      console.log('hide BindPhoneDialog')
      this.$refs.popup.hide()
      this.isShow = false
      this.$emit('hide')
    },
    // 确认事件
    onConfirm(obj) {
      // tel和code合法性不要过度依赖于LoginCard组件中的校验逻辑
      const { tel: mobilephone, code: captcha, validate } = obj
      if (!validate) return
      this.$toast({
        type: 'loading',
        txt: '正在绑定...',
        time: 0
      })
      this.$api
        .wxBindPhone({
          mobilephone,
          captcha
        })
        .then(({ data }) => {
          this.$toast({
            type: 'correct',
            txt: data.msg || '绑定成功'
          })
          // 刷新当前页面
          console.log('登录成功刷新当前页面')
          this.$router.go(0)
        })
        .catch(this.$fetchCatch)
    },
    // 获取验证码按钮点击事件
    handleBtnCodeClick(obj) {
      // tel的合法性在LoginCard里面已经校验过了
      const { tel, isFetching } = obj
      if (isFetching) return
      // 请求验证码
      this.$toast({
        type: 'loading',
        txt: '正在发生验证码',
        time: 0
      })
      this.$api
        .getSMSVerificationCode({
          mobilephone: tel
        })
        .then(({ data }) => {
          this.$toast({
            type: 'correct',
            txt: data.msg
          })
        })
        .catch(this.$fetchCatch)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
