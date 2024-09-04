<template>
  <base-dialog no-close-btn max-width="300">
    <div class="flex flex-col items-center text-center gap-4">
      <div>
        <v-icon size="80" color="warning"> mdi-alert-circle-outline </v-icon>
      </div>

      {{ title + (item ? ' ' + item : '') }}

      <div class="flex justify-center items-center gap-4">
        <v-btn
          v-if="cancelBtn"
          color="dark"
          variant="text"
          @click="$emit('close')"
        >
          {{ $t('actions.cancel') }}
        </v-btn>

        <v-btn v-if="action" :loading @click="onDelete" color="error">
          {{ action }}
        </v-btn>
      </div>
    </div>
  </base-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close', 'action'])

const loading = ref(false)

withDefaults(
  defineProps<{
    title: string
    item?: string
    action?: string
    cancelBtn?: boolean
  }>(),
  {
    cancelBtn: true
  }
)

const onDelete = () => {
  loading.value = true

  emit('action', callback)
}

const callback = () => {
  loading.value = false
}
</script>
