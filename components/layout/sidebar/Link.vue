<template>
  <v-card elevation="0" @click="$router.replace(link.to)" :color="$route.fullPath == link.to ? 'blue-lighten-4' : 'light_white'">
    <v-card-text
      class="flex flex-col whitespace-nowrap text-center items-center justify-center gap-1"
    >
      <v-icon :color="$route.fullPath == link.to ? 'black' : 'gray'">{{ link.icon }}</v-icon>
      <div>{{ $t(link.key) }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  link:{
    key:string
    icon:string
    to: string
  }
}>()
</script>

<style></style>
