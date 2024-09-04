import type { Favorite } from '@/types'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<Favorite[]>([])

  const loading = ref(false)

  const addToFavorite = async (id: number) => {
    loading.value = true

    try {
      await api(`favorites/product/${id}/create`, {
        method: 'post'
      })

      loading.value = false

      showSuccessToaster('product added to favorite successfully')
    } catch {
      showErrorToaster('couldn`t add product to favorite')

      loading.value = false
    }
  }

  const isProductInFavorite = async (id: number) => {
    try {
      return await api(`favorites/${id}`).data
    } catch {
      return false
    }
  }

  const listAllFavorites = async () => {
    try {
      const res = await api(`favorites`)
      favorites.value = res.data
    } catch {
      return [] as Favorite[]
    }
  }

  const removeFromFavorites = async (id: number) => {
    loading.value = true

    try {
      await api(`favorites/${id}/delete`, {
        method: 'delete'
      })

      loading.value = false

      showSuccessToaster('product removed from favorite successfully')
    } catch {
      showErrorToaster('couldn`t remove product from favorite')

      loading.value = false
    }
  }

  return {
    favorites,
    loading,
    addToFavorite,
    isProductInFavorite,
    listAllFavorites,
    removeFromFavorites
  }
})
