<template>
  <v-row>
    <v-card>
      <v-card-title>
        <user-item
          class="!m-0"
          :id="userDetails.id"
          :name="userDetails.first_name + ' ' + userDetails.last_name"
        />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <div class="text-xl font-bold">Details</div>

        <v-list>
          <v-list-item nav prepend-icon="mdi-calendar" title="Joined At">
            <template #subtitle>
              <p>
                {{
                  dayjs(userDetails.created_at).format('DD MMM YYYY, h:mm a')
                }}
              </p>
            </template>
          </v-list-item>
          <v-list-item prepend-icon="mdi-account-key" title="Role">
            <template #subtitle>
              <v-chip>{{ userDetails.role }}</v-chip>
            </template>
          </v-list-item>

          <v-list-item prepend-icon="mdi-account-key" title="Status">
            <template #subtitle>
              <v-chip :color="userDetails.verified ? 'success' : 'error'">{{
                userDetails.verified ? 'Verified' : 'Not Verified'
              }}</v-chip>
            </template>
          </v-list-item>

          <v-list-item prepend-icon="mdi-phone" title="Phone">
            <template #subtitle>
              <p>{{ userDetails.phone_number }}</p>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const authStore = useAuthStore()

const { userDetails } = storeToRefs(authStore)

const userId = useRoute().params.user_id
</script>

<style></style>
