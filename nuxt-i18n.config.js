export default {
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
  langDir: 'locales/',
  vueI18n: {
    fallbackLocale: 'ja',
  },
  seo: false,
}