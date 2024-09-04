<template>
  <base-page-header
    title="Categories"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/'
      },
      {
        title: 'Categories',
        disabled: true
      }
    ]"
  >
    <template #actions>
      <base-action-button to="/admin/categories/create" icon="mdi-plus">
        Add new category</base-action-button
      >
    </template>
  </base-page-header>

  <v-card class="overflow-hidden">
    <v-data-table-server
      density="comfortable"
      class="text-no-wrap"
      :items="categories"
      :loading="pending"
      :items-length="categories.length"
      :headers="[
        {
          title: 'Image',
          key: 'image'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Products count',
          key: 'category_products_count'
        },
        {
          title: '',
          key: 'id'
        }
      ]"
    >
      <template #item.id="{ item }">
        <base-icon-button
          class="me-2"
          @click="navigateTo(`/admin/categories/${item.id}`)"
          >mdi-pencil-outline</base-icon-button
        >
      </template>

      <template #item.image="{ item }">
        <div class="flex items-center gap-3">
          <v-img
            lazy-src="http://127.0.0.1:8000/images/placeholder.jpg"
            cover
            rounded="lg"
            class="!my-4 !max-w-16"
            aspect-ratio="1"
            :src="`http://127.0.0.1:8000${item.image}`"
          />
        </div>
      </template>
    </v-data-table-server>
  </v-card>

  <nuxt-page />
</template>

<style></style>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const categoryStore = useCategoryStore()

const { categories } = storeToRefs(categoryStore)

const { pending, refresh } = await useAsyncData(() =>
  categoryStore.getAllCategories()
)

const dialogDelete = ref(false)
const deleteId = ref()

const deleteModuleAction = (id: number) => {
  dialogDelete.value = true
  deleteId.value = id
}

const deleteCategory = () => {
  dialogDelete.value = false
  categoryStore.remove(deleteId.value)
  refresh()
}
</script>
