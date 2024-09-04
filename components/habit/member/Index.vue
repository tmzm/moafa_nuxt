<template>
  <v-card class="mb-6">
    <v-card-text>
      <div class="flex-between-wrap">
        <div class="flex gap-4">
          <v-avatar size="x-large">
            <v-img
              :src="`https://avatar.iran.liara.run/public/boy?username=${member.first_name}`"
            />
          </v-avatar>

          <div>
            <div class="text-xl">
              {{ member.first_name + ' ' + member.last_name }}
            </div>

            <v-chip
              size="small"
              :color="member.days_completed >= habitGoal ? 'blue' : undefined"
              >{{
                member.days_completed >= habitGoal
                  ? $t('base.completed')
                  : $t('base.trying')
              }}</v-chip
            >
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <base-status-card
            :title="$t('base.day_of_goal')"
            :number="member.days_completed"
            icon="mdi-drag-variant"
            color="blue"
          />

          <base-status-card
            :title="$t('base.penalty_days_count')"
            :number="member.penalty_days_count"
            icon="mdi-information-outline"
            color="warning"
          />

          <base-status-card
            :title="$t('base.max_streak')"
            :number="member.max_streak"
            icon="mdi-fire"
            color="red"
          />
        </div>
      </div>

      <div class="mt-4" v-if="member.history.length > 0">
        <div class="text-gray mb-1">تحقيق الهدف</div>

        <habit-member-history-bar :history-list="member.history" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  member: MemberStats
  habitGoal: number
}>()
</script>

<style></style>
