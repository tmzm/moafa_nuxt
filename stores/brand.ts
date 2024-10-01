import { initBrand } from "~/composables/init"

export const useBrandStore = defineStore('brand', () => {
  const brands = ref<Brand[]>([])

  const brand = ref<Brand>(initBrand())

  const selectedBrand = ref<number>()

  const imageFileInput = ref()

  const loading = ref(false)

  const reset = () => { brand.value = initBrand() }

  const list = async () => {
    const res = await api('/brands')

    brands.value = res.data

    return res.data
  }

  const get = async (id: number) => {
    const res = await api(`/brands/${id}`)

    brand.value = res.data

    return res.data
  }

  const create = async () => {
    const formData = new FormData()
    formData.append('name', brand.value.name)
    if (imageFileInput.value) {
      formData.append('image', imageFileInput.value)
    }

    console.log(formData)
    await api(`/brands/create`, {
      method: 'post',
      body: formData
    })
  }

  const edit = async (id: number) => {
    const formData = new FormData()
    if (brand.value.name) {
      formData.append('name', brand.value.name)
    }
    if (imageFileInput.value) {
      formData.append('image', imageFileInput.value)
    }

    await api(`/brands/${id}/update`, {
      method: 'post',
      body: formData
    })
  }

  const remove = async (id: number) => {
    await api(`/categories/${id}/delete`)
  }

  return {
    loading,
    brands,
    brand,
    list,
    get,
    selectedBrand,
    imageFileInput,
    edit,
    reset,
    remove,
    create
  }
})
