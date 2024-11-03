<template>
  <v-card
    :color
    variant="outlined"
    class="border-dark !border-2 border-dashed !rounded-lg"
  >
    <v-card-text class="flex items-center gap-x-4 !py-2 !px-4">
      <v-icon size="xx-large">mdi-alert-circle</v-icon>

    <div class="flex flex-col flex-grow-1">
      <div class="text-md font-bold">
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
      :color
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
