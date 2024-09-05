<template>
  <base-page-header
    title="Products"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/'
      },
      {
        title: 'Products',
        disabled: true
      }
    ]"
  >
    <template #actions>
      <base-action-button
        variant="tonal"
        to="/admin/products/create"
        icon="mdi-plus"
      >
        Add products</base-action-button
      >
    </template>
  </base-page-header>

  <v-card class="overflow-hidden">
    <v-card-text>
      <v-row>
        <v-col md="8" cols="12">
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col md="2" cols="6">
          <v-text-field
            type="number"
            :max="productsTotalCount"
            min="5"
            @update:model-value="itemsPerPage = parseInt($event, 10)"
            :model-value="itemsPerPage"
            label="items per page"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col md="2" cols="6">
          <v-select
            density="compact"
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
    </v-card-text>

    <v-divider></v-divider>

    <v-data-table-server
      density="comfortable"
      class="text-no-wrap"
      :items="products"
      :items-length="products?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="productHeaders"
    >
      <template #item.actions="{ item }">
        <base-icon-button class="me-2" color="primary"
          >mdi-eye-outline</base-icon-button
        >
        <base-icon-button @click="navigateTo(`/admin/products/${item.id}`)"
          >mdi-pencil-outline</base-icon-button
        >
      </template>

      <template #item.image="{ item }">
        <div class="flex items-center gap-3">
          <v-img
            lazy-src="http://127.0.0.1:8000/images/placeholder.jpg"
            cover
            rounded="lg"
            class="!my-4"
            width="50"
            aspect-ratio="1"
            :src="`http://127.0.0.1:8000${item.image}`"
          />
        </div>
      </template>

      <template #item.rate="{ item }">
        <v-rating size="sm" color="secondary" disabled :model-value="item.rate" />
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
        <v-chip :color="!item.is_offer ? 'error' : 'primary'">{{
          item.is_offer ? item.offer + '% OFF' : 'No offer'
        }}</v-chip>
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
  </v-card>
</template>

<style></style>

<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const productStore = useProductStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { products, paginationOptions, sort, search, productsTotalCount } =
  storeToRefs(productStore)
const { selectedCategories } = storeToRefs(useCategoryStore())

const { pending, refresh } = await useLazyAsyncData('list_all_products', () =>
  productStore.getAllProducts()
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

watch(selectedCategories, () => refresh())
</script>
