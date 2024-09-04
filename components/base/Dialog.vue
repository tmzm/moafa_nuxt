<template>
  <v-dialog @click:outside="emit('close')">
    <v-card :loading :disabled="loading" class="relative">
      <template #loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="primary"
          height="2"
          indeterminate
        />
      </template>

      <v-card-text>
        <div class="flex justify-between items-center mb-4">
          <div>
            <div class="text-2xl font-weight-bold">
              <slot name="title" />
              {{ title }}
            </div>

            <div class="text-lg text-gray-500">
              <slot name="subtitle" />
              {{ subtitle }}
            </div>
          </div>

          <baseIconButton
            v-if="!noCloseBtn"
            variant="text"
            icon="mdi-close"
            color="gray"
            @click="emit('close')"
          />
        </div>

        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useMagicKeys } from '@vueuse/core'

defineProps<{
  title?: string
  subtitle?: string
  loading?: boolean
  noCloseBtn?: boolean
}>()

const emit = defineEmits(['close'])

const { escape } = useMagicKeys()

watch(
  () => escape.value,
  (e) => {
    if (e) emit('close')
  }
)
</script>

<style></style>
