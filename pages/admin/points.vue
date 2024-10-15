<template>
  <base-page-header
    title="Points Transfers"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Points Transfers',
        disabled: true
      }
    ]"
  >
    <template #actions>
      <base-action-button icon="mdi-plus" to="/admin/points/transfer"
        >Transfer points</base-action-button
      >
    </template>
  </base-page-header>

  <v-card class="overflow-hidden">
    <v-card-text>
      <div class="flex justify-between items-center">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="search"
              placeholder="Search for points transfers"
              prepend-inner-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="flex gap-2">
          <!-- <base-icon-button @click="isVisible = !isVisible" color="primary"
            >mdi-filter</base-icon-button
          > -->
          <base-icon-button color="primary" :loading="pending" @click="refresh"
            >mdi-refresh</base-icon-button
          >
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-data-table-server
      v-if="pointsTransfers.length > 0"
      density="comfortable"
      class="text-no-wrap"
      :items="pointsTransfers"
      :items-length="pointsTransfers?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="pointsTransfersHeaders"
    >
      <template #item.user_id="{ item }">
        <template v-if="item.user">
          <user-item
            @click="navigateTo(`/admin/users/${item.user.id}/details`)"
            size="small"
            :name="item.user?.first_name + item.user.last_name"
            :id="item.user?.id"
          />
        </template>
        <template v-else>
          <v-chip color="error">No User Specified</v-chip>
        </template>
      </template>

      <template #item.type="{ item }">
        <v-chip :color="item.type == 'DEPOSIT' ? 'success' : 'error'">{{
          item.type.toUpperCase()
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
      <template #title> No points transfers yet </template>

      <template #subtitle>
        You can transfer points to any user by clicking
        <v-chip size="small" color="secondary">Transfer points</v-chip> button
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

const pointsStore = usePointsStore()

const page = ref(1)
const itemsPerPage = ref(10)

const {
  pointsTransfers,
  paginationOptions,
  search,
  pointsTransfersTotalCount
} = storeToRefs(pointsStore)

const { pending, refresh } = await useLazyAsyncData(
  'list_all_points_transfers',
  () => pointsStore.list()
)

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})

watch(itemsPerPage, (oldValue, newValue) => {
  if (itemsPerPage.value === 0) itemsPerPage.value = 10

  paginationOptions.value.itemsPerPage = itemsPerPage.value

  refresh()
})

debouncedWatch(search, () => refresh(), {
  debounce: 200
})

const pageCount = computed(() => {
  return Math.ceil(pointsTransfersTotalCount.value / itemsPerPage.value)
})
</script>
