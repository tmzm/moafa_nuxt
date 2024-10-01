<template>
  <div>
    <base-page-header
      title="Order Details"
      :breadcrumbs="[
        {
          title: 'Home',
          to: '/admin'
        },
        {
          title: 'Orders',
          to: '/admin/orders'
        },
        {
          title: 'Order Details',
          disabled: true
        }
      ]"
    >
      <template #actions>
        <base-action-button icon="mdi-link">Copy order url</base-action-button>
      </template>
    </base-page-header>

    <div v-if="!pending">
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="h-full">
            <v-card-title>Order Details</v-card-title>
            <v-card-text>
              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-calendar" title="Date Added" />
                <p>{{ dayjs(order.created_at).format('YYYY/MM/DD') }}</p>
              </div>

              <v-divider />

              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-wallet" title="Payment status" />
                <p>{{ order.payment_status ? 'Paid' : 'Not Paid' }}</p>
              </div>

              <v-divider />

              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-truck" title="Shipping status" />
                <p>{{ order.status }}</p>
              </div>

              <v-divider v-if="order.is_prescription" />

              <div
                v-if="order.is_prescription"
                class="flex items-center justify-between"
              >
                <v-list-item
                  prepend-icon="mdi-prescription"
                  title="Prescription"
                />
                <v-chip
                  color="primary"
                  :to="`/admin/prescriptions/${order.prescription?.id}`"
                  >View Prescription</v-chip
                >
              </div>

              <v-divider v-if="order.coupon_id" />

              <div
                v-if="order.coupon_id"
                class="flex items-center justify-between"
              >
                <v-list-item prepend-icon="mdi-tag-off" title="Coupon" />
                <v-chip
                  color="secondary"
                  :to="`/admin/coupons/${order.coupon?.id}`"
                  >Edit Used Coupon</v-chip
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="h-full">
            <v-card-title>Customer Details</v-card-title>
            <v-card-text>
              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-account" title="Customer" />
                <p>{{ order.user.name }}</p>
              </div>

              <v-divider />

              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-phone" title="Phone" />
                <p>{{ order.user.phone_number }}</p>
              </div>

              <v-divider v-if="order.coupon_id" />

              <div
                v-if="order.coupon_id"
                class="flex items-center justify-between"
              >
                <v-list-item prepend-icon="mdi-tag" title="Coupon Discount" />
                <p>
                  {{ order.coupon.discount }}
                  <span>{{
                    order.coupon.discount_type == 'fixed' ? 'SP' : '%'
                  }}</span>
                </p>
              </div>

              <v-divider />

              <div class="flex items-center justify-between">
                <v-list-item
                  prepend-icon="mdi-cash"
                  title="Total Payment Price"
                />
                <p>{{ order.total_price }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="h-full">
            <v-card-title>Billing Address</v-card-title>
            <v-card-text>
              <template v-if="order.location">
                <div class="flex items-center justify-between">
                  <v-list-item
                    prepend-icon="mdi-home-map-marker"
                    title="Address"
                  />
                  <p>{{ order.location.address }}</p>
                </div>

                <v-divider />

                <div class="flex items-center justify-between">
                  <v-list-item prepend-icon="mdi-home-search" title="Type" />
                  <p>{{ order.location.type }}</p>
                </div>

                <v-divider />
              </template>
              <template v-else>
                <layout-empty-placeholder size="small">
                  <template #title> Billing Address not specified </template>
                </layout-empty-placeholder>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card class="mt-6">
        <v-card-title>Products</v-card-title>

        <v-divider />

        <v-data-table
          :items-per-page="100"
          :headers="[
            {
              title: 'Product',
              key: 'product'
            },
            {
              title: 'Quantity',
              key: 'quantity'
            },
            {
              title: 'Unit Price',
              key: 'unit_price'
            },
            {
              title: 'Offer',
              key: 'offer'
            },
            {
              title: 'Total',
              key: 'total_price'
            }
          ]"
          :items="order.order_items"
        >
          <template #item.product="{ item }">
            <v-list-item v-if="item.product" :title="item.product.name">
              <template #prepend>
                <v-img
                  :lazy-src="loadImage()"
                  cover
                  rounded="lg"
                  class="mr-2 my-2"
                  width="50"
                  aspect-ratio="1"
                  :src="loadImage(item.product.image)"
                />
              </template>
            </v-list-item>
          </template>

          <template #item.unit_price="{ item }">
            {{ item.product?.price }} SP
          </template>

          <template #item.offer="{ item }">
            <product-offer-chip :product="item.product" />
          </template>

          <template #item.total_price="{ item }">
            {{
              item.product?.price *
              item.quantity *
              (1 - (item.product.is_offer ? item.product.offer / 100 : 0))
            }}
            SP
          </template>

          <template #bottom></template>
        </v-data-table>

        <v-divider />
      </v-card>
    </div>

    <div v-else>
      <v-row>
        <v-col v-for="_ in 3" cols="12" md="4">
          <v-skeleton-loader
            type="list-item-two-line, list-item-two-line, list-item-two-line"
            loading
            :height="300"
          />
        </v-col>

        <v-col cols="12">
          <v-skeleton-loader
            type="list-item-two-line, list-item-two-line"
            loading
            :height="300"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const orderStore = useOrderStore()

const { order } = storeToRefs(orderStore)

const orderId = useRoute().params.order_id

const { pending } = await useAsyncData(() => orderStore.get(Number(orderId)))
</script>

<style></style>
