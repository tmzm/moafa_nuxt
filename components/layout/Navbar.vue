<template>
  <v-app-bar
    height="90"
    class="!bg-transparent"
    border
    elevation="0"
  >
    <v-container class="w-full flex items-center justify-between py-4 px-8">
      <img src="/logo-demo.png" width="150" />

      <div class="flex items-center gap-6">
        <v-text-field
          rounded
          hide-details
          min-width="400"
          density="comfortable"
          placeholder="Search"
          append-inner-icon="mdi-magnify"
        />

        <layout-language-switcher location="bottom" />

        <v-divider vertical />

        <v-icon size="30">mdi-account-outline</v-icon>

        <v-badge color="primary" :content="0">
          <v-icon size="30">mdi-heart-outline</v-icon>
        </v-badge>

        <v-badge color="primary" :content="0">
          <v-icon size="30">mdi-cart-outline</v-icon>
        </v-badge>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>

</script>
