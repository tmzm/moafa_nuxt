// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import type { ThemeDefinition } from 'vuetify'
import { ar } from 'vuetify/locale'
import colors from './utils/colors'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const theme: ThemeDefinition = {
  dark: false,

  colors
}

export default defineVuetifyConfiguration({
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
      elevation: 2,
      border: true
    },

    VTextField: {
      variant: 'solo-filled',
      density: 'compact'
    },

    VTextarea: {
      variant: 'solo-filled',
      density: 'compact'
    },

    VSelect: {
      variant: 'solo-filled',
      density: 'compact'
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
    defaultTheme: 'theme',
    themes: { theme }
  }
})
