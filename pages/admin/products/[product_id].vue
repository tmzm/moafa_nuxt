<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card>
        <v-card-title>Product Information</v-card-title>
        <v-card-text>
          <form @submit.prevent="submit">
            <v-row>
              <v-col cols="12" md="6">
                <base-label>Name</base-label>

                <base-text-field v-model="product.name" name="name" />
              </v-col>

              <v-col cols="12" md="6">
                <base-label>Price</base-label>

                <base-text-field
                  type="number"
                  v-model="product.price"
                  name="price"
                  ><template #append> SP </template></base-text-field
                >
              </v-col>

              <v-col cols="12">
                <v-item-group mandatory v-model="quantityShow">
                  <v-row>
                    <v-col v-for="i in quantityOptions" cols="6" md="4">
                      <v-item
                        :value="i"
                        v-slot="{ isSelected, toggle, selectedClass }"
                      >
                        <v-card
                          @click="toggle"
                          class="!border-dark !border-2 !border-dashed !rounded-lg"
                          :class="selectedClass"
                          variant="tonal"
                          :color="isSelected ? 'primary' : 'dark'"
                          ><v-card-text class="py-2"
                            ><v-radio
                              :label="i.title"
                              :class="isSelected ? 'font-semibold' : ''"
                              :model-value="isSelected" /></v-card-text
                        ></v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-item-group>
              </v-col>

              <v-col cols="12">
                <transition
                  ><div v-if="quantityShow.value === 2">
                    <base-label>Quantity</base-label>
                    <v-text-field
                      v-model="product.quantity"
                      type="number"
                      name="quantity"
                    /></div
                ></transition>
              </v-col>

              <v-col cols="12">
                <base-label>Expiration</base-label>
                <base-date-picker
                  v-model="product.expiration"
                  name="expiration"
                ></base-date-picker>
              </v-col>

              <ClientOnly>
                <v-col cols="12">
                  <base-label>Description</base-label>
                  <div id="app">
                    <client-only>
                      <QuillEditor
                        class="min-h-44"
                        name="description"
                        :content="product.description"
                        @update:content="
                              (cont: any) => (product.description = cont)
                            "
                      />
                    </client-only>
                  </div>
                </v-col>
              </ClientOnly>

              <v-col cols="12" md="6">
                <base-label>Meta title</base-label>

                <v-text-field v-model="product.meta_title" name="meta_title" />
              </v-col>

              <v-col cols="12" md="6">
                <base-label>Meta subtitle</base-label>

                <v-text-field
                  v-model="product.meta_subtitle"
                  name="meta_subtitle"
                />
              </v-col>

              <v-col cols="12">
                <base-label>Meta Description</base-label>

                <v-textarea v-model="product.meta_description" />
              </v-col>
            </v-row>

            <div class="flex w-full justify-between mt-4">
              <div class="flex gap-2">
                <v-btn @click="goBack" variant="tonal" color="dark">
                  Cancel
                </v-btn>

                <v-btn type="submit" :loading="loading"> Save </v-btn>
              </div>

              <base-action-button
                v-if="editMode"
                color="error"
                variant="tonal"
                icon="mdi-trash-can-outline"
                @click="deleteDialog = true"
              >
                Delete Product
              </base-action-button>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card>
        <v-card-title>Thumbnail</v-card-title>
        <v-card-text>
          <base-image-input
            class="mx-auto w-fit"
            :model-url="editMode ? loadImage(product.image) : undefined"
            v-model="imageFileInput"
          />
          <div class="text-center">
            Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
            files are accepted
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mt-6">
        <v-card-title> Product Details </v-card-title>
        <v-card-text>
          <div>
            <base-label>Categories</base-label>

            <base-select
              v-model="selectedCategories"
              :loading="pending"
              :items="categories"
              multiple
              hide-details
              chips
              name="categories"
              closable-chips
              item-title="name"
              item-value="id"
            ></base-select>
            <div class="mt-1 text-xs">Add product to a categories.</div>
          </div>

          <div class="mt-5">
            <base-label>Brands</base-label>

            <base-select
              v-model="selectedBrand"
              :loading="pending"
              :items="brands"
              name="brand"
              hide-details
              item-title="name"
              item-value="id"
            ></base-select>
            <div class="mt-1 text-xs">Add product to brands.</div>
          </div>
        </v-card-text>
      </v-card>

      <base-status-input
        class="mt-6"
        name="is_offer"
        v-model="product.is_offer"
        item="Is this product has offer ?"
      />

      <transition>
        <v-card class="mt-6" v-if="product.is_offer">
          <v-card-title> Offer </v-card-title>
          <v-card-text>
            <base-text-field v-model="product.offer" type="number" name="offer">
              <template #append> % </template>
            </base-text-field>
          </v-card-text>
        </v-card>
      </transition>

      <base-status-input
        name="status"
        v-model="product.status"
        class="mt-6"
        color="primary"
        item="Is product active ?"
      ></base-status-input>
    </v-col>
  </v-row>
  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    :item="$t('product')"
    @action="remove"
  />
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'

definePageMeta({
  layout: 'admin'
})

// Importing necessary stores and utilities
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()

const quantityOptions = [
  {
    title: 'Always Available',
    value: 0
  },
  {
    title: 'Not Available',
    value: 1
  },
  {
    title: 'Quantity',
    value: 2
  }
]

const { product, quantityShow, imageFileInput } = storeToRefs(productStore)
const { selectedCategories, categories } = storeToRefs(categoryStore)
const { selectedBrand, brands } = storeToRefs(brandStore)

quantityShow.value = quantityOptions[0]

const loading = ref(false)
const deleteDialog = ref(false)

const route = useRoute()

const productId = route.params.product_id as string

const editMode = productId != 'create'

const { handleSubmit, setValues, errors } = useForm<Product>({
  validationSchema: yup.object().shape({
    name: yup.string().required().min(8).max(120),
    offer: yup
      .string()
      .when('is_offer', { is: true, then: (schema) => schema.required() }),
    price: yup.string().required(),
    // quantity: yup.number().min(1).max(500),
    brand: yup.string().required(),
    categories: yup.array(yup.number()).min(1).required()
  })
})

const { pending } = useLazyAsyncData<Product>(async () => {
  // reset
  productStore.reset()

  selectedCategories.value = []

  selectedBrand.value = undefined

  await brandStore.list()

  await categoryStore.list()

  if (editMode) {
    await productStore.getProductById(Number(productId))

    product.value.category_products.forEach((categoryProduct) =>
      selectedCategories.value.push(categoryProduct.category.id)
    )

    selectedBrand.value = product.value.brand_id

    setValues({
      ...product.value,
      // @ts-ignore
      brand: selectedBrand.value,
      categories: selectedCategories.value
    })
  }

  return Promise.resolve({} as Product)
})

const remove = async (callback: any) => {
  try {
    await productStore.deleteProduct(Number(productId))

    refreshNuxtData('list_all_products')

    goBack()
  } finally {
    callback()
  }
}

const submitFun = async () => {
  loading.value = true

  try {
    editMode
      ? await productStore.edit(Number(productId))
      : await productStore.create()

    refreshNuxtData('list_all_products')

    goBack()
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(submitFun)

const goBack = () => {
  navigateTo(`/admin/products`)
}

// const { pending } = useLazyAsyncData<Product>(() => {
//   // reset

//   return Promise.resolve({} as Product)
// })
</script>
