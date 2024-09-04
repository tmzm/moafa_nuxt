<template>
  <v-card :loading>
    <v-card-text>
      <div class="grow">
        <div>
          <div class="flex gap-4">
            <img class="h-8" :src="`/icons/${habit.icon}.svg`" />

            <div class="text-2xl">{{ habit.name }}</div>
          </div>

          <div class="flex items-center gap-4">
            <div v-if="habit.consecutive" class="mt-2 text-gray">
              <v-icon size="20"> mdi-target </v-icon>
              هدف مستمر
            </div>

            <div class="mt-2 text-gray">
              <v-icon size="20"> mdi-timelapse </v-icon>

              {{ $t(`interval.${habit.interval}`) }}
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-4 grid-cols-2 justify-stretch gap-4 mt-4">
          <base-status-card
            :title="$t('base.day')"
            :number="habit.goal"
            icon="mdi-calendar-week"
            color="primary"
          />

          <base-status-card
            :title="habit.unit"
            :number="habit.amount"
            icon="mdi-target-variant"
            color="blue"
          />

          <v-card
            v-if="habit.penalty_note"
            color="yellow-lighten-5"
            class="!border-2 !border-dashed !border-warning col-span-2"
          >
            <v-card-text>
              <span class="text-warning"> تعويض الهدف: </span>

              <div class="text-dark">
                {{ habit.penalty_note }}
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div class="md:w-1/2 mt-4">
          <div class="text-gray mb-2">الأعضاء المحققين للهدف</div>

          <v-progress-linear
            rounded
            min="0"
            :max="habitStore.memberStats.length"
            height="20"
            color="primary"
            :model-value="membersAchieveGoal"
          >
            <template v-slot:default>
              <strong>
                {{ habitStore.memberStats.length }} /
                {{ membersAchieveGoal }}</strong
              >
            </template>
          </v-progress-linear>
        </div>
      </div>
    </v-card-text>

    <!-- <v-tabs class="mx-4">
      <v-tab>نظرة عامة</v-tab>
      <v-tab>الأعضاء</v-tab>
    </v-tabs> -->
  </v-card>
</template>

<script lang="ts" setup>
const habitStore = useHabitStore()

const { habit } = storeToRefs(habitStore)

const route = useRoute()

const groupId = Number(route.params.group_id)
const habitName = String(route.params.habit_name)

const { pending: loading } = useLazyAsyncData('get_habit', () =>
  habitStore.get(groupId, habitName)
)

const membersAchieveGoal = computed(() => {
  let members = 0

  habitStore.memberStats.forEach((memberStat) => {
    if (memberStat.goal_percentage >= 100) {
      members++
    }
  })

  return members
})
</script>

<style></style>
