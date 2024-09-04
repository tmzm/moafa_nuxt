import type { Prescription } from '@/types'

export const usePrescriptionStore = defineStore('prescription', () => {
  const prescriptions = ref<Prescription[]>()
  const prescription = ref<Prescription>({} as Prescription)
  const imageFileInput = ref<any>([])

  const loading = ref()

  const create = async () => {
    loading.value = true

    const formData = new FormData()

    try {
      formData.append('description', prescription.value.description)
      formData.append('image', imageFileInput.value[0].originFileObj)

      await api('/prescriptions/create', {
        method: 'post',
        body: formData
      })

      showSuccessToaster('Prescription Uploaded Successfully')
    } catch {
      showErrorToaster('Error!, try agin later')
      loading.value = false
    }

    loading.value = false
  }

  const edit = async () => {}

  const getAllPrescriptions = async () => {
    const res = await api('prescriptions')

    prescriptions.value = res.data
  }

  const getPrescription = async (id: number) => {}

  const deletePrescription = async (id: number) => {
    loading.value = true

    try {
      await api(`prescriptions/${id}/delete`, {
        method: 'delete'
      })

      showSuccessToaster('prescription deleted successfully')

      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }

  return {
    deletePrescription,
    getPrescription,
    prescriptions,
    imageFileInput,
    getAllPrescriptions,
    prescription,
    create,
    edit,
    loading
  }
})
