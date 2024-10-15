<template>
  <v-locale-provider :rtl="$i18n.locale === 'ar'">
    <v-layout class="bg-background">
      <layout-admin-sidebar />

      <layout-admin-navbar />

      <v-main class="min-h-screen bg-background">
        <v-container><slot /></v-container>
      </v-main>
    </v-layout>
  </v-locale-provider>
</template>

<script lang="ts" setup></script>

<style></style>
