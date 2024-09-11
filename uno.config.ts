import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  theme: {
    colors: {
      primary: '#1A6350',
      secondary: '#F8D33F'
    },

    breakpoints: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px'
    }
  },

  transformers: [transformerDirectives()]
})
