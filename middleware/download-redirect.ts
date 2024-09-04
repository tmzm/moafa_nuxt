export default defineNuxtRouteMiddleware((to, from) => {
  // if (process.client) return

  const config = useRuntimeConfig()
  const { isAndroid } = useDevice()

  if (isAndroid) {
    navigateTo(config.public.playStoreLink, { external: true })
  } else {
    navigateTo(config.public.appStoreLink, { external: true })
  }
})
