<template>
  <v-app-bar elevation="0" class="px-9 bg-background">
    <div class="flex gap-4 items-center justify-between w-full">
      <base-icon-button
        @click="themeStore.toggleSidebar"
        :class="{
          'rotate-180': themeStore.rail
        }"
        class="block transition-all"
      >
        {{ $vuetify.display.smAndDown ? 'mdi-menu' : 'mdi-menu-open' }}
      </base-icon-button>

      <div class="flex gap-4 items-center">
        <base-icon-button color="dark">mdi-bell-ring-outline</base-icon-button>

        <layout-admin-profile-menu />
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore()
const authStore = useAuthStore()
</script>

<style></style>
