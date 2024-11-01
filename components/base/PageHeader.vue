<template>
  <v-card
    class="flex whitespace-nowrap justify-between !items-center w-full mb-4"
  >
    <v-card-text class="!p-3">
      <div class="flex justify-between">
        <div class="text-2xl ml-1 text-dark font-semibold" v-if="!pending">
          {{ title }}
        </div>

        <v-skeleton-loader v-else color="background" type="list-item" />

        <v-breadcrumbs color="dark" class="!p-0" :items="breadcrumbs">
          <template #divider>
            <v-icon size="18" color="gray">mdi-chevron-right</v-icon>
          </template>
          <template #prepend>
            <v-icon color="primary">mdi-home</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
    </v-card-text>
  </v-card>
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
