<template>
    <v-menu
      v-model="dateMenu"
      transition="scale-transition"
      :close-on-content-click="false"
      offset-y
      min-width="auto"
    >
      <template #activator="{ props }">
        <v-text-field
          v-bind="props"
          :error-messages="errors"
          :model-value="formattedDate"
          placeholder="Enter date"
          prepend-inner-icon="mdi-calendar"
          readonly
          :disabled="disabled"
          :bg-color="bgColor"
          @click:clear="emit('update:modelValue', null)"
        />
      </template>
  
      <v-date-picker
        :model-value="value || model ? new Date(value || model) : undefined"
        color="primary"
        @update:model-value="onUpdate"
      >
      </v-date-picker>
    </v-menu>
  </template>
  
  <script setup lang="ts">
  import dayjs from 'dayjs'
  
  const props = withDefaults(
    defineProps<{
      errors?: string[] | null
      value?: string
      bgColor?: string | null
      disabled?: boolean
      closeOnContentClick?: boolean
    }>(),
    {
      closeOnContentClick: false
    }
  )
  
  const emit = defineEmits(['update:modelValue'])
  
  const dateMenu = ref(false)
  
  const model = defineModel<string>()
  
  const formattedDate = computed(() => {
    const date = props.value || model.value
  
    return date ? dayjs(date).format('YYYY-MM-DD') : ''
  })
  
  const onUpdate = value => {
    if (value) value = dayjs(value).format('YYYY-MM-DDTHH:mm:ss') + '.000Z'
  
    emit('update:modelValue', value)
  }
  </script>
  