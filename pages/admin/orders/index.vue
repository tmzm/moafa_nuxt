<template>
  <base-page-header
    title="Orders Listing"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Orders',
        disabled: true
      }
    ]"
  />

  <order-table />
</template>

<style></style>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
