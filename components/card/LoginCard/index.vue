<template>
  <div 
    :class="loginCardClass" 
    class="login-card">
    <h4 class="title">{{ title }}</h4>
    <div 
      :class="telInputRowClass" 
      class="input-row" >
      <input 
        v-model="tel"
        class="input tel-input"
        placeholder="输入手机号" 
        type="number"
        @blur="refreshDocumentScrollTop">
    </div>
    <div 
      :class="codeInputRowClass" 
      class="input-row">
      <input 
        v-model="code"
        class="input code-input"
        placeholder="输入验证码"
        type="number"
        @blur="refreshDocumentScrollTop">
      <button 
        class="btn-code" 
        @click="handleBtnCodeClick">{{ btnCodeText }}</button>
    </div>
    <button 
      class="btn-confirm" 
      @click="handleBtnConfirmClick">确定</button>
    <image-icon-close-black 
      class="btn-close" 
      @click.native="$emit('btn-close-click')"/>
  </div>
</template>

<script>
import { cellPhoneNumberReg } from '@/consts/regular'
import ImageIconCloseBlack from '@/components/imageIcon/ImageIconCloseBlack'
const CODE_STATUS = {
  fetching: '正在获取验证码'
}
export default {
  name: 'LoginCard',
  components: {
    ImageIconCloseBlack
  },
  props: {
    title: {
      type: String,
      default: '账号登录'
    }
  },
  data() {
    return {
      // 手机号
      tel: '',
      // 验证码
      code: '',
      // 获取验证码的状态-
      fetchingCodeStatus: '',
      // 倒计时
      countDown: 60
    }
  },
  computed: {
    // 卡片的类
    loginCardClass() {
      return {
        active: this.validateTel && this.validateCode
      }
    },
    // tel-input-row的样式
    telInputRowClass() {
      return {
        active: this.tel
      }
    },
    // code-input-row的样式
    codeInputRowClass() {
      return {
        active: this.validateTel
      }
    },
    // 获取验证码按钮的文字
    btnCodeText() {
      return this.fetchingCodeStatus === CODE_STATUS.fetching
        ? `重新获取（${this.countDown}）`
        : '获取验证码'
    },
    // 手机号是否符合规则
    validateTel() {
      return cellPhoneNumberReg.test(this.tel)
    },
    // 验证码是否符合规则
    validateCode() {
      return this.code !== ''
    }
  },
  methods: {
    // 获取验证码按钮点击事件
    handleBtnCodeClick() {
      this.$emit('btn-code-click', {
        tel: this.tel,
        isFetching: this.fetchingCodeStatus === CODE_STATUS.fetching
      })
      if (this.fetchingCodeStatus === CODE_STATUS.fetching) {
        this.$toast({
          type: 'warn',
          txt: `请稍后再试`
        })
        return
      }
      if (!this.validateTel) {
        this.$toast({
          type: 'warn',
          txt: '请输入正确的手机号'
        })
        return
      } else {
        this.countDown = 60
        this.fetchingCodeStatus = CODE_STATUS.fetching
        this.timer = setInterval(() => {
          if (this.countDown <= 0) {
            clearInterval(this.timer)
            this.fetchingCodeStatus = ''
          }
          this.countDown--
        }, 1000)
        this.$once('hook:beforeDestroy', () => {
          console.log('hook:beforeDestroy')
          clearInterval(this.timer)
        })
      }
    },
    // 确定按钮点击事件
    handleBtnConfirmClick() {
      if (this.validateTel && this.validateCode) {
        this.$emit('confirm', {
          tel: this.tel,
          code: this.code,
          validate: true
        })
      } else {
        this.$emit('confirm', {
          tel: this.tel,
          code: this.code,
          validate: false
        })
        this.$toast({
          type: 'warn',
          txt: '手机号或验证码不正确'
        })
      }
    },
    // 用于解决bug WIFI-3137
    refreshDocumentScrollTop() {
      this.$nextTick(() => {
        console.log('fix bug WIFI-3137')
        document.body.scrollTop = document.body.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  position: relative;
  width: 320px;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
  color: #a3a2a8;
}
.title {
  padding-top: 20px;
  padding-left: 17px;
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: normal;
  color: #222;
  text-align: left;
}
.input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 290px;
  height: 45px;
  padding: 0 16px;
  margin: 20px auto 0 auto;
  border-radius: 23px;
  border: solid 1px #e5e5e5;
  overflow: hidden;
  &.active {
    color: #1b1b1b;
  }
}
.input {
  flex: 1;
  width: 0;
  font-size: 14px;
  color: inherit;
}
.btn-code {
  padding-left: 11px;
  padding-right: 0;
  margin-left: 11px;
  font-size: 14px;
  color: inherit;
  background-color: transparent;
  border-left: solid 1px #e5e5e5;
}
.btn-confirm {
  $height: 50px;
  display: block;
  width: 100%;
  height: $height;
  margin-top: 32px;
  font-size: 16px;
  color: #222222;
  text-align: center;
  line-height: $height;
  background-color: #e5e5e5;
  .login-card.active &,
  &.active {
    background-color: #fed62c;
  }
}
.btn-close {
  position: absolute;
  top: 15px;
  right: 14px;
}
</style>
