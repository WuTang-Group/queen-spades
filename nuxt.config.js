
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  //mode: 'universal',
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      lang: "zh-CN",
      dir: "ltr",
      class: "js no-touch mti-inactive"
    },
    title: 'QUEEN SPADES',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/common/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/common/styles2.css' },
      { rel: 'stylesheet', href: '/css/common/style.css' }
    ],
    script: [
      { src: '/js/common/jquery-2.1.1.min.js', type: 'text/javascript', charset: 'utf-8' },
      { src: '/js/common/jquery-ui.min.js', type: 'text/javascript', charset: 'utf-8' },
      { src: '/js/common/jquery.validate.min.js', type: 'text/javascript', charset: 'utf-8' },
      { src: '/js/common/bootstrap.min.js', type: 'text/javascript', charset: 'utf-8' }
    ],
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [{
    src: '~plugins/element-ui',
    ssr: true
  }, {
    src: '~plugins/element-china-area-data',
    //ssr: false
    //mode: 'client'
  }],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  router: {
    prefetchLinks: false,
    middleware: 'axiosMiddle'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    proxy: true, // 表示开启代理
    //prefix: '/api', // 表示给请求url加个前缀 /api
    //credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/storeApi': {
      target: 'http://120.79.173.163:9100', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/storeApi': '', // 把 /api 替换成‘’
      }
    }
  },
  build: {
    vendor: ['axios'],
    extractCSS: { allChunks: true },
    babel: {        //配置按需引入规则
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
  },
}
