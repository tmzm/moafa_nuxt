<template>
  <v-layout>
    <layout-navbar />
    <v-main class="min-h-screen">
      <v-container class="p-8">
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

theme.global.name.value = 'lightTheme'
</script>

<style></style>
