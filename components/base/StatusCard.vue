<template>
  <v-card
    :color="cardColor"
    class="relative before:absolute before:bg-secondary before:w-44 before:h-44 before:right-0 before:top-0"
  >
    <v-card-text class="!p-4 flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <v-avatar :variant :color rounded="lg">
          <v-icon size="20">{{ icon }}</v-icon>
        </v-avatar>
        <div>
          <div class="text-lg font-bold">
            {{ number }}
          </div>
          <div class="text-xs text-gray">{{ text }}</div>
        </div>
      </div>
      <base-icon-button :variant v-if="to" :to :color
        >mdi-plus</base-icon-button
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    text: string
    number?: number
    icon?: string
    color: string
    cardColor?: string
    variant?: 'tonal' | 'flat' | 'text' | 'elevated' | 'outlined' | 'plain'
    to?: string
  }>(),
  {
    cardColor: 'white',
    variant: 'tonal'
  }
)
</script>

<style></style>
