export const useProductStore = defineStore('product', () => {
  const sort = ref('Newest')
  const products = ref<Product[]>([])
  const quantityShow = ref()
  const fileInput = ref()

  const search = ref()
  const productsTotalCount = ref(0)
  const paginationOptions = ref({
    groupBy: [],
    itemsPerPage: 10,
    page: 1,
    sortBy: []
  })

  const priceFilter = ref()

  const imageFileInput = ref()

  const product = ref<Product>({
    description: '',
    name: '',
  } as Product)

  const router = useRouter()

  const create = async () => {
    const formData = appendNewProductData()

    await api('/products/create', {
      method: 'post',
      body: formData
    })

    router.push('/admin/products/list')
  }

  const edit = async (id: number) => {
    const formData = appendNewProductData()

    await api(`/products/${id}/update`, {
      method: 'post',
      body: formData
    })

    router.push(`/admin/products/${id}`)
  }

  const list = async () => {
    const res = await api('/products', {
      method: 'post',
      body: {
        price: priceFilter.value,
        sort: sort.value != 'Newest' ? sort.value.toLowerCase() : undefined,
        search: search.value,
        ...paginationParams(paginationOptions.value, productsTotalCount.value)
      }
    })

    products.value = res.data.products
    productsTotalCount.value = res.data.count
  }

  const getTopProductSellers = async () => {
    const res = await api('/products/top_sellers')

    products.value = res.data
  }

  const getPrice = async (id: number) => {
    const res = await api(`/products/${id}/price`)
    return res.data
  }

  const getImage = async (id: number) => {
    const res = await api(`/products/${id}/image`)
    return res.data
  }

  const getProduct = async (slug: string) => {
    if (slug) {
      const res = await api(`/products/slug/${slug}`)
      product.value = res.data
      return res.data
    } else {
      return {} as Product
    }
  }

  const getProductById = async (id: number) => {
    if (id) {
      const res = await api(`/products/id/${id}`)
      product.value = res.data

      return res.data
    } else {
      return {} as Product
    }
  }

  const importProducts = async () => {
    const formData = new FormData()

    formData.append('excel', fileInput.value[0])

    await api('/products/import', {
      method: 'post',
      body: formData
    })
  }

  const deleteProduct = async (id: number) => {
    await api(`/products/${id}/delete`, {
      method: 'delete'
    })
  }

  return {
    deleteProduct,
    getProduct,
    getProductById,
    imageFileInput,
    fileInput,
    importProducts,
    quantityShow,
    products,
    list,
    getTopProductSellers,
    getPrice,
    getImage,
    create,
    edit,
    product,
    paginationOptions,
    priceFilter,
    productsTotalCount,
    search,
    sort
  }
})
