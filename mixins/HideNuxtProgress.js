let style

// 隐藏nuxt进度条 并在页面卸载的时候恢复显示
export default {
  mounted() {
    this.$nextTick(() => {
      this.hideNuxtProgress()
    })
  },
  methods: {
    hideNuxtProgress() {
      style = document.createElement('style')
      style.innerHTML = '.nuxt-progress{display:none;}'
      document.head.append(style)
      this.$once('hook:beforeDestroy', () => {
        document.head.removeChild(style)
      })
    }
  }
}
