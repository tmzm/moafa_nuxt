import { defineConfig } from 'unocss'
// import transformerDirectives from '@unocss/transformer-directives'
import colors from './utils/colors'

export default defineConfig({
  theme: {
    colors,

    breakpoints: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px'
    }
  },

  // transformers: [transformerDirectives()]
})
