export const api = function (
  url: string,
  options: object = {}
): Promise<{
  data: any
  token: {
    accessToken: string
    refreshToken: string
  }
  errors: any
  message: string
}> {
  const runtimeConfig = useRuntimeConfig()
  const accessToken = useCookie('moafa.accessToken')

  const res = $fetch(url, {
    baseURL: runtimeConfig.public.apiBaseUrl,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken.value}`
    },
    ...options
  }).catch((error: any) => {
    console.log(error)

    if (error.status == 401) {
      showErrorToaster('Un Authorized')
    }

    if (error.status == 500) {
      showErrorToaster('Unexpected Error Happened')
    }

    if (error.status == 424) {
      showErrorToaster('Your inserts are not valid')
    }

    if (error.status == 400) {
      showErrorToaster('Server Error, try again later')
    }

    throw error
  })

  return res as Promise<{
    data: any
    token: {
      accessToken: string
      refreshToken: string
    }
    errors: any
    message: string
  }>
}
