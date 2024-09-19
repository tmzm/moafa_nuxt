import vuetify from 'vite-plugin-vuetify'
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
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
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
    strategy: 'no_prefix'
  },

  css: [
    '~/assets/fonts/IBM/style.css',
    'assets/vuetify/overrides.scss',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/vuetify/settings.scss',
    'vuetify/styles',
    'assets/scss/index.scss'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://127.0.0.1:8000/api/',
      baseUrl: 'http://127.0.0.1:8000',
      basePlaceholderUrl: 'http://127.0.0.1:8000/images/placeholder.jpg'
    }
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins?.push(
          vuetify({
            styles: { configFile: '/assets/vuetify/settings.scss' },
            autoImport: true
          })
        )
      )
    }
  ],

  build: {
    transpile: ['vuetify']
  },

  compatibilityDate: '2024-09-07'
})
