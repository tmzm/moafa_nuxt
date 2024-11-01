<template>
  <v-card class="overflow-hidden">
    <slot name="title">
      <div>
        {{ title }}
      </div>
    </slot>

    <v-card-text>
      <slot />

      <div class="flex justify-between items-center">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="search"
              placeholder="Search for product"
              prepend-inner-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col md="3" cols="6">
            <v-select
              return-object
              v-model="sort"
              hide-details
              :items="[
                'Newest',
                'A-Z',
                'Oldest',
                'Prices (Low First)',
                'Prices (High First)'
              ]"
              bg-color="white"
            />
          </v-col>
        </v-row>
        <div class="flex gap-2">
          <base-icon-button color="primary" :loading="pending" @click="refresh"
            >mdi-refresh</base-icon-button
          >
          <slot name="actions" />
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-data-table-server
      v-if="products.length > 0"
      v-model="model"
      :show-select
      class="text-no-wrap"
      :items="products"
      :items-length="products?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="productHeaders.filter((h) => !show || show?.includes(h.key))"
      :item-value="(item: any) => { return { product: item, orderedQuantity: 1 }}"
    >
      <template
        v-slot:item.data-table-select="{
          internalItem,
          isSelected,
          toggleSelect
        }"
      >
        <v-checkbox-btn
          :model-value="isSelected(internalItem)"
          color="primary"
          :disabled="
            internalItem.key.product.is_quantity &&
            internalItem.key.product.quantity === 0
          "
          @update:model-value="toggleSelect(internalItem)"
        ></v-checkbox-btn>
      </template>

      <template v-slot:header.data-table-select> </template>

      <template #item.actions="{ item }">
        <base-icon-button size="md" class="me-2"
          >mdi-eye-outline</base-icon-button
        >
        <base-icon-button
          color="secondary"
          size="md"
          @click="navigateTo(`/admin/products/${item.id}`)"
          >mdi-pencil-outline</base-icon-button
        >
      </template>

      <template #item.image="{ item }">
        <product-item :product="item" />
      </template>

      <template #item.rate="{ item }">
        <v-rating
          half-increments
          size="sm"
          color="secondary"
          disabled
          :model-value="item.rate"
        />
      </template>

      <template #item.brand="{ item }">
        <div class="text-no-wrap">
          <v-chip>{{ item.brand.name }}</v-chip>
        </div>
      </template>

      <template #item.category_products="{ item }">
        <div class="text-no-wrap">
          <v-chip
            class="mr-2"
            v-for="c in item.category_products"
            :key="c.id"
            >{{ c.category.name }}</v-chip
          >
        </div>
      </template>

      <template #item.is_quantity="{ item }">
        <v-chip
          class="mr-4"
          :color="
            item.is_quantity && item.quantity <= 0
              ? 'error'
              : !item.is_quantity
              ? 'success'
              : undefined
          "
          >{{
            !item.is_quantity
              ? 'always available'
              : item.quantity <= 0
              ? 'not available'
              : 'available with: ' + item.quantity
          }}</v-chip
        >
      </template>

      <template #item.is_offer="{ item }">
        <product-offer-chip :product="item" />
      </template>

      <template v-slot:bottom>
        <div class="text-center ma-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="4"
          ></v-pagination>
        </div>
      </template>
    </v-data-table-server>

    <layout-empty-placeholder size="small" v-else>
      <template #title> No Products yet </template>

      <template #subtitle>
        You can create product by clicking
        <v-chip size="small" color="secondary">Add product</v-chip> button
      </template>
    </layout-empty-placeholder>
  </v-card>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

defineProps<{
  title?: string
  showSelect?: boolean
  show?: string[]
}>()

const isVisible = ref(false)

const model = defineModel()

const productStore = useProductStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { products, paginationOptions, sort, search, productsTotalCount } =
  storeToRefs(productStore)
const { selectedCategories } = storeToRefs(useCategoryStore())

const { pending, refresh } = await useLazyAsyncData('list_all_products', () =>
  productStore.list()
)

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})

watch(itemsPerPage, (oldValue, newValue) => {
  paginationOptions.value.itemsPerPage = itemsPerPage.value

  refresh()
})

watch(sort, (value, oldValue) => {
  refresh()
})

watch(search, () => refresh())

const pageCount = computed(() => {
  return Math.ceil(productsTotalCount.value / itemsPerPage.value)
})

// watch(selectedCategories, () => refresh())
</script>

<style></style>
