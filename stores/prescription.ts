export const usePrescriptionStore = defineStore('prescription', () => {
  const prescriptions = ref<Prescription[]>([])
  const prescription = ref<Prescription>({} as Prescription)
  const imageFileInput = ref<any>([])

  const search = ref()
  const prescriptionsTotalCount = ref(0)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const create = async () => {
    const formData = new FormData()

    formData.append('description', prescription.value.description)
    formData.append('image', imageFileInput.value[0].originFileObj)

    await api('/prescriptions/create', {
      method: 'post',
      body: formData
    })

    showSuccessToaster('Prescription Uploaded Successfully')
  }

  const edit = async () => {}

  const list = async (userId?: number) => {
    const res = await api('prescriptions', {
      method: 'post',
      body: {
        user_id: userId,
        // sort: sort.value != 'Newest' ? sort.value.toLowerCase() : undefined,
        search: search.value,
        ...paginationParams(paginationOptions.value, prescriptionsTotalCount.value)
      }
    })

    prescriptions.value = res.data.prescriptions
    prescriptionsTotalCount.value = res.data.count
  }

  const get = async (id: number) => {
    const res = await api(`prescriptions/${id}`)

    prescriptions.value = res.data
  }

  const deletePrescription = async (id: number) => {
    await api(`prescriptions/${id}/delete`, {
      method: 'delete'
    })
  }

  return {
    deletePrescription,
    prescriptionsTotalCount,
    search,
    paginationOptions,
    get,
    prescriptions,
    imageFileInput,
    list,
    prescription,
    create,
    edit
  }
})
