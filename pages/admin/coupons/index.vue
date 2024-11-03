<template>
  <base-page-header
    title="Coupons"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/'
      },
      {
        title: 'Coupons',
        disabled: true
      }
    ]"
  />

  <v-card class="overflow-hidden">
    <v-card-text>
      <div class="flex justify-between items-center">
        <v-text-field
          v-model="search"
          placeholder="Search for coupons"
          prepend-inner-icon="mdi-magnify"
          hide-details
          max-width="400"
        ></v-text-field>
        <div class="flex gap-2">
          <base-icon-button color="primary" :loading="pending" @click="refresh"
            >mdi-refresh</base-icon-button
          >
          <base-action-button
            variant="tonal"
            to="/admin/coupons/create"
            icon="mdi-plus"
          >
            Add Coupon</base-action-button
          >
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-data-table-server
      v-if="coupons.length > 0"
      class="text-no-wrap"
      :items="coupons"
      :items-length="coupons?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="couponHeaders"
    >
      <template #item.actions="{ item }">
        <base-action-menu
          item="coupon"
          view-action
          edit-action
          @edit="navigateTo(`/admin/coupons/${item.id}`)"
          @view="navigateTo(`/admin/coupons/${item.id}/details`)"
        />
      </template>

      <template #item.user="{ item }">
        <template v-if="item.user">
          <user-item
            @click="navigateTo(`/admin/users/${item.user.id}/details`)"
            :user="item.user"
            class="cursor-pointer"
            size="small"
          />
        </template>
        <template v-else>
          <v-chip color="error">No User Specified</v-chip>
        </template>
      </template>

      <template #item.discount_type="{ item }">
        <v-chip color="success">{{ item.discount_type.toUpperCase() }}</v-chip>
      </template>

      <template #item.code="{ item }">
        {{ item.code ?? '----' }}
      </template>

      <template #item.price="{ item }">
        {{ item.price && item.price > 0 ? item.price : '--.--' }}
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
      <template #title> No Coupons yet </template>

      <template #subtitle>
        You can create coupon by clicking
        <v-chip size="small" color="secondary">Add Coupon</v-chip> button
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

const couponStore = useCouponStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { coupons, paginationOptions, search, couponsTotalCount } =
  storeToRefs(couponStore)

const { pending, refresh } = await useLazyAsyncData('list_all_coupons', () =>
  couponStore.list()
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
  return Math.ceil(couponsTotalCount.value / itemsPerPage.value)
})
</script>
