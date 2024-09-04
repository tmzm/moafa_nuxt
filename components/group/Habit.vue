<template>
  <v-card color="blue" variant="tonal" elevation="0">
    <v-card-text class="py-4">
      <nuxt-link
        :to="`${baseRoute}/${habit.name}/overview`"
        class="text-2xl text-blue"
      >
        {{ habit.name }}
      </nuxt-link>

      <div class="text-lg text-blue-grey-darken-2 mb-4">
        الهدف: {{ habit.goal }} {{ habit.unit }}
      </div>

      <base-action-button
        icon="mdi-pencil-outline"
        variant="tonal"
        color="slate"
        size="small"
        :to="`${baseRoute}/${habit.name}`"
      >
        تعديل
      </base-action-button>

      <v-icon
        color="blue"
        class="!absolute bottom-2 end-2 !h-1/2 !text-8xl opacity-10 z-20"
      >
        <v-img v-if="habit.icon" :src="`/icons/${habit.icon}.svg`" />
      </v-icon>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ar from 'dayjs/locale/ar'

dayjs.extend(relativeTime)
dayjs.locale(ar)

const route = useRoute()

const groupId = route.params.group_id as string
const baseRoute = `/groups/${groupId}/details/habits`

defineProps<{
  habit: Habit
}>()
</script>
