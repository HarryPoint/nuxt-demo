const pkg = require('./package')
const apiUrl =
  process.env.TEST === 'true'
    ? 'https://test.m.yay.com.cn'
    : 'https://m.yay.com.cn'
module.exports = {
  mode: 'universal',
  // 环境变量(可能有些环境变量还没用起来)
  env: {
    // 是否使用正式服的API,若为apiFormal就是要使用正式服的api
    API_FORMAL: process.env.TEST !== 'true',
    // 区分目标环境,比如yueDong,v6
    PRODUCT_TARGET: process.env.PRODUCT_TARGET
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        // 改动：引入amfe-flexible，用于计算rem,库有改动,去掉了body上的fontSize
        src: '/js/amfe-flexible@2.2.1.custom.min.js'
      },
      {
        src: '/js/im/spark-md5.js'
      },
      {
        src: '/js/im/webim.js'
      },
      {
        src: '/js/base.js'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // 改动：引入插件
    { src: '~/plugins/vconsole', ssr: false },
    { src: '~/plugins/routerError', ssr: false },
    '~/plugins/utils',
    '~/plugins/dayjs',
    '~/plugins/cube',
    { src: '~/plugins/vueComponentsNoSSR', ssr: false },
    '~/plugins/vueDirective',
    '~/plugins/vueFilters',
    '~/plugins/api',
    '~/plugins/codeMessage',
    '~/plugins/axios',
    '~/plugins/fetchCatch',
    '~/plugins/imCatch',
    '~/plugins/ga/baiduGa',
    { src: '~/plugins/routerAfterEach', ssr: false },
    { src: '~/plugins/onNuxtReady', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    // your settings here
    sass: ['@/assets/utils.scss'], // alternative: scss
    less: [],
    stylus: []
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    credentials: true
  },
  proxy: {
    '/api/': {
      target: apiUrl
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.resolve.alias['cube-ui'] = 'cube-ui/lib'
    }
  }
}
