<template>
  <v-btn
    :prepend-icon="icon"
    :icon="$vuetify.display.xs"
    rounded="lg"
    :size="!$vuetify.display.xs ? undefined : 'small'"
  >
    <v-icon v-if="$vuetify.display.xs">{{ icon }}</v-icon>

    <slot v-else />
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
}>()
</script>
