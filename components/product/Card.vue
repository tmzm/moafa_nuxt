<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 12 : 0"
      :rounded="false"
      min-width="260"
      class="!relative"
    >
      <v-chip
        variant="flat"
        color="error"
        class="!px-4 absolute top-4 left-0 z-10"
        >SALE!</v-chip
      >

      <v-img class="px-6" :aspect-ratio="1" :src="$config.public.baseUrl + product.image">
        <v-overlay
          :model-value="!!isHovering"
          class="align-center justify-center gap-4"
          scrim="#fff"
          contained
        >
          <v-btn
            size="small"
            class="mr-2"
            variant="flat"
            icon="mdi-heart-outline"
          ></v-btn>
          <v-btn
            size="small"
            class="mr-2"
            variant="flat"
            icon="mdi-cart-outline"
          ></v-btn>
          <v-btn size="small" variant="flat" icon="mdi-eye-outline"></v-btn>
        </v-overlay>
      </v-img>

      <v-card-text>
        <!-- <nuxt-link
        to="/"
        class="text-lg font-semibold text-dark hover:text-secondary"
        >{{ product.category_products. }}</nuxt-link
      > -->

        <div class="flex flex-col items-center">
          <div class="flex gap-2">
            <nuxt-link
              v-for="category in product.category_products"
              to="/"
              class="text-gray !hover:text-secondary transition-all"
              >{{ category.category.name }}</nuxt-link
            >
          </div>

          <nuxt-link
            to="/"
            class="text-3xl font-medium text-dark !hover:text-secondary transition-all"
            >{{ product.name }}</nuxt-link
          >
          <div class="text-xl text-primary">SP {{ product.price }}</div>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts" setup>
defineProps<{
  product: Product
}>()
</script>

<style></style>
