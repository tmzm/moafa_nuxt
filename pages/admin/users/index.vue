<template>
  <base-page-header
    title="Users"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Users',
        disabled: true
      }
    ]"
  >
    <template #actions>
      <base-action-button
        to="/admin/users/create"
        variant="tonal"
        icon="mdi-plus"
      >
        Add Admin
      </base-action-button>
    </template>
  </base-page-header>

  <v-card class="overflow-hidden">
    <v-card-text>
      <v-row>
        <v-col md="8" cols="12">
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col md="4" cols="6">
          <v-text-field
            type="number"
            :max="usersTotalCount"
            min="5"
            @update:model-value="itemsPerPage = parseInt($event, 10)"
            :model-value="itemsPerPage"
            label="items per page"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-data-table-server
      density="comfortable"
      class="text-no-wrap"
      :items="users"
      :items-length="users?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="userHeaders"
    >
      <template #item.actions="{ item }">
        <base-icon-button @click="navigateTo(`/admin/users/${item.id}`)"
          >mdi-eye</base-icon-button
        >
      </template>

      <template #item.name="{ item }">
        <v-list-item nav class="my-2" :title="item?.name">
          <template #prepend>
            <div class="bg-secondary-lighten-1 my-2 mr-4 rounded-lg">
              <v-icon size="30" color="white">mdi-account</v-icon>
            </div>
          </template>
        </v-list-item>
      </template>

      <template #item.verified="{ item }">
        <v-chip :color="item.verified ? 'success' : 'error'">{{
          item.verified ? 'Verified' : 'Not Verified'
        }}</v-chip>
      </template>

      <template #item.created_at="{ item }">
        {{ dayjs(item.created_at).format('DD MMM YYYY, h:mm a') }}
      </template>

      <template v-slot:bottom>
        <div class="text-center ma-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="4"
          ></v-pagination>
        </div>
      </template>
    </v-data-table-server>
  </v-card>

  <nuxt-page />
</template>

<style></style>

<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const authStore = useAuthStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { users, paginationOptions, search, usersTotalCount } =
  storeToRefs(authStore)

const { pending, refresh } = await useAsyncData('list_all_users', () =>
  authStore.list()
)

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})

watch(itemsPerPage, (oldValue, newValue) => {
  paginationOptions.value.itemsPerPage = itemsPerPage.value

  refresh()
})

watch(search, () => refresh())

const pageCount = computed(() => {
  return Math.ceil(usersTotalCount.value / itemsPerPage.value)
})
</script>
