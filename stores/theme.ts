import { useDisplay } from 'vuetify'
import { useTheme } from 'vuetify'

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme()

  const themeDefault = useCookie('moafa.theme')

  if (!themeDefault.value) {
    themeDefault.value = 'lightTheme'
  }

  theme.global.name.value = themeDefault.value

  const { smAndDown } = useDisplay()
  const rail = ref(false)
  const sideOpen = ref(false)

  const toggleSidebar = () => {
    if (!smAndDown.value) {
      rail.value = !rail.value
    } else {
      sideOpen.value = !sideOpen.value
    }
  }

  return {
    toggleSidebar,
    rail,
    sideOpen
  }
})
