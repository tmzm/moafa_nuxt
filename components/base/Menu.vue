<template>
  <v-menu
    :close-on-content-click="false"
    transition="slide-y-transition"
    :location
  >
    <template #activator="{ props, isActive }">
      <div class="cursor-pointer">
        <slot name="activator" v-bind="{ props, isActive }" />
      </div>
    </template>

    <v-card :loading min-width="250">
      <slot name="menu" />
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    location?: any
    loading?: boolean
  }>(),
  {
    location: 'bottom center',
    loading: false
  }
)
</script>

<style></style>
