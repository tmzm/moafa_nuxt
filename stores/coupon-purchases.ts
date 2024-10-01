import { defineStore } from 'pinia'

export const useCouponPurchasesStore = defineStore('coupon-purchase', () => {
  const couponsPurchases = ref<CouponPurchase[]>([])

  const search = ref()
  const couponsPurchasesTotalCount = ref(0)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const couponsPurchase = ref<CouponPurchase>({} as CouponPurchase)

  const reset = () => {
    couponsPurchase.value = {} as CouponPurchase
  }

  const list = async () => {
    const res = await api('/coupon-purchases', {
      method: 'post',
      body: {
        search: search.value,
        ...paginationParams(
          paginationOptions.value,
          couponsPurchasesTotalCount.value
        )
      }
    })

    couponsPurchases.value = res.data.couponPurchases
    couponsPurchasesTotalCount.value = res.data.count

    return res.data.couponPurchases
  }

  return {
    paginationOptions,
    couponsPurchases,
    couponsPurchase,
    couponsPurchasesTotalCount,
    list,
    reset,
    search,
  }
})
