<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3" class="text-xl">
          {{ member.first_name + ' ' + member.last_name }}
        </v-col>

        <v-col cols="12" md="9" class="!flex items-center">
          <habit-member-history-bar
            v-if="member.history.length > 0"
            :history-list="member.history"
          />
          <div v-else>لم يبدأ بالعادة بعد</div>
        </v-col>
      </v-row>
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
