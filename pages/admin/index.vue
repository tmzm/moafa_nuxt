<template>
  <div></div>
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
