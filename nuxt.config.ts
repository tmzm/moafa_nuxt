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
          href: 'https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&display=swap'
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
      { code: 'en', file: 'en.ts' },
      { code: 'ar', file: 'ar.ts' }
    ],

    langDir: 'locale',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  },

  css: [
    '~/assets/fonts/IBM/style.css',
    'vuetify/styles',
    'assets/vuetify/overrides.scss',
    'assets/scss/index.scss'
  ],

  vuetify: {
    moduleOptions: {
      styles: { configFile: 'assets/vuetify/settings.scss' }
    },

    vuetifyOptions: './vuetify.config.ts'
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://127.0.0.1:8000/api/',
      baseUrl: 'http://127.0.0.1:8000'
    }
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    'vuetify-nuxt-module',
    '@nuxtjs/device'
  ],

  imports: {
    dirs: ['types/*.ts']
  },

  features: {
    inlineStyles: false
  }
})