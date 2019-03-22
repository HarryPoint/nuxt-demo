import { mapMutations } from 'vuex'

export default {
  mounted() {
    console.log(this.title)
    this.SET_TITLE(this.title)
  },
  methods: {
    ...mapMutations('navTopBar', ['SET_TITLE'])
  }
}
