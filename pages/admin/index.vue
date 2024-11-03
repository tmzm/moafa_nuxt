<template>
  <div>
    <v-row>
      <v-col
        v-for="{ icon, color, number, to, text, cardColor } in items"
        cols="6"
        md="3"
      >
        <base-status-card :icon :color :number :to :text :card-color />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})

const analyticsStore = useAnalyticsStore()

const { counts, salesCategories } = storeToRefs(analyticsStore)

const { status } = useLazyAsyncData(async () => {
  await analyticsStore.list()
  await analyticsStore.listCategoriesSales()
})

const items : {
  icon: string
  color: string
  number?: number
  to?: string
  text: string
  cardColor?: string
}[] = [
  {
    icon: 'mdi-cart-outline',
    color: 'secondary',
    number: counts.value?.products_count,
    to: '/admin/products/create',
    text: 'All Products'
  },
  {
    icon: 'mdi-format-list-bulleted-type',
    color: 'primary',
    number: counts.value?.products_count,
    to: '/admin/categories/create',
    text: 'All Categories',
  },
  {
    icon: 'mdi-check-decagram-outline',
    color: 'purple',
    number: counts.value?.brands_count,
    to: '/admin/brands/create',
    text: 'All Brands'
  },
  {
    icon: 'mdi-shopping-outline',
    color: 'pink',
    number: counts.value?.orders_count,
    text: 'All Orders'
  },
  {
    icon: 'mdi-tag-outline',
    color: 'red',
    number: counts.value?.coupons_count,
    to: '/admin/coupons/create',
    text: 'All Coupons',
  },
  {
    icon: 'mdi-medication-outline',
    color: 'cyan',
    number: counts.value?.prescriptions_count,
    text: 'All Prescriptions'
  },
  {
    icon: 'mdi-star-outline',
    color: 'secondary',
    number: counts.value?.rates_count,
    text: 'All Rates'
  }
] 

const options = ref({
  chart: {
    type: 'donut'
  },
  labels: salesCategories.value.map((salesCategory) => {
    return salesCategory.name
  }),
  colors: ['#ff4560', '#008ffb', '#c0c0c0'], // Custom colors
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false // Disable the legend
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%'
      }
    }
  }
})
</script>

<style></style>
