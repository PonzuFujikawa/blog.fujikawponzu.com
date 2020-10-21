import colors from 'vuetify/es5/util/colors'

require('dotenv').config()
const contentfulClient = require('./plugins/contentful').default

const env = {
  BASE_URL: process.env.BASE_URL,
  CTF_SI: process.env.CTF_SI,
  CTF_CDA_AT: process.env.CTF_CDA_AT,
  CTF_CPA_AT: process.env.CTF_CPA_AT,
}

export default {
  env,

  generate: {
    routes() {
      return Promise.all([
        contentfulClient.getEntries({
          content_type: 'blogPost',
        }),
      ]).then(([posts]) => {
        return [
          ...posts.items.map((post) => {
            return {
              route: `/posts/${post.fields.slug}`,
              payload: post,
            }
          }),
        ]
      })
    }
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      prefix: "og: http://ogp.me/ns# fb: http://ogp.me/ns fb#",
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keyword', content: 'ふじぽんログ,FujiPonLog' },
      { name: 'author', content: '@PonzuFujikawa' },
      { name: 'copyright', content: '&copy; 2020 fujikawaponzu.com' },
      { name: 'format-detection', content: 'telephone=no,email=no,address=no' },

      { name: 'theme-color', content: '#FFFFFF' },
      
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'msapplication-TileColor', content: '#FFFFFF' },
      { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@PonzuFujikawa' },
      { name: 'twitter:create', content: '@PonzuFujikawa' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      { rel: 'mask-icon', href: '/safari-icon.svg', color: '#FFFFFF' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap' }
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/style.styl'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/utils',
    '@/plugins/contentful',
    '@/plugins/markdownit',
    '@/plugins/i18n',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://i18n.nuxtjs.org/
    ['nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            name: 'English',
            file: 'en.json',
          },
          {
            code: 'ja',
            iso: 'ja-JP',
            name: '日本語',
            file: 'ja.json',
          },
        ],
      }
    ]
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        name: '日本語',
        file: 'ja.json',
      },
    ],
    defaultLocale: 'ja',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
    },
    lazy: true,
    langDir: "locales/",
    vueI18n: {
      fallbackLocale: 'ja',
    },
    seo: false,
  },


  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
