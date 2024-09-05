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
        <base-action-button @click="deleteDialog = true" color="error" icon="mdi-delete"
          >Delete User</base-action-button
        >
      </template>
    </base-page-header>

    <div v-if="!pending">
      <v-row>
        <v-col cols="12" :md="userDetails.role == 'user' ? 4 : 12">
          <v-card class="h-full">
            <v-card-title>
              <div class="text-2xl font-bold">{{ userDetails.name }}</div>
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
          <!-- Recent user orders -->
          <v-card class="overflow-hidden">
            <v-card-title>User Orders</v-card-title>

            <v-divider></v-divider>
            <v-data-table-server
              density="comfortable"
              class="text-no-wrap"
              :items="orders"
              :items-length="orders?.length ?? 0"
              :loading="loadingOrders"
              item-key="id"
              :headers="orderHeaders.filter((h) => h.key !== 'user')"
            >
              <template #item.actions="{ item }">
                <base-icon-button
                  @click="navigateTo(`/admin/orders/${item.id}`)"
                  class="me-2"
                  color="secondary"
                  >mdi-eye-outline</base-icon-button
                >
                <v-tooltip text="Click to copy order url">
                  <template #activator="{ props }">
                    <base-icon-button color="primary" v-bind="props"
                      >mdi-link</base-icon-button
                    >
                  </template>
                </v-tooltip>
              </template>

              <template #item.is_prescription="{ item }">
                {{
                  item.is_prescription ? 'prescription order' : 'regular order'
                }}
              </template>

              <template #item.status="{ item }">
                <v-chip
                  :color="
                    item.status == 'preparing'
                      ? 'error'
                      : item.status == 'shipping'
                      ? 'info'
                      : 'success'
                  "
                  >{{ item.status }}</v-chip
                >
              </template>

              <template #item.payment_status="{ item }">
                <v-chip :color="item.payment_status ? 'success' : 'error'">{{
                  item.payment_status ? 'Paid' : 'Not Paid'
                }}</v-chip>
              </template>

              <template #item.is_time="{ item }">
                {{
                  !item.is_time
                    ? '--:--'
                    : dayjs(item.time).format('YYYY/MM/DD HH:MM')
                }}
              </template>

              <template #item.created_at="{ item }">
                {{ dayjs(item.created_at).format('YYYY/MM/DD HH:MM') }}
              </template>
            </v-data-table-server>
          </v-card>
          <!-- / Recent user orders -->
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="12" md="4">
          <v-skeleton-loader
            type="avatar, list-item-two-line"
            loading
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
const orderStore = useOrderStore()

const { userDetails } = storeToRefs(authStore)
const { orders } = storeToRefs(orderStore)

const userId = useRoute().params.user_id

const { pending } = await useAsyncData(() => authStore.get(Number(userId)))

const { pending: loadingOrders } = await useAsyncData(() =>
  orderStore.listByUserId(Number(userId))
)

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
