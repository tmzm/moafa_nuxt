<template>
  <v-img :max-height="size === 'small' ? 200 : 300" src="/images/empty-placeholder.png" />

  <div class="text-3xl text-dark text-center" :class="{
    'text-xl': size === 'small'
  }">
    <slot name="title" />
  </div>

  <div class="text-lg text-slate text-center mb-16" :class="{
    'text-md': size === 'small'
  }">
    <slot name="subtitle" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  size?: 'large' | 'small'
}>()
</script>