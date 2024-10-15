<template>
  <div class="flex items-center gap-2 mb-1">
    <v-icon v-if="icon" size="small" color="blue">{{ icon }}</v-icon>
    <div class="text-sm font-semibold"><slot /></div>

    <v-tooltip v-if="tooltip" :text="tooltip">
      <template #activator="{ props }">
        <v-icon v-bind="props" size="1rem" class="-mt-[10px] text-slate-300">mdi-information</v-icon>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
  tooltip?: string
}>()
</script>
