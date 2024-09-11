import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  theme: {
    breakpoints: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px'
    }
  },

  transformers: [transformerDirectives()]
})
