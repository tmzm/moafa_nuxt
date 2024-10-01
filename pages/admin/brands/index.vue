<template>
  <base-page-header
    title="Brands"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/'
      },
      {
        title: 'Brands',
        disabled: true
      }
    ]"
  >
    <template #actions>
      <base-action-button to="/admin/brands/create" icon="mdi-plus">
        Add new brand</base-action-button
      >
    </template>
  </base-page-header>

  <v-card class="overflow-hidden">
    <v-data-table-server
      v-if="brands.length > 0"
      density="comfortable"
      class="text-no-wrap"
      :items="brands"
      :loading="pending"
      :items-length="brands.length"
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
          key: 'products_count'
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
          size="small"
          @click="navigateTo(`/admin/brands/${item.id}`)"
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

    <layout-empty-placeholder size="small" v-else>
      <template #title> No Brands yet </template>

      <template #subtitle>
        You can create brand by clicking
        <v-chip size="small" color="secondary">Add brand</v-chip> button
      </template>
    </layout-empty-placeholder>
  </v-card>

  <nuxt-page />
</template>

<style></style>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const brandStore = useBrandStore()

const { brands } = storeToRefs(brandStore)

const { pending } = await useAsyncData(() => brandStore.list())
</script>
