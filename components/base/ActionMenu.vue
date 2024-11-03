<template>
  <base-menu location="bottom end">
    <template #activator="{ props }">
      <base-icon-button v-bind="props" variant="text"
        >mdi-dots-horizontal</base-icon-button
      >
    </template>
    <template #menu>
      <v-list>
        <v-list-item
          v-if="editAction"
          @click="$emit('edit')"
          :title="`Edit ${item}`"
          prepend-icon="mdi-pencil-outline"
        />

        <v-list-item
          v-if="deleteAction"
          @click="$emit('delete')"
          :title="`Delete ${item}`"
          prepend-icon="mdi-delete-outline"
        />

        <v-list-item
          v-if="viewAction"
          @click="$emit('view')"
          :title="`view ${item}`"
          prepend-icon="mdi-eye-outline"
        />
      </v-list>
    </template>
  </base-menu>
</template>

<script lang="ts" setup>
const props = defineProps<{
  deleteAction?: boolean
  viewAction?: boolean
  editAction?: boolean
  item?: string
}>()
</script>

<style></style>
