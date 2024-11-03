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

import { useTheme } from 'vuetify'

const theme = useTheme()

theme.global.name.value = 'lightTheme'
</script>
