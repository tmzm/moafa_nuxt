<template>
  <v-card class="overflow-hidden">
    <template v-if="title">
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-divider />
    </template>

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
      :headers="orderHeaders.filter((h) => !hide?.includes(h.key))"
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

      <template #item.coupon="{ item }">
        <template v-if="item.coupon">
          <v-tooltip>
            <template
              text="Click to view coupon"
              location="end"
              #activator="{ props }"
            >
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
