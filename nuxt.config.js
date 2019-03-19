const pkg = require('./package')

const apiUrl =
  process.env.TEST === 'true'
    ? 'http://test.api.yay.com.cn'
    : 'https://api.yay.com.cn'
module.exports = {
  mode: 'universal',
  // 环境变量(可能有些环境变量还没用起来)
  env: {
    isTest: process.env.TEST === 'true',
    apiUrl
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/element-ui', '@/plugins/axios'],

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
    '**/*.json': {
      target: apiUrl,
      pathRewrite: {
        // '^/api': '/'
      }
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
    }
  }
  // sassResources: ['@/assets/utils.scss']
}
