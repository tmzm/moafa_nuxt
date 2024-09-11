import dayjs from 'dayjs'
import { initOrder } from '~/composables/init'

export const useOrderStore = defineStore('order', () => {
  const cart = useCookie('cart')
  const orders = ref<Order[]>([])
  const order = ref<Order>(initOrder())
  
  const selectedProducts = ref<{ product: Product; orderedQuantity: number }[]>(
    []
  )

  const selectCoupon = ref(false)
  const couponCode = ref('')

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
    const res = await api('/orders/create', {
      method: 'post',
      body: {
        is_prescription: true,
        accepted_by_user: false,
        user_id: user_id,
        coupon_code:
          selectCoupon.value && couponCode.value ? couponCode.value : undefined,
        products: selectedProducts.value.map((product) => {
          return { id: product.product.id, quantity: 1 }
        })
      }
    })

    if(!res.errors){
      await api(`/prescriptions/${prescription_id}/orders/${res.data.id}`)
    }
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

  const list = async (userId?: number, couponId?: number) => {
    const res = await api('/orders', {
      method: 'post',
      body: {
        coupon_id: couponId,
        user_id: userId,
        search: search.value,
        ...paginationParams(paginationOptions.value, ordersTotalCount.value)
      }
    })

    orders.value = res.data.orders
    ordersTotalCount.value = res.data.count
  }

  const get = async (id: number) => {
    const res = await api(`/orders/${id}/show`)

    order.value = res.data
  }

  const remove = async (id: number) => {}

  return {
    createByCart,
    remove,
    get,
    search,
    ordersTotalCount,
    paginationOptions,
    orders,
    order,
    list,
    create,
    edit,
    loading,
    productIds,
    selectedProducts,
    selectCoupon,
    couponCode,
    cart,
    productsImages
  }
})
