<template>
  <div class="flex whitespace-nowrap justify-between !items-center w-full mb-4">
    <div>
      <div class="text-2xl text-dark font-semibold" v-if="!pending">
        {{ title }}
      </div>

      <v-skeleton-loader v-else color="background" type="list-item" />

      <v-breadcrumbs color="dark" class="!p-0" :items="breadcrumbs" >
        <template #divider> <v-icon size="18" color="gray">mdi-chevron-right</v-icon> </template>
      </v-breadcrumbs>
    </div>

    <div class="flex gap-x-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  breadcrumbs: {
    to?: string
    disabled?: boolean
    title: string
  }[]
  pending?: boolean
}>()
</script>
