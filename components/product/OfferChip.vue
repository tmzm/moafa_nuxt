<template>
  <v-chip :color="!product.is_offer ? 'error' : 'primary'">{{
    product.is_offer ? product.offer + '% OFF' : 'No offer'
  }}</v-chip>
</template>

<script lang="ts" setup>
defineProps<{
  product: Product
}>()
</script>

<style></style>
