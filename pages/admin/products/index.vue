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
  />

  <product-table>
    <template #actions>
      <base-action-button
        variant="tonal"
        to="/admin/products/create"
        icon="mdi-plus"
      >
        Add products</base-action-button
      >
    </template>
  </product-table>
</template>

<style></style>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
