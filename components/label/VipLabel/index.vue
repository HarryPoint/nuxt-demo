<template>
  <image-icon :type="`vip-${cLevel}`" />
</template>

<script>
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  props: {
    // vip级别,如果是字符串要最好是/^vip\d$/
    level: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    cLevel() {
      if (typeof this.level === 'string') {
        return this.level.replace(/[a-zA-Z]*/, '')
      }
      return '' + this.level
    }
  }
}
</script>

<style scoped>
</style>
