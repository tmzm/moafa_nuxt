<template>
  <base-page-header
    title="Prescriptions"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Prescriptions',
        disabled: true
      }
    ]"
  />

  <prescription-table />
</template>

<style></style>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
