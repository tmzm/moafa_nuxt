export const useAuthStore = defineStore('auth', () => {
  const loading = ref(false)

  const router = useRouter()
  const users = ref<User[]>([])
  const user = ref<User>({} as User)
  const otp = ref()

  const search = ref()
  const usersTotalCount = ref(15)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const accessToken = useCookie('moafa.accessToken')
  const refreshToken = useCookie('moafa.refreshToken')

  const login = async () => {
    const res = await api('/users/store', {
      method: 'post',
      body: {
        phone_number: user.value.phone_number,
        password: user.value.password
      }
    })

    accessToken.value = res.token.accessToken
    refreshToken.value = res.token.refreshToken
  }

  const signup = async () => {
    const res = await api('users/create', {
      method: 'post',
      body: {
        name: user.value.name,
        phone_number: user.value.phone_number,
        password: user.value.password,
        role: 'user'
      }
    })

    accessToken.value = res.token.accessToken
    refreshToken.value = res.token.refreshToken
  }

  const refreshTokens = async () => {
    const res = await api('users/refresh-token', {
      headers: {
        Authorization: `Bearer ${refreshToken.value}`
      }
    })

    return res
  }

  const logout = async () => {
    await api('users/destroy')

    const cookieToken = useCookie('token')

    cookieToken.value = null

    router.push('/auth/login')
  }

  const list = async () => {
    const res = await api('users')

    users.value = res.data.users.filter((e: any) => e.id !== user.value?.id)
    usersTotalCount.value = res.data.count
  }

  const me = async (token?: string) => {
    let res

    if (!token) res = await api(`users/show`)
    else
      res = await api(`users/show`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    user.value = res.data
  }

  const editFCMToken = async (fcm_token: string) => {
    await api('users/fcm_token_edit', {
      method: 'post',
      body: {
        fcm_token
      }
    })
  }

  const verify = async () => {
    await api('otp/verify', {
      method: 'post',
      body: {
        otp: otp.value
      }
    })
  }

  const create = async () => {
    await api('users/create', {
      method: 'post',
      body: {
        name: user.value.name,
        phone_number: user.value.phone_number,
        password: user.value.password,
        role: 'admin'
      }
    })
  }

  return {
    me,
    verify,
    editFCMToken,
    refreshTokens,
    create,
    user,
    list,
    login,
    logout,
    signup,
    loading,
    otp,
    accessToken,
    refreshToken,
    users,
    search,
    usersTotalCount,
    paginationOptions
  }
})
