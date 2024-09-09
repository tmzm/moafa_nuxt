import { useToasterStore } from '@/stores/toaster'
import dayjs from 'dayjs'

export const appendNewProductData = () => {
  const productStore = useProductStore()

  const { product, imageFileInput, quantityShow } = storeToRefs(productStore)

  const categoryStore = useCategoryStore()
  const brandStore = useBrandStore()
  const { selectedCategories } = storeToRefs(categoryStore)
  const { selectedBrand } = storeToRefs(brandStore)

  const formData = new FormData()

  if (imageFileInput.value) {
    formData.append('image', imageFileInput.value)
  }
  formData.append('name', product.value.name)
  formData.append('brand_id', selectedBrand.value?.toString() as string)
  formData.append('price', product.value.price.toString())
  formData.append(
    'expiration',
    dayjs(product.value.expiration).format('YYYY/MM/DD')
  )
  for (var i = 0; i < selectedCategories.value.length; i++) {
    formData.append('categories[]', selectedCategories.value[i].toString())
  }
  formData.append('description', product.value.description)

  if (product.value.meta_description)
    formData.append('meta_description', product.value.meta_description)

  if (product.value.meta_subtitle)
    formData.append('meta_subtitle', product.value.meta_subtitle)

  if (product.value.meta_title)
    formData.append('meta_title', product.value.meta_title)

  formData.append(
    'quantity',
    quantityShow.value === 2 ? product.value.quantity.toString() : '0'
  )
  console.log(quantityShow.value)
  formData.append('is_quantity', quantityShow.value === 0 ? '0' : '1')
  formData.append('is_offer', product.value.is_offer === false ? '0' : '1')
  formData.append(
    'offer',
    product.value.is_offer ? product.value.offer.toString() : '0'
  )

  return formData
}

export const convertToTitleCase = (input: string): string => {
  return input.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const convertToTitleCaseWithSpace = (input: string): string => {
  return convertToTitleCase(input.replace(/-/g, ' '))
}

export const showSuccessToaster = (msg: string) => {
  const toasterStore = useToasterStore()
  toasterStore.showSuccessToaster(msg)
}

export const showErrorToaster = (msg: string) => {
  const toasterStore = useToasterStore()
  toasterStore.showErrorToaster(msg)
}
