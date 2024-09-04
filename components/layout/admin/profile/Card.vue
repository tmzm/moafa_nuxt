<template>
  <v-card>
    <v-card-text>
      <div class="grow">
        <div class="flex gap-4">
          <img
            class="h-34 rounded-lg"
            :src="`https://avatar.iran.liara.run/public/boy?username=${user?.id}`"
          />

          <div>
            <div class="text-2xl">
              {{ user?.first_name + ' ' + user?.last_name }}
            </div>
            <div class="mt-2 text-gray">
              <v-icon size="20"> mdi-email-outline </v-icon>
              {{ user?.email }}
            </div>

            <div class="flex mt-4 gap-4">
              <base-status-card
                :title="$t('groups')"
                :number="14"
                icon="mdi-account-group-outline"
                color="primary"
              />

              <base-status-card
                :title="$t('habits')"
                :number="253"
                icon="mdi-link-variant"
                color="blue"
              />
            </div>
          </div>
        </div>

        <!-- <div class="grid md:grid-cols-4 grid-cols-2 justify-stretch gap-4 mt-4">
          <base-status-card
            :title="$t('base.day')"
            :number="user."
            icon="mdi-calendar-week"
            color="primary"
          />

          <base-status-card
            :title="habit.unit"
            :number="habit.amount"
            icon="mdi-target-variant"
            color="blue"
          />
        </div> -->
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
</script>

<style></style>
