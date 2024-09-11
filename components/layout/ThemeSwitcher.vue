<template>
  <base-icon-button @click="toggle">{{
    theme.global.current.value.dark
      ? 'mdi-moon-waning-crescent'
      : 'mdi-weather-sunny'
  }}</base-icon-button>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggle = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}
</script>
