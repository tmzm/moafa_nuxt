export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to.path.includes('auth')) return

  const authStore = useAuthStore()

  try {
    await authStore.me()

    if (authStore.user.role === 'USER' && to.path.includes('admin'))
      return await navigateTo('/')

    if (!authStore.user.verified)
      return await navigateTo(
        `/auth/verify?verify_token=${authStore.accessToken}`
      )
  } catch (e) {
    try {
      const res = await authStore.refreshTokens()

      authStore.accessToken = res.token.accessToken

      return
    } catch (e) {
      return await navigateTo('/auth/login')
    }
  }
})
