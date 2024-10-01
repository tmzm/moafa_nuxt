<template>
  <v-card
    elevation="2"
    :color
    variant="outlined"
    class="border-dark !border-2 border-dashed !rounded-lg"
  >
    <v-card-text class="flex items-center gap-x-4 !px-2 !py-1">
      <v-icon size="x-large">mdi-alert-circle-outline</v-icon>

    <div class="flex flex-col flex-grow-1">
      <div class="font-weight-bold text-subtitle-1">
        <slot name="title"> {{ props.item }} </slot>
      </div>

      <div v-if="!props.minimal" class="text-blue-grey-lighten-1">
        <slot name="subtitle" />
      </div>
    </div>

    <v-switch
      class="flex-grow-0"
      v-model="value"
      @update:modelValue="$emit('update:modelValue', $event)"
      color="secondary"
    >
    </v-switch>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  item: { type: String, default: 'تفعيل العنصر' },
  minimal: { type: Boolean, default: false },
  color: { type: String, default: 'secondary' },
  mode: { type: String, default: 'normal' },
  name: { type: String, required: false }
})

const { value } = useField(props.name ?? '')

value.value = props.modelValue
</script>

<style lang="scss">
.input-status {
  display: flex;
  align-items: center;
  border: 2px dashed;
  gap: 1rem;
}
</style>
