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

  <product-table />

  <nuxt-page />
</template>

<style></style>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
