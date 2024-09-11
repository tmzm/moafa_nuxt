<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <product-card class="!border-r-none" :product="productStore.products[0]" />
      </v-col>
      <v-col>
        <product-card class="!border-r-none" :product="productStore.products[0]" />
      </v-col>
      <v-col>
        <product-card class="!border-r-none" :product="productStore.products[0]" />
      </v-col>
      <v-col>
        <product-card class="!border-r-none" :product="productStore.products[0]" />
      </v-col>
      <v-col>
        <product-card :product="productStore.products[0]" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
const model = ref()
const productStore = useProductStore()

defineProps<{
  home?: boolean
}>()

const { pending } = await useAsyncData(() =>
  productStore.getTopProductSellers()
)
</script>

<style></style>
