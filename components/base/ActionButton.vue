<template>
  <v-btn
    :prepend-icon="icon"
    :icon="xs"
    rounded="lg"
    :size="!xs ? undefined : 'small'"
  >
    <v-icon v-if="xs">{{ icon }}</v-icon>

    <slot v-else />
  </v-btn>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { xs } = useDisplay()
defineProps<{
  icon?: string
}>()
</script>
