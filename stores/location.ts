import type { Location } from '@/types'

export const useLocationStore = defineStore('myLocationStore', () => {
  const locations = ref<Location[]>([])
  const loading = ref(false)
  const building = ref()
  const street = ref()
  const flat = ref()
  const name = ref()
  const type = ref('Home')
  const dialogSelectLocation = ref(false)
  const location = ref<Location>()
  const selectedLocation = useCookie<Location>('location')

  const getAllLocations = async () => {
    try {
      const res = await api('/locations')
      locations.value = res.data
    } catch (e: any) {
      console.log(e)
    }
  }

  const create = async () => {
    loading.value = true

    try {
      await api('/locations/create', {
        method: 'post',
        body: {
          name: name.value,
          type: type.value.toLowerCase(),
          address: `${street.value}, ${building.value}, ${flat.value}`
        }
      })

      showSuccessToaster('Location created successfully')
    } catch (e: any) {
      showErrorToaster(e.message)
      loading.value = false
    }

    loading.value = false
  }

  return {
    location,
    building,
    street,
    type,
    flat,
    name,
    locations,
    loading,
    getAllLocations,
    selectedLocation,
    create,
    dialogSelectLocation
  }
})
