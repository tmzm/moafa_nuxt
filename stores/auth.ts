export const useAuthStore = defineStore('auth', () => {
  const loading = ref(false)

  const router = useRouter()
  const users = ref<User[]>([])
  const user = ref<User>({} as User)
  const otp = ref()

  const userDetails = ref({} as User)

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

    accessToken.value = null
    refreshToken.value = null

    router.push('/auth/login')
  }

  const list = async () => {
    const res = await api('users', {
      method: 'post',
      body: {
        search: search.value,
        ...paginationParams(paginationOptions.value, usersTotalCount.value)
      }
    })

    users.value = res.data.users.filter((e: any) => e.id !== user.value?.id)
    usersTotalCount.value = res.data.count

    return res.data
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

  const get = async (id: number) => {
    const res = await api(`users/${id}/show`)

    userDetails.value = res.data
  }

  const remove = async (id: number) => {
    await api(`users/${id}/delete`,{
      method:'delete'
    })
  }

  const deactivate = async () => {
    await api(`users/delete`, {
      method: 'delete'
    })

    accessToken.value = undefined
    refreshToken.value = undefined
  }

  const unique = async (phone_number: any) => {
    return await api(`users/${phone_number}/unique`)
  }

  return {
    me,
    get,
    verify,
    editFCMToken,
    refreshTokens,
    create,
    user,
    list,
    login,
    logout,
    signup,
    unique,
    remove,
    deactivate,
    loading,
    otp,
    accessToken,
    refreshToken,
    users,
    userDetails,
    search,
    usersTotalCount,
    paginationOptions
  }
})
