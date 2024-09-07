<template>
  <div>
    <base-page-header
      title="User Details"
      :breadcrumbs="[
        {
          title: 'Home',
          to: '/admin'
        },
        {
          title: 'Users',
          to: '/admin/users'
        },
        {
          title: 'User Details',
          disabled: true
        }
      ]"
    >
      <template #actions>
        <base-action-button
          @click="deleteDialog = true"
          color="error"
          icon="mdi-delete"
          >Delete User</base-action-button
        >
      </template>
    </base-page-header>

    <div v-if="!pending">
      <v-row>
        <v-col cols="12" :md="userDetails.role == 'user' ? 4 : 12">
          <v-card>
            <v-card-title>
              <user-item
                class="!m-0"
                :id="userDetails.id"
                :name="userDetails.name"
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
                        dayjs(userDetails.created_at).format(
                          'DD MMM YYYY, h:mm a'
                        )
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
                    <v-chip
                      :color="userDetails.verified ? 'success' : 'error'"
                      >{{
                        userDetails.verified ? 'Verified' : 'Not Verified'
                      }}</v-chip
                    >
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
        </v-col>

        <v-col v-if="userDetails.role == 'user'" cols="12" md="8">
          <div>
            <order-table
              title="Recent Orders"
              :hide="['user']"
              :user-id="Number(userId)"
            />

            <rate-table
              class="mt-6"
              title="Recent Rates"
              :hide="['user']"
              :user-id="Number(userId)"
            />

            <prescription-table
              class="mt-6"
              title="Recent Prescriptions"
              :hide="['user']"
              :user-id="Number(userId)"
            />
          </div>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="12" md="4">
          <v-skeleton-loader
            type="avatar, list-item-two-line"
            :loading="true"
            :height="500"
          />
        </v-col>

        <v-col cols="12" md="8">
          <v-skeleton-loader
            type="	table-heading, table-thead, table-tbody, table-tfoot"
            loading
            :height="400"
          />

          <v-skeleton-loader
            type="	table-heading, table-thead, table-tbody, table-tfoot"
            loading
            class="mt-6"
            :height="400"
          />
        </v-col>
      </v-row>
    </div>
  </div>

  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    :item="$t('User')"
    @action="remove"
  />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const deleteDialog = ref(false)

const authStore = useAuthStore()

const { userDetails } = storeToRefs(authStore)

const userId = useRoute().params.user_id

const { pending } = await useLazyAsyncData(() => authStore.get(Number(userId)))

const goBack = () => navigateTo('/admin/users')

const remove = async (callback: any) => {
  try {
    await authStore.remove(Number(userId))

    // re-get groups information
    await authStore.list()
  } finally {
    callback()
    goBack()
  }
}
</script>

<style></style>
