import { defineStore } from 'pinia'

export const useAnalyticsStore = defineStore('analytics', () => {
  const counts = ref<{
    categories_count: number
    products_count: number
    brands_count: number
    orders_count: number
    coupons_count: number
    prescriptions_count: number
    rates_count: number
  }>()

  const salesCategories = ref<
    {
      name: string
      total_sales: number
    }[]
  >([])

  const list = async () => {
    const res = await api('analytics')

    counts.value = res.data
    
    return res.data
  }

  const listCategoriesSales = async () => {
    const res = await api('analytics/categories_sales')

    salesCategories.value = res.data
  }

  return { counts, salesCategories, list, listCategoriesSales }
})
