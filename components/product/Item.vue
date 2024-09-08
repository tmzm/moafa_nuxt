<template>
  <v-list-item
    class="!p-3"
    :title="product.name"
    :subtitle="'Price: $' + product.price"
  >
    <template #prepend>
      <v-img
        class="!w-16 me-4 aspect-square object-cover"
        rounded="lg"
        :src="$config.public.baseUrl + product.image"
      />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
defineProps<{
  product: Product
}>()
</script>

<style></style>
