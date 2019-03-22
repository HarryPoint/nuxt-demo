<template>
  <img 
    v-show="show"
    class="download-img" 
    src="./images/download_enter.png"
    @click="download" >
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: false,
      whiteList: ['index', 'userCenter-orderList-type', 'userCenter']
    }
  },
  watch: {
    $route({ name }) {
      this.changeShow()
    }
  },
  mounted() {
    this.changeShow()
  },
  methods: {
    changeShow() {
      this.show = this.whiteList.indexOf(this.$route.name) !== -1
    },
    download() {
      window.location.href = 'http://www.yay.com.cn/h5/download.html'
    }
  }
}
</script>

<style lang="scss" scoped>
.download-img {
  width: 1.24rem;
  right: 0.42rem;
  bottom: 1.76rem;
  position: fixed;
  z-index: 1000;
}
</style>
