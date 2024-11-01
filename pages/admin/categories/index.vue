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
      class="text-no-wrap"
      :items="categories"
      :loading="status == 'pending'"
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
            :lazy-src="loadImage()"
            cover
            rounded="lg"
            class="!my-4 !max-w-16"
            width="50"
            aspect-ratio="1"
            :src="loadImage(item.image)"
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

const { status } = await useLazyAsyncData(() =>
  categoryStore.list()
)
</script>
