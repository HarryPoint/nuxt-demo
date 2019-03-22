<template>
  <div>
    <link-poup-go-to-recharge v-if="cIs201902"/>
    <link-poup-go-to-download v-else-if="!isYeDone" />
  </div>
</template>

<script>
import LinkPoupGoToDownload from '@/components/display/LinkPopup/LinkPoupGoToDownload'
import LinkPoupGoToRecharge from '@/components/display/LinkPopup/LinkPoupGoToRecharge'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    LinkPoupGoToDownload,
    LinkPoupGoToRecharge
  },
  computed: {
    ...mapGetters('ua', ['isYeDone']),
    // 是否是2019年2月份
    cIs201902() {
      const now = this.$dayjs()
      return (
        now.isAfter(this.$dayjs('2019-01-31')) &&
        now.isBefore(this.$dayjs('2019-03-01'))
      )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
