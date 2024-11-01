<template>
  <base-page-header
    title="Coupons Purchases"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Coupons Purchases',
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
              placeholder="Search for coupons"
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
      v-if="couponsPurchases.length > 0"
      class="text-no-wrap"
      :items="couponsPurchases"
      :items-length="couponsPurchases?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="couponPurchasesHeaders"
    >
      <template #item.actions="{ item }">
        <base-icon-button color="red">mdi-delete-outline</base-icon-button>
      </template>

      <template #item.user_id="{ item }">
        <template v-if="item.user">
          <user-item
            @click="navigateTo(`/admin/users/${item.user.id}/details`)"
            size="small"
            :name="item.user?.first_name + ' ' + item.user?.last_name"
            :id="item.user?.id"
          />
        </template>
        <template v-else>
          <v-chip color="error">No User Specified</v-chip>
        </template>
      </template>

      <template #item.coupon_id="{ item }">
        <v-tooltip text="Click to edit coupon" location="end">
          <template #activator="{ props }">
            <v-chip
              v-bind="props"
              @click="navigateTo(`/admin/coupons/${item.coupon?.id}`)"
              color="success"
              >{{
                item.coupon?.code ? '#' + item.coupon.code : 'Coupon Used'
              }}</v-chip
            >
          </template>
        </v-tooltip>
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
      <template #title> No Coupon purchases yet </template>
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

const couponPurchasesStore = useCouponPurchasesStore()

const page = ref(1)
const itemsPerPage = ref(10)

const {
  couponsPurchases,
  paginationOptions,
  search,
  couponsPurchasesTotalCount
} = storeToRefs(couponPurchasesStore)

const { pending, refresh } = await useLazyAsyncData(
  'list_all_coupons_purchases',
  () => couponPurchasesStore.list()
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
  return Math.ceil(couponsPurchasesTotalCount.value / itemsPerPage.value)
})
</script>
