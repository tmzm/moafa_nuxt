import dayjs from 'dayjs'

export const useOrderStore = defineStore('order', () => {
  const cart = useCookie('cart')
  const orders = ref<Order[]>([])
  const order = ref<Order>({
    time: null,
    is_time: false
  } as Order)

  const fields = ref(1)
  const productsImages = ref<Product[]>([])
  const locationStore = useLocationStore()

  const search = ref('')
  const ordersTotalCount = ref(15)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const productIds = ref<
    {
      id?: number
      quantity?: number
    }[]
  >([
    {
      id: undefined,
      quantity: undefined
    }
  ])

  const loading = ref()

  const create = async (user_id: number, prescription_id: number) => {
    loading.value = true

    try {
      const res = await api('/orders/create', {
        method: 'post',
        body: {
          location_id: locationStore.selectedLocation.id,
          is_prescription: true,
          accepted_by_user: false,
          user_id: user_id,
          products: productIds.value
        }
      })

      await api(`/prescriptions/${prescription_id}/orders/${res.data.id}`)

      showSuccessToaster('Order created successfully')
    } catch (e) {
      loading.value = false
      showErrorToaster('Error!, try agin later')
    }

    loading.value = false
  }

  const createByCart = async () => {
    loading.value = true

    try {
      await api('/orders/create', {
        method: 'post',
        body: {
          location_id: locationStore.selectedLocation.id,
          time: order.value.is_time
            ? dayjs(order.value?.time).format('YYYY:MM:DD hh:mm')
            : undefined,
          is_time: order.value.is_time,
          products: cart.value
        }
      })
      showSuccessToaster('Order created successfully')
      cart.value = null
    } catch (e) {
      loading.value = false
      showErrorToaster('Error!, try agin later')
    }

    loading.value = false
    navigateTo('/shopping-cart')
  }

  const edit = async () => {}

  const getAllOrders = async () => {
    const res = await api('/orders', {
      method: 'post',
      body: {
        search: search.value,
        ...paginationParams(paginationOptions.value, ordersTotalCount.value)
      }
    })

    orders.value = res.data.orders
    ordersTotalCount.value = res.data.count
  }

  const getOrder = async (id: number) => {
    const res = await api(`/orders/${id}/show`)

    order.value = res.data
  }

  const deleteOrder = async (id: number) => {}

  return {
    createByCart,
    deleteOrder,
    getOrder,
    search,
    ordersTotalCount,
    paginationOptions,
    orders,
    order,
    getAllOrders,
    create,
    edit,
    loading,
    productIds,
    fields,
    cart,
    productsImages
  }
})
