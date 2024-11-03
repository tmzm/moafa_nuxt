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
          v-for="action in actions"
          @click="emit(action.text)"
          :title="`${action.text} ${item}`"
          :prepend-icon="action.icon"
        />
      </v-list>
    </template>
  </base-menu>
</template>

<script lang="ts" setup>
const props = defineProps<{
  actions?: {
    text: string
    icon: string
  }[]
  item?: string
}>()

const emit = defineEmits(props.actions?.map((action) => action.text) ?? [])
</script>

<style></style>
