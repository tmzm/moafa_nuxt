<template>
  <v-card class="overflow-hidden">
    <slot name="title" />

    <v-card-text>
      <slot />

      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col md="3" cols="6">
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
        <v-col md="3" cols="6">
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
      v-model="model"
      :show-select
      density="comfortable"
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
            class="!my-4 !max-w-18"
            aspect-ratio="1"
            :src="`http://127.0.0.1:8000${item.image}`"
          />
        </div>
      </template>

      <template #item.rate="{ item }">
        <v-rating
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

<script lang="ts" setup>
import dayjs from 'dayjs'

defineProps<{
  showSelect?: boolean
  show?: string[]
}>()

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
