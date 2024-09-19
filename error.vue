<template>
  <layout-not-found v-if="error.statusCode == 404" />

  <layout-under-maintenance v-else />
</template>

<script lang="ts" setup>
defineProps({
  error: {
    type: Object,
    default: null
  }
})
</script>
