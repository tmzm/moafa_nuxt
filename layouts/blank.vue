<template>
  <v-theme-provider theme="lightTheme">
    <div>
      <slot />
    </div>
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

theme.global.name.value = 'lightTheme'
</script>

<style></style>
