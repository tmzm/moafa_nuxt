<template>
  <v-locale-provider :rtl="$i18n.locale === 'ar'">
    <v-layout class="bg-background">
      <layout-admin-sidebar />

      <layout-admin-navbar />

      <v-main class="min-h-screen">
        <div class="p-8 bg-background h-full">
          <v-container><slot /></v-container>
        </div>
      </v-main>
    </v-layout>
  </v-locale-provider>
</template>

<script lang="ts" setup></script>

<style></style>
