import { defineStore } from 'pinia'

export const usePointsStore = defineStore('points', () => {
  const pointsTransfers = ref<PointsTransfer[]>([])

  const search = ref()
  const pointsTransfersTotalCount = ref(0)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const pointsTransfer = ref<PointsTransfer>({} as PointsTransfer)

  const reset = () => {
    pointsTransfer.value = {
      type: 'deposit'
    } as PointsTransfer
  }

  const list = async () => {
    const res = await api('/points-transfers', {
      method: 'post',
      body: {
        search: search.value,
        ...paginationParams(
          paginationOptions.value,
          pointsTransfersTotalCount.value
        )
      }
    })

    pointsTransfers.value = res.data.pointsTransfers
    pointsTransfersTotalCount.value = res.data.count

    return res.data.pointsTransfers
  }

  const create = async () => {
    await api('/points-transfers/create', {
      method: 'post',
      body: pointsTransfer.value
    })
  }

  return {
    paginationOptions,
    pointsTransfers,
    pointsTransfer,
    pointsTransfersTotalCount,
    list,
    reset,
    create,
    search
  }
})
