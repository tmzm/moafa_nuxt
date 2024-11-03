import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import { ar } from 'vuetify/locale'

export default defineNuxtPlugin((nuxtApp) => {
  const lightTheme: ThemeDefinition = {
    dark: false,

    colors: lightColors
  }

  const darkTheme: ThemeDefinition = {
    dark: true,

    colors: darkColors
  }

  const vuetify = createVuetify({
    ssr: true,
    aliases: {
      VBtnClose: 'VBtn',
      VBtnCancel: 'VBtn'
    },

    defaults: {
      locale: {
        locale: 'en',
        fallback: 'ar',
        messages: { ar }
      },

      global: {
        ripple: false
      },

      VBtnClose: {
        icon: true,
        variant: 'plain',
        position: 'absolute',
        location: 'top left',
        color: 'gray-lighten-2'
      },

      VChip: {
        size: 'small',
        rounded: 'lg'
      },

      VBtnCancel: {
        color: 'dark',
        variant: 'tonal'
      },

      VCard: {
        elevation: 0,
        rounded: 'lg'
      },

      VTextField: {
        variant: 'outlined',
        rounded: 'lg',
        color: 'primary'
      },

      VTextarea: {
        variant: 'outlined',
        rounded: 'lg',
        color: 'primary'
      },

      VSelect: {
        variant: 'outlined',
        rounded: 'lg',
        color: 'primary'
      },

      VBtn: {
        elevation: 0,
        variant: 'tonal',
        color: 'primary'
      },

      VSwitch: {
        inset: true,
        color: 'blue',
        hideDetails: true
      },

      VTabs: {
        sliderColor: 'primary',
        density: 'compact'
      },

      VTab: {
        ripple: false
      },

      VWindowItem: {
        transition: 'fade',
        reverseTransition: 'fade'
      },

      // VRow: {
      //   dense: true
      // },

      VDataTableServer: {
        itemsPerPageOptions: [
          { title: '10', value: 10 },
          { title: '25', value: 25 },
          { title: '50', value: 50 }
        ]
      },

      VDataTable: {
        itemsPerPageOptions: [
          { value: 10, title: '10' },
          { value: 25, title: '25' },
          { value: 50, title: '50' }
        ]
      }
    },

    theme: {
      defaultTheme: 'darkTheme',

      variations: {
        colors: ['primary', 'secondary'],
        lighten: 1,
        darken: 2
      },

      themes: { lightTheme, darkTheme }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
