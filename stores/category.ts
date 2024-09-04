export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref<Category[]>([])

  const category = ref<Category>({} as Category)

  const dialogDelete = ref(false)

  const deleteId = ref()

  const dialogEdit = ref(false)

  const editId = ref()

  const selectedCategories = ref<number[]>([])

  const loading = ref(false)

  const getAllCategories = async () => {
    const res = await api('/categories')

    categories.value = res.data
  }

  const get = async (id: number) => {
    const res = await api(`/categories/${id}`)

    category.value = res.data
  }

  const create = async () => {
    await api(`/categories/create`, {
      method: 'post',
      body: {
        name: category.value.name,
        image: ''
      }
    })
  }

  const edit = async (id: number) => {
    await api(`/categories/${id}/update`, {
      method: 'post',
      body: {
        name: category.value.name,
        image: ''
      }
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
    categories,
    category,
    getAllCategories,
    get,
    selectedCategories,
    edit,
    remove,
    create
  }
})
