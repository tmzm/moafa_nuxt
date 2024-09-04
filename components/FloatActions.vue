<template>
    <v-speed-dial location="top start" transition="fade-transition">
      <template v-slot:activator="{ props, isActive }">
        <base-icon-button elevation="12" color="primary" variant="elevated" class="!fixed start-4 top-2/3" v-bind="props" size="large" :icon="isActive ? 'mdi-menu-down-outline' : 'mdi-menu-up-outline'"></base-icon-button>
      </template>

      <v-card key="1" class="!flex flex-col items-center gap-2 !p-2" @click="navigateTo('/')">
        <v-icon>mdi-link-variant-plus</v-icon>
        <div>إضافة عادة</div>
      </v-card>

            <v-card key="2" class="!flex flex-col items-center gap-2 !p-2" @click="navigateTo('/')">
        <v-icon>mdi-account-group-outline</v-icon>
        <div>إضافة مجموعة</div>
      </v-card>
    </v-speed-dial>
</template>

<script lang="ts" setup>

</script>

<style>

</style>