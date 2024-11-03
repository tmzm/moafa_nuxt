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
  />

  <v-card class="overflow-hidden">
    <v-card-text>
      <div class="flex justify-between items-center">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="search"
              placeholder="Search for users"
              prepend-inner-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="flex gap-2">
          <base-icon-button color="primary" :loading="pending" @click="refresh"
            >mdi-refresh</base-icon-button
          >
          <base-action-button
            variant="tonal"
            to="/admin/users/create"
            icon="mdi-plus"
          >
            Add New Admin</base-action-button
          >
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-data-table-server
      v-if="users.length > 0"
      class="text-no-wrap"
      :items="users"
      :items-length="users?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="userHeaders"
    >
      <template #item.actions="{ item }">
        <base-icon-button @click="navigateTo(`/admin/users/${item.id}/details`)"
          >mdi-eye</base-icon-button
        >
      </template>

      <template #item.name="{ item }">
        <user-item
          @click="navigateTo(`/admin/users/${item?.id}/details`)"
          :user="item"
        />
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

    <layout-empty-placeholder size="small" v-else>
      <template #title> No Users yet </template>

      <template #subtitle>
        You can create admin by clicking
        <v-chip size="small" color="secondary">Add admin</v-chip> button
      </template>
    </layout-empty-placeholder>
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
