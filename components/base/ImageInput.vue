<template>
  <div class="relative my-4">
    <v-file-input
      @update:model-value="update"
      ref="fileInput"
      class="!hidden"
    ></v-file-input>

    <v-img
      class="h-32 aspect-square object-cover rounded-lg border-4 border-white shadow-lg"
      :src="previewUrl"
    />
    <base-icon-button
      elevation="12"
      :variant="undefined"
      class="!absolute -top-2 -start-2"
      @click="fileInput?.click()"
      >mdi-pencil</base-icon-button
    >

    <base-icon-button
      v-if="model"
      elevation="12"
      :variant="undefined"
      class="!absolute -bottom-2 -start-2"
      @click="() => {
        url = ''
        model = undefined
      }"
      >mdi-delete-empty-outline</base-icon-button
    >
  </div>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLElement>()
const model = defineModel()
const url = ref()

const previewUrl = computed(() => {
  return url.value ? url.value : props.modelUrl ? props.modelUrl : 'http://127.0.0.1:8000/images/placeholder.jpg' 
})

const props = defineProps<{
  modelUrl?: string
}>()

const update = (file: any) => {
  const reader = new FileReader()

  model.value = file

  reader.onload = (e: any) => {
    url.value = e.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<style lang="scss" scoped>
.st-image-input {
  .v-btn--size-x-small {
    --v-btn-height: 16px;
  }
}
</style>
