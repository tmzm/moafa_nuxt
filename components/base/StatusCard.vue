<template>
  <v-card :color="color" :variant="variant" elevation="0">
    <v-card-text class="py-1">
      <div class="text-4xl">
        {{ number }}
      </div>

      <div class="text-md -mt-2">
        {{ title }}
      </div>

      <v-icon
        v-if="icon"
        :icon="icon"
        class="!absolute top-[10%] left-0 !text-8xl opacity-20"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    number: number
    icon?: string
    color: string
    variant?: NonNullable<"tonal" | "flat" | "text" | "elevated" | "outlined" | "plain">
  }>(),
  {
    variant: 'tonal'
  }
)
</script>

<style></style>
