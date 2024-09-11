<template>
  <v-card :rounded="false" max-width="250" elevation="0">
    <v-img :aspect-ratio="1" :src="$config.public.baseUrl + product.image">
      <div class="p-6">
        <v-chip variant="flat" color="red" rounded class="!px-4">Sale!</v-chip>
      </div>
    </v-img>
    <v-card-text>
      <nuxt-link to="/" class="text-lg font-semibold text-dark hover:text-secondary">{{ product.name }}</nuxt-link>
      <div class="text-xl mt-1 font-bold">SP {{ product.price }}</div>
      <v-rating
        half-increments
        density="compact"
        size="small"
        color="secondary"
        readonly
        :model-value="5"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  product: Product
}>()
</script>

<style></style>
