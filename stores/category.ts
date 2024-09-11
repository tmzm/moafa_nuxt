import { initCategory } from "~/composables/init"

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref<Category[]>([])

  const category = ref<Category>(initCategory())

  const reset = () => {
    category.value = initCategory()
  }

  const dialogDelete = ref(false)

  const imageFileInput = ref()

  const deleteId = ref()

  const dialogEdit = ref(false)

  const editId = ref()

  const selectedCategories = ref<number[]>([])

  const loading = ref(false)

  const list = async () => {
    const res = await api('/categories')

    categories.value = res.data
  }

  const get = async (id: number) => {
    const res = await api(`/categories/${id}`)

    category.value = res.data
  }

  const create = async () => {
    const formData = new FormData()
    formData.append('name', category.value.name)
    if (imageFileInput.value) {
      formData.append('image', imageFileInput.value)
    }

    console.log(formData)
    await api(`/categories/create`, {
      method: 'post',
      body: formData
    })
  }

  const edit = async (id: number) => {
    const formData = new FormData()
    if (category.value.name) {
      formData.append('name', category.value.name)
    }
    if (imageFileInput.value) {
      formData.append('image', imageFileInput.value)
    }

    await api(`/categories/${id}/update`, {
      method: 'post',
      body: formData
    })
  }
  const remove = async (id: number) => {
    await api(`/categories/${id}/delete`)
  }

  return {
    dialogDelete,
    dialogEdit,
    deleteId,
    editId,
    loading,
    imageFileInput,
    categories,
    category,
    list,
    get,
    reset,
    selectedCategories,
    edit,
    remove,
    create
  }
})
