export const useSearchStore = defineStore('search', () => {
  const productStore = useProductStore()
  const categoryStore = useCategoryStore()

  const { selectedCategories, categories } = storeToRefs(categoryStore)

  const filteredProducts = computed(() => {
    if (selectedCategories.value.length > 0) {
      return productStore.products?.filter(product =>
        selectedCategories.value.every(requiredCategory =>
          product.category_products.some(
            c => c.category.id == categories.value[requiredCategory].id
          )
        )
      )
    } else {
      return productStore.products
    }
  })

  return {
    filteredProducts
  }
})
