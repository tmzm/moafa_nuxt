export const useRateStore = defineStore('rate', () => {
  const rates = ref<Rate[]>()

  const search = ref()
  const ratesTotalCount = ref(0)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const rate = ref<Rate>({} as Rate)

  const list = async (userId?: number) => {
    const res = await api('/rates', {
      method: 'post',
      body: {
        user_id: userId,
        search: search.value,
        ...paginationParams(paginationOptions.value, ratesTotalCount.value)
      }
    })

    rates.value = res.data.rates
    ratesTotalCount.value = res.data.count
  }

  return {
    paginationOptions,
    rates,
    rate,
    list,
    ratesTotalCount,
    search
  }
})
