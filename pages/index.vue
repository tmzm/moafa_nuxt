<template>
  <div>

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
