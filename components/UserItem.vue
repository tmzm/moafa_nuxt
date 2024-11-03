<template>
  <div class="m-4 flex gap-4 items-center">
    <v-card
      class="aspect-square !rounded-full !flex items-center justify-center"
      :class="classes.avatar"
      variant="tonal"
      :color
      elevation="0"
    >
      <div :class="classes.font" class="font-semibold">
        {{ user.first_name.slice(0, 1).toUpperCase() + user.last_name.slice(0, 1).toUpperCase() }}
      </div>
    </v-card>
    <div>
      <div :class="classes.font" class="text-dark transition-all">
        {{ user.first_name + ' ' + user.last_name }}
      </div>
      <div v-if="showPhoneNumber" :class="classes.subtitleFont" class="text-gray">
        {{ user.phone_number }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: 'small' | 'large'
    showPhoneNumber?: boolean
    user: User
  }>(),
  {
    size: 'large'
  }
)

const classes = computed(() => {
  return {
    font: props.size === 'small' ? 'text-lg' : 'text-xl',
    subtitleFont: props.size === 'small' ? 'text-xs' : 'text-lg',
    avatar: props.size === 'small' ? 'w-10' : 'w-12'
  }
})

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
  const id = props.user.id.toString().charAt(props.user.id.toString().length - 1)

  return colors.find((c) => c.id === Number(id))?.color
})
</script>

<style></style>
