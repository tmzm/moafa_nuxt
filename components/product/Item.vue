<template>
  <v-list-item
    class="!p-3"
    :title="product.name"
    :subtitle="`price: $${product.price}`"
    :prepend-avatar="loadImage(product.image)"
  />
</template>

<script lang="ts" setup>
defineProps<{
  product: Product
}>()
</script>

<style></style>
