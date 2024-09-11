<template>
  <v-app-bar height="90" border>
    <div class="w-full flex items-center justify-between py-4 px-8">
      <img src="/logo.png" width="120" />

      <v-text-field
        rounded
        hide-details
        max-width="400"
        placeholder="Search"
        append-inner-icon="mdi-magnify"
      />

      <div class="flex items-center gap-4">
        <layout-language-switcher />

        <v-divider vertical />

        <v-icon size="24">mdi-account-outline</v-icon>

        <v-badge color="primary" :content="0">
          <v-icon size="24">mdi-heart-outline</v-icon>
        </v-badge>

        <v-badge color="primary" :content="0">
          <v-icon size="24">mdi-cart-outline</v-icon>
        </v-badge>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup></script>

<style></style>
