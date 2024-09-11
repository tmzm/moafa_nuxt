<template>
  <div class="flex whitespace-nowrap justify-between !items-center w-full mb-4">
    <div>
      <v-breadcrumbs color="dark" class="!p-0" :items="breadcrumbs">
        <template #divider>
          <v-icon size="18" color="gray">mdi-circle-small</v-icon>
        </template>
      </v-breadcrumbs>

      <div class="text-3xl ml-1 text-dark font-semibold" v-if="!pending">
        {{ title }}
      </div>

      <v-skeleton-loader v-else color="background" type="list-item" />
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
