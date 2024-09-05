<template>
  <base-page-header
    title="Prescriptions"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Prescriptions',
        disabled: true
      }
    ]"
  />

  <v-card class="overflow-hidden">
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
        <v-col md="4" cols="6">
          <v-text-field
            type="number"
            :max="prescriptionsTotalCount"
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
      :items="prescriptions"
      :items-length="prescriptions?.length ?? 0"
      :loading="pending"
      item-key="id"
    >
      <template #item.actions="{ item }">
        <base-icon-button class="me-2" color="primary"
          >mdi-eye-outline</base-icon-button
        >
      </template>

      <template #item.image="{ item }">
        <div class="flex items-center gap-3">
          <v-img
            lazy-src="http://127.0.0.1:8000/images/placeholder.jpg"
            cover
            rounded="lg"
            class="!my-4"
            width="50"
            aspect-ratio="1"
            :src="`http://127.0.0.1:8000${item.image}`"
          />
        </div>
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

<style></style>

<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const prescriptionStore = usePrescriptionStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { prescriptions, paginationOptions, search, prescriptionsTotalCount } =
  storeToRefs(prescriptionStore)

const { pending, refresh } = await useAsyncData('prescriptions', () =>
  prescriptionStore.list()
)

watch(page, () => {
  paginationOptions.value.page = page.value
  refresh()
})

watch(itemsPerPage, (oldValue, newValue) => {
  paginationOptions.value.itemsPerPage = itemsPerPage.value

  refresh()
})

watch(search, () => refresh())

const pageCount = computed(() => {
  return Math.ceil(prescriptionsTotalCount.value / itemsPerPage.value)
})
</script>
