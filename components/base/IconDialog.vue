<template>
  <base-dialog
    :title="$t('icon.label')"
    width="400"
    @close="emit('update:model-value', false)"
  >
    <base-icon-chooser model-value="icon" @update:model-value="select" />
  </base-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:model-value', 'select'])

defineProps<{
  icon?: string
}>()

const select = (icon: string) => {
  emit('select', icon)
  emit('update:model-value', false)
}
</script>
