<template>
  <v-card class="overflow-hidden">
    <template v-if="title">
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-divider />
    </template>

    <v-card-text>
      <slot />

      <div class="flex justify-between items-center">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="search"
              placeholder="Search for order"
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
      v-if="orders.length > 0"
      class="text-no-wrap"
      :items="orders"
      :items-length="orders?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="orderHeaders.filter((h) => !hide?.includes(h.key))"
    >
      <template #item.actions="{ item }">
        <base-icon-button
          @click="navigateTo(`/admin/orders/${item.id}`)"
          class="me-2"
          size="md"
          color="secondary"
          >mdi-eye-outline</base-icon-button
        >
        <v-tooltip text="Click to copy order url">
          <template #activator="{ props }">
            <base-icon-button size="md" v-bind="props"
              >mdi-link</base-icon-button
            >
          </template>
        </v-tooltip>
      </template>

      <template #item.coupon="{ item }">
        <template v-if="item.coupon">
          <v-tooltip text="Click to edit coupon" location="end">
            <template #activator="{ props }">
              <v-chip
                v-bind="props"
                @click="navigateTo(`/admin/coupons/${item.coupon.id}`)"
                color="success"
                >{{
                  item.coupon.code ? '#' + item.coupon.code : 'Coupon Used'
                }}</v-chip
              >
            </template>
          </v-tooltip>
        </template>
        <template v-else>
          <v-chip color="error">No Coupon Used</v-chip>
        </template>
      </template>

      <template #item.user="{ item }">
        <user-item
          :id="item.user.id"
          :name="item.user.first_name + ' ' + item.user.last_name"
          @click="navigateTo(`/admin/users/${item.user?.id}/details`)"
        />
      </template>

      <template #item.is_prescription="{ item }">
        {{ item.is_prescription ? 'Prescription Order' : 'Regular Order' }}
      </template>

      <template #item.status="{ item }">
        <v-chip
          :color="
            item.status == 'PREPARING'
              ? 'error'
              : item.status == 'SHIPPING'
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

    <layout-empty-placeholder size="small" v-else>
      <template #title> No orders yet </template>
    </layout-empty-placeholder>
  </v-card>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const props = defineProps<{
  title?: string
  hide?: string[]
  userId?: number
  couponId?: number
}>()

const orderStore = useOrderStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { orders, paginationOptions, search, ordersTotalCount } =
  storeToRefs(orderStore)

const { pending, refresh } = await useAsyncData('list_all_orders', () =>
  orderStore.list(props.userId, props.couponId)
)

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})

watch(itemsPerPage, () => {
  paginationOptions.value.itemsPerPage = itemsPerPage.value

  refresh()
})

watch(search, () => refresh())

const pageCount = computed(() => {
  return Math.ceil(ordersTotalCount.value / itemsPerPage.value)
})
</script>

<style></style>
