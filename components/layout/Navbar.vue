<template>
  <v-app-bar elevation="0" border>
    <v-container>
      <div class="flex items-center justify-between p-4">
        <img src="/logo.png" width="120" />

        <v-text-field
          rounded
          hide-details
          max-width="400"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
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
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup></script>

<style></style>
