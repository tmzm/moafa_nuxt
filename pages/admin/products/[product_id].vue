<template>
  <base-page-header
    :title="!editMode ? 'Add Product' : 'Edit Product'"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Products',
        to: '/admin/products'
      },
      {
        title: !editMode ? 'Add Product' : 'Edit Product',
        disabled: true
      }
    ]"
  >
  </base-page-header>
  <Form @submit="submit" v-slot="{ errors }">
    <v-row>
      <v-col cols="12" md="9">
        <v-card :loading="pending" @close="navigateTo('/admin/products')">
          <v-card-title> Product General Details </v-card-title>
          <v-card-text>
            <!-- Form inputs for product details -->
            <v-row>
              <!-- Inputs for product details -->

              <!-- Scientific Name -->
              <v-col cols="12" md="6">
                <base-label>Name</base-label>

                <Field
                  v-model="product.name"
                  rules="required"
                  name="name"
                  v-slot="{ field }"
                >
                  <v-text-field v-bind="field" :error-messages="errors.name" />
                </Field>
              </v-col>

              <v-col cols="12" md="6">
                <base-label>Price</base-label>

                <Field
                  v-model="product.price"
                  rules="required"
                  name="price"
                  v-slot="{ field }"
                >
                  <v-text-field
                    type="number"
                    v-bind="field"
                    :error-messages="errors.price"
                    ><template v-slot:append> SP </template></v-text-field
                  >
                </Field>
              </v-col>

              <v-col cols="12">
                <base-label>Quantity Option</base-label>

                <v-item-group mandatory v-model="quantityShow">
                  <v-row>
                    <v-col v-for="i in quantityOptions" cols="6" md="4">
                      <v-item
                        :value="i"
                        v-slot="{ isSelected, toggle, selectedClass }"
                        ><v-card
                          elevation="2"
                          @click="toggle"
                          class="!border-dark !border !border-dashed !rounded-lg"
                          :class="selectedClass"
                          ><v-card-text class="py-2"
                            ><v-radio
                              :color="isSelected ? 'secondary' : 'dark'"
                              :label="i.title"
                              :model-value="isSelected" /></v-card-text></v-card
                      ></v-item>
                    </v-col>
                  </v-row>
                </v-item-group>
              </v-col>

              <v-col cols="12">
                <transition
                  ><div v-if="quantityShow.value === 2">
                    <base-label>Quantity</base-label>
                    <Field
                      v-model="product.quantity"
                      :rules="quantityShow.value === 2 ? 'required' : undefined"
                      name="quantity"
                      v-slot="{ field }"
                    >
                      <v-text-field
                        v-bind="field"
                        type="number"
                        :error-messages="errors.quantity"
                      />
                    </Field></div
                ></transition>
              </v-col>

              <v-col cols="12">
                <base-label>Expiration</base-label>
                <Field
                  v-model="product.expiration"
                  rules="required"
                  name="expiration"
                  v-slot="{ field }"
                >
                  <base-date-picker
                    v-bind="field"
                    :errors="errors.expiration"
                  ></base-date-picker>
                </Field>
              </v-col>

              <v-col cols="12" md="6">
                <base-status-input
                  v-model="product.is_offer"
                  item="Is this product has offer ?"
                />
              </v-col>

              <v-col cols="12" md="6">
                <transition>
                  <div v-if="product.is_offer">
                    <base-label>Offer</base-label>
                    <Field
                      v-model="product.offer"
                      :rules="product.is_offer ? 'required' : undefined"
                      name="offer"
                      v-slot="{ field }"
                    >
                      <v-text-field
                        v-bind="field"
                        type="number"
                        :error-messages="errors.offer"
                      >
                        <template v-slot:append> % </template>
                      </v-text-field>
                    </Field>
                  </div>
                </transition>
              </v-col>

              <ClientOnly>
                <v-col cols="12">
                  <base-label>Description</base-label>
                  <Field
                    :model-value="product.description"
                    name="description"
                    rules="required"
                    v-slot="{ field }"
                  >
                    <div id="app">
                      <client-only>
                        <QuillEditor
                          v-bind="field"
                          class="min-h-44"
                          :content="product.description"
                          @update:content="
                              (cont: any) => (product.description = cont)
                            "
                        />
                      </client-only>

                      <div class="ms-2 mt-1 text-xs text-red">
                        {{ errors.description }}
                      </div>
                    </div>
                  </Field>
                </v-col>
              </ClientOnly>

              <v-col cols="12" md="6">
                <base-label>Meta title</base-label>

                <Field
                  v-model="product.meta_title"
                  rules="required"
                  name="meta_title"
                  v-slot="{ field }"
                >
                  <v-text-field
                    v-bind="field"
                    :error-messages="errors.meta_title"
                  />
                </Field>
              </v-col>

              <v-col cols="12" md="6">
                <base-label>Meta subtitle</base-label>

                <Field
                  v-model="product.meta_subtitle"
                  rules="required"
                  name="meta_subtitle"
                  v-slot="{ field }"
                >
                  <v-text-field
                    v-bind="field"
                    :error-messages="errors.meta_subtitle"
                  />
                </Field>
              </v-col>

              <v-col cols="12">
                <base-label>Meta Description</base-label>
                <Field
                  v-model:content="product.meta_description"
                  rules="required"
                  name="meta_description"
                  v-slot="{ field }"
                >
                  <v-textarea
                    v-bind="field"
                    :error-messages="errors.meta_description"
                  />
                </Field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text>
            <v-card-title> Product Thumbnail </v-card-title>
            <base-image-input
              class="mx-auto w-fit"
              :model-url="
                editMode ? `http://127.0.0.1:8000${product.image}` : undefined
              "
              v-model="imageFileInput"
            />
            <div class="text-center">
              Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
              image files are accepted
            </div>
          </v-card-text>
        </v-card>

        <v-card class="mt-6">
          <v-card-title> Product Details </v-card-title>
          <v-card-text>
            <div>
              <base-label>Categories</base-label>

              <v-select
                v-model="selectedCategories"
                :loading="pendingCategories"
                :items="categories"
                multiple
                hide-details
                chips
                closable-chips
                item-title="name"
                item-value="id"
              ></v-select>
              <div class="mt-1 text-xs">Add product to a categories.</div>
            </div>

            <div class="mt-5">
              <base-label>Brands</base-label>

              <v-select
                v-model="selectedBrand"
                :loading="pendingBrands"
                :items="brands"
                hide-details
                item-title="name"
                item-value="id"
              ></v-select>
              <div class="mt-1 text-xs">Add product to brands.</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="flex w-full justify-between mt-4">
      <div class="flex gap-2">
        <v-btn @click="goBack" variant="tonal" color="dark"> Cancel </v-btn>

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
  </Form>

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

const { pending: pendingCategories } = useAsyncData(() =>
  categoryStore.getAllCategories()
)

const { pending: pendingBrands } = useAsyncData(() => brandStore.list())

const { pending } = useLazyAsyncData<Product>(() => {
  // reset
  product.value = {} as Product

  if (editMode) return productStore.getProductById(Number(productId))

  return Promise.resolve({} as Product)
})

if (editMode) {
  selectedCategories.value = []
  product.value.category_products?.forEach((categoryProduct) => {
    selectedCategories.value.push(categoryProduct.category.id)
  })
}

const remove = async (callback: any) => {
  try {
    await productStore.deleteProduct(Number(productId))

    refreshNuxtData('list_all_products')

    goBack()
  } finally {
    callback()
  }
}

const submit = async () => {
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

const goBack = () => {
  navigateTo(`/admin/products`)
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
