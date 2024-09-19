import { initCoupon } from '~/composables/init'

export const useCouponStore = defineStore('coupon', () => {
  const coupons = ref<Coupon[]>([])

  const userCoupon = ref(false)
  const couponIsPrice = ref(false)

  const search = ref()
  const couponsTotalCount = ref(0)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const coupon = ref<Coupon>(initCoupon())

  const reset = () => {
    coupon.value = initCoupon()
  }

  const list = async () => {
    const res = await api('/coupons', {
      method: 'post',
      body: {
        search: search.value,
        ...paginationParams(paginationOptions.value, couponsTotalCount.value)
      }
    })

    coupons.value = res.data.coupons
    couponsTotalCount.value = res.data.count
  }

  const get = async (id: number) => {
    const res = await api(`/coupons/${id}`)

    coupon.value = res.data
  }

  const create = async () => {
    coupon.value.price = couponIsPrice.value ? coupon.value.price : 0

    await api(`/coupons/create`, {
      method: 'post',
      body: coupon.value
    })
  }

  const edit = async (id: number) => {
    await api(`/coupons/${id}/update`, {
      method: 'post',
      body: coupon.value
    })
  }

  const remove = async (id: number) => {
    await api(`/coupons/${id}/delete`)
  }

  const unique = async (code: string) => {
    await api(`/coupons/${code}/unique`)
  }

  return {
    paginationOptions,
    coupons,
    coupon,
    list,
    get,
    create,
    edit,
    reset,
    unique,
    remove,
    couponsTotalCount,
    couponIsPrice,
    search,
    userCoupon
  }
})
