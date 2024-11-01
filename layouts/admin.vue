<template>
  <v-locale-provider :rtl="$i18n.locale === 'ar'">
    <v-layout>
      <layout-admin-sidebar />

      <layout-admin-navbar />

      <v-main class="min-h-screen">
        <div class="p-4 mr-4 bg-background rounded-lg min-h-screen">
          <slot></slot>
        </div>
      </v-main>
    </v-layout>
  </v-locale-provider>
</template>

<script lang="ts" setup></script>

<style></style>
