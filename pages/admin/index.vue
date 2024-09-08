<template>
  <v-row>
    <v-col cols="6" md="3">
      <base-status-card
        color="primary"
        :loading="pending"
        icon="mdi-cart"
        title="All Products"
        :number="counts?.products_count ?? 0"
      />
    </v-col>

    <v-col cols="6" md="2">
      <base-status-card
        color="purple"
        :loading="pending"
        icon="mdi-check-decagram"
        title="All Brands"
        :number="counts?.brands_count ?? 0"
      />
    </v-col>

    <v-col cols="6" md="2">
      <base-status-card
        color="blue"
        :loading="pending"
        icon="mdi-format-list-text"
        title="All Categories"
        :number="counts?.categories_count ?? 0"
      />
    </v-col>

    <v-col cols="6" md="2">
      <base-status-card
        color="red"
        :loading="pending"
        icon="mdi-tag-off"
        title="All Coupons"
        :number="counts?.coupons_count ?? 0"
      />
    </v-col>

    <v-col cols="6" md="3">
      <base-status-card
        color="pink"
        :loading="pending"
        icon="mdi-shopping"
        title="All Orders"
        :number="counts?.orders_count ?? 0"
      />
    </v-col>

    <v-col cols="6" md="2">
      <base-status-card
        color="orange"
        :loading="pending"
        icon="mdi-prescription"
        title="All Prescriptions"
        :number="counts?.prescriptions_count ?? 0"
      />
    </v-col>

    <v-col cols="6" md="3">
      <base-status-card
        color="cyan"
        :loading="pending"
        icon="mdi-star"
        title="All Rates"
        :number="counts?.rates_count ?? 0"
      />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" lg="3" md="6">
      <v-card>
        <v-card-title>Sales By Categories</v-card-title>
        <v-card-text>
          <div class="flex gap-4 items-center">
            <ClientOnly>
              <!-- <apexchart
                :options
                :series="
                  salesCategories.map((salesCategory) => {
                    return salesCategory.total_sales
                  })
                "
              ></apexchart> -->
            </ClientOnly>

            <v-list>
              <v-list-item v-for="salesCategory in salesCategories" :title="salesCategory.name"></v-list-item>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col> </v-col>
  </v-row>
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
