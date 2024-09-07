<template>
  <base-page-header
    title="Products Rates"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Products Rates',
        disabled: true
      }
    ]"
  />

  <rate-table />
</template>

<style></style>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
