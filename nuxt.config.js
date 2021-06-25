require('dotenv').config()
const contentfulClient = require('./plugins/contentful').default

const env = {
  BASE_URL: process.env.BASE_URL,
  CTF_SI: process.env.CTF_SI,
  CTF_CDA_AT: process.env.CTF_CDA_AT,
  CTF_CPA_AT: process.env.CTF_CPA_AT,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
}

const GTAGcode = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${env.GOOGLE_ANALYTICS_ID}');`

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
    },
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns fb#',
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
      { rel: 'icon', type: 'image/x-icon', href: '/icon/favicon.ico' },
      { rel: 'shortcut icon', href: '/icon/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icon/apple-touch-icon-180x180.png',
      },
      { rel: 'mask-icon', href: '/icon/safari-icon.svg', color: '#FFFFFF' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/icon/android-chrome-192x192.png',
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap',
      },
    ],
    script: [
      {
        hid: 'GTAGsrc',
        src:
          'https://www.googletagmanager.com/gtag/js?id=' +
          env.GOOGLE_ANALYTICS_ID,
        async: true,
      },
      {
        hid: 'GTAGcode',
        innerHTML: GTAGcode,
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      GTAGsrc: ['innerHTML'],
      GTAGcode: ['innerHTML'],
    },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/color-theme/light.styl',
    '@/assets/css/color-theme/dark.styl',
    '@/assets/css/style.styl',
    {
      src: '~/node_modules/highlight.js/styles/vs2015.css',
      lang: 'css',
    },
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/utils', '@/plugins/contentful'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  pwa: {
    manifest: {
      name: 'ふじぽんログ',
      short_name: 'ふ',
      description: 'ふじかわぽんずのブログ',
      icons: [
        {
          src: '/icon/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      start_url: '/?source=pwa',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      dir: 'ltr',
      lang: 'ja',
      useWebmanifestExtension: true,
    },
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://blog.fujikawaponzu.com',
    routes() {
      return Promise.all([
        contentfulClient.getEntries({
          content_type: 'blogPost',
        }),
      ]).then(([posts]) => {
        const array = [
          ...posts.items.map((post) => `/posts/${post.fields.slug}`),
        ]
        return array.reduce(
          (accumulator, currentValue) => accumulator.concat(currentValue),
          []
        )
      })
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config, ctx) {},
  },
}
