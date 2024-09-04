<template>
  <v-container class="flex h-24 justify-between w-full">
    <div class="flex items-center">
      <base-icon-button
        v-if="smAndDown"
        class="block"
        @click="themeStore.toggle"
      >
        mdi-menu
      </base-icon-button>

      <v-img class="ms-4" width="150" src="/logo.png" />
    </div>

    <div class="flex gap-4 items-center">
      <!-- <base-icon-button>mdi-account-cog-outline</base-icon-button>

      <base-icon-button>mdi-cube-outline</base-icon-button>

      <base-icon-button>mdi-bell-ring-outline</base-icon-button> -->

      <profile-menu />

      <!-- <base-icon-button>mdi-logout</base-icon-button> -->
    </div>
  </v-container>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore()
const authStore = useAuthStore()

import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
</script>

<style></style>
