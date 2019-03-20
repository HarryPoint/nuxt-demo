<template>
  <section class="container">
    配置 Nuxt.js 应用生成静态站点的具体方式。

    当运行 nuxt generate 命令或在编码中调用 nuxt.generate() 时，Nuxt.js 会使用 generate 属性的配置。

    dir
    类型： 'String'
    默认值： 'dist'
    nuxt generate 生成的目录名称。

    devtools
    类型: boolean
    默认: false
    配置是否允许 vue-devtools 调试。

  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: $content-width;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
