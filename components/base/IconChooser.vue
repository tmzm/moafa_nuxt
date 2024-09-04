<template>
  <v-text-field
    v-model="search"
    placeholder="اكتب اسم الايقونة باللغة الانكليزية"
  />

  <base-loader v-if="loading" class="loader-container" />

  <div
    v-else
    class="flex flex-wrap gap-2 justify-center max-h-[200px] overflow-auto"
  >
    <v-avatar
      v-for="icon in filteredIcons"
      :key="icon"
      rounded="lg"
      class="cursor-pointer"
      :class="{ 'bg-light': icon === activeIcon }"
      @click="setActiveIcon(icon)"
    >
      <v-img :src="`/icons/${icon}.svg`" />
    </v-avatar>
  </div>
</template>

<script setup>
// Props and emits
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const icons = ref([])
const loading = ref(true)
const search = ref('')
const activeIcon = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/iconNames.json')
    icons.value = await response.json()
  } finally {
    loading.value = false
  }
})

const filteredIcons = computed(() => {
  return icons.value.filter((icon) => icon.includes(search.value))
})

const setActiveIcon = (icon) => {
  activeIcon.value = icon
  emit('update:modelValue', icon) // Emit the updated value
}

// Watch for changes to modelValue and update activeIcon accordingly
watch(
  () => props.modelValue,
  (newValue) => {
    activeIcon.value = newValue
  }
)
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #bbc5c9;
  border-radius: 3px;
}
</style>
