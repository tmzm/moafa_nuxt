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
    />

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
              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-wallet" title="Payment status" />
                <p>{{ order.payment_status ? 'Paid' : 'Not Paid' }}</p>
              </div>

              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-truck" title="Shipping status" />
                <p>{{ order.status }}</p>
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
              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-phone" title="Phone" />
                <p>{{ order.user.phone_number }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="h-full">
            <v-card-title>Billing Address</v-card-title>
            <v-card-text>
              <div class="flex items-center justify-between">
                <v-list-item
                  prepend-icon="mdi-home-map-marker"
                  title="Address"
                />
                <p>{{ order.location.address }}</p>
              </div>
              <div class="flex items-center justify-between">
                <v-list-item prepend-icon="mdi-home-search" title="Type" />
                <p>{{ order.location.type }}</p>
              </div>
              <div class="flex items-center justify-between">
                <v-list-item
                  prepend-icon="mdi-cash"
                  title="Total payment price"
                />
                <p>{{ order.total_price }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card class="mt-6">
        <v-card-title>Products</v-card-title>

        <v-divider />

        <v-data-table
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
                  lazy-src="http://127.0.0.1:8000/images/placeholder.jpg"
                  cover
                  rounded="lg"
                  class="mr-2 my-2"
                  width="60"
                  aspect-ratio="1"
                  :src="`http://127.0.0.1:8000${item.product.image}`"
                />
              </template>
            </v-list-item>
          </template>
          <template #item.unit_price="{ item }">
            {{ item.product?.price }} SP
          </template>

          <template #item.total_price="{ item }">
            {{ item.product?.price * item.quantity }} SP
          </template>

          <template #bottom> </template>
        </v-data-table>
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

const { pending } = await useAsyncData(() =>
  orderStore.getOrder(Number(orderId))
)
</script>

<style></style>
