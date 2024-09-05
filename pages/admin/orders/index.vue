<template>
  <base-page-header
    title="Orders Listing"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Orders',
        disabled: true
      }
    ]"
  />

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
        <v-col md="4" cols="12">
          <v-text-field
            type="number"
            :max="ordersTotalCount"
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
      :items="orders"
      :items-length="orders?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="orderHeaders"
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

      <template #item.user="{ item }">
        <user-item
          :id="item.user.id"
          :name="item.user.name"
          @click="navigateTo(`/admin/users/${item.user?.id}`)"
        />
      </template>

      <template #item.is_prescription="{ item }">
        {{ item.is_prescription ? 'prescription order' : 'regular order' }}
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
          !item.is_time ? '--:--' : dayjs(item.time).format('YYYY/MM/DD HH:MM')
        }}
      </template>

      <template #item.created_at="{ item }">
        {{ dayjs(item.created_at).format('YYYY/MM/DD HH:MM') }}
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
</template>

<style></style>

<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const orderStore = useOrderStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { orders, paginationOptions, search, ordersTotalCount } =
  storeToRefs(orderStore)

const { pending, refresh } = await useAsyncData('list_all_orders', () =>
  orderStore.getAllOrders()
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
  return Math.ceil(ordersTotalCount.value / itemsPerPage.value)
})
</script>
