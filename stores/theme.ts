import { useDisplay } from 'vuetify'
export const useThemeStore = defineStore('theme', () => {
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
