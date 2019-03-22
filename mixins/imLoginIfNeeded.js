import { mapGetters } from 'vuex'

// 可行的话进行im登录
export default {
  computed: {
    ...mapGetters('user', ['authentication'])
  },
  watch: {
    authentication: {
      handler(val) {
        if (val && this.$store.state.user.user.un_bind_phone === 0) {
          this.$store.dispatch('im/imLoginIfNeeded')
        }
      },
      immediate: true
    }
  },
  mounted() {}
}
