export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Moafa | Dashboard',
      link: [
        // { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=2" },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
        }
      ],

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  },

  i18n: {
    baseUrl: 'http://localhost:3000',
    locales: [
      { code: 'en', file: 'en.ts', iso: 'en-US' },
      { code: 'ar', file: 'ar.ts', iso: 'ar-SY' }
    ],

    langDir: 'locale',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },

  vuetify: {
    moduleOptions: {
      styles: { configFile: '/assets/vuetify/settings.scss' }
    },

    vuetifyOptions: './vuetify.config.ts'
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://127.0.0.1:8000/api/'
    }
  },

  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/device'
  ],

  css: [
    '~/assets/fonts/IBM/style.css',
    '~/assets/vuetify/overrides.scss',
    '~/assets/scss/index.scss'
  ],

  imports: {
    dirs: ['types/*.ts']
  }
})
