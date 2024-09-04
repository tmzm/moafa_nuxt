<template>
  <v-layout class="bg-background">
    <layout-admin-sidebar />

    <layout-admin-navbar />

    <v-main class="min-h-screen">
      <div class="p-8 bg-background h-full">
        <slot />
      </div>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup></script>

<style></style>
