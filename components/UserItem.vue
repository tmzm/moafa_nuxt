<template>
  <div class="flex items-center cursor-pointer">
    <v-card
      class="w-12 mr-4 aspect-square !rounded-full !flex items-center justify-center"
      variant="tonal"
      :color
      elevation="0"
    >
      <div class="text-xl font-semibold">
        {{ name.slice(0, 1).toUpperCase() }}
      </div>
    </v-card>
    <div class="text-xl text-dark hover:text-secondary transition-all">
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string
  id: number
}>()

const colors = [
  {
    id: 0,
    color: 'blue'
  },
  {
    id: 1,
    color: 'indigo'
  },
  {
    id: 2,
    color: 'purple'
  },
  {
    id: 3,
    color: 'red'
  },
  {
    id: 4,
    color: 'pink'
  },
  {
    id: 5,
    color: 'cyan'
  },
  {
    id: 6,
    color: 'lime'
  },
  {
    id: 7,
    color: 'orange'
  },
  {
    id: 8,
    color: 'brown'
  },
  {
    id: 9,
    color: 'yellow'
  }
]

const color = computed(() => {
  const id = props.id.toString().charAt(props.id.toString().length - 1)

  return colors.find((c) => c.id === Number(id))?.color
})
</script>

<style></style>
