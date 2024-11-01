<template>
  <v-app-bar elevation="0" height="70" class="px-4">
    <div class="flex gap-4 items-center justify-between w-full">
      <div class="flex items-center gap-4">
        <base-icon-button
          @click="themeStore.toggleSidebar"
          :class="{
            'rotate-180': themeStore.rail
          }"
          class="block transition-all"
        >
          {{ $vuetify.display.smAndDown ? 'mdi-menu' : 'mdi-menu-open' }}
        </base-icon-button>
        <v-text-field prepend-inner-icon="mdi-magnify" placeholder="Search for something" min-width="400" hide-details></v-text-field>
      </div>

      <div class="flex gap-4 items-center">
        <layout-theme-switcher />

        <base-icon-button color="dark">mdi-bell-ring-outline</base-icon-button>

        <layout-admin-profile-menu />
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore()
</script>

<style></style>
