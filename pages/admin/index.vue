<template>
  <div>
    <v-row>
      <v-col cols="6" md="3">
        <v-card>
          <v-card-title>
            <div class="flex justify-between">
              <div>
                <v-chip class="mr-4" size="x-large" color="secondary">{{
                  counts?.products_count
                }}</v-chip>
                <v-icon>mdi-cart-outline</v-icon>
                <div class="flex gap-4 items-center mt-4">
                  <div class="text-lg text-gray">All Products</div>
                  <base-icon-button to="/admin/products/create">mdi-plus</base-icon-button>
                </div>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="6" md="3">
        <v-card>
          <v-card-title>
            <v-chip class="mr-4" size="x-large" color="secondary">{{
              counts?.categories_count
            }}</v-chip>
            <v-icon>mdi-format-list-bulleted-type</v-icon>
            <div class="flex gap-4 items-center mt-4">
              <div class="text-lg text-gray">All Categories</div>
              <base-icon-button to="/admin/categories/create">mdi-plus</base-icon-button>
            </div>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="6" md="3">
        <v-card>
          <v-card-title>
            <v-chip class="mr-4" size="x-large" color="secondary">{{
              counts?.brands_count
            }}</v-chip>
            <v-icon>mdi-check-decagram-outline</v-icon>
            <div class="flex gap-4 items-center mt-4">
              <div class="text-lg text-gray">All Brands</div>
              <base-icon-button to="/admin/brands/create">mdi-plus</base-icon-button>
            </div>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="6" md="3">
        <v-card>
          <v-card-title>
            <v-chip class="mr-4" size="x-large" color="secondary">{{
              counts?.orders_count
            }}</v-chip>
            <v-icon>mdi-shopping-outline</v-icon>
            <div class="flex gap-4 items-center mt-4">
              <div class="text-lg text-gray">All Orders</div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="6" md="4">
        <v-card>
          <v-card-title>
            <v-chip class="mr-4" size="x-large" color="secondary">{{
              counts?.coupons_count
            }}</v-chip>
            <v-icon>mdi-tag-outline</v-icon>
            <div class="flex gap-4 items-center mt-4">
              <div class="text-lg text-gray">All Coupons</div>
              <base-icon-button to="/admin/coupons/create">mdi-plus</base-icon-button>
            </div>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="6" md="4">
        <v-card>
          <v-card-title>
            <v-chip class="mr-4" size="x-large" color="secondary">{{
              counts?.prescriptions_count
            }}</v-chip>
            <v-icon>mdi-medication-outline</v-icon>
            <div class="flex gap-4 items-center mt-4">
              <div class="text-lg text-gray">All Prescriptions</div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="6" md="4">
        <v-card>
          <v-card-title>
            <v-chip class="mr-4" size="x-large" color="secondary">{{
              counts?.rates_count
            }}</v-chip>
            <v-icon>mdi-star-outline</v-icon>
            <div class="flex gap-4 items-center mt-4">
              <div class="text-lg text-gray">All Rates</div>
            </div>
          </v-card-title>
        </v-card>
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

const { pending } = useLazyAsyncData(async () => {
  await analyticsStore.list()
  await analyticsStore.listCategoriesSales()
})

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
