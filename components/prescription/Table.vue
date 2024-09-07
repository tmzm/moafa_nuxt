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
      :headers="prescriptionHeaders.filter((h) => !hide?.includes(h.key))"
    >
      <template #item.user="{ item }">
        <user-item
          :id="item.user.id"
          :name="item.user.name"
          @click="navigateTo(`/admin/users/${item.user?.id}`)"
        />
      </template>

      <template #item.actions="{ item }">
        <base-icon-button
          :to="`/admin/prescriptions/${item.id}`"
          class="me-2"
          color="primary"
          >mdi-eye-outline</base-icon-button
        >
        <v-tooltip v-if="item.order" text="Click to copy order url">
          <template #activator="{ props }">
            <base-icon-button color="secondary" v-bind="props"
              >mdi-link</base-icon-button
            >
          </template>
        </v-tooltip>
      </template>

      <template #item.image="{ item }">
        <div class="flex items-center gap-3">
          <v-img
            lazy-src="http://127.0.0.1:8000/images/placeholder.jpg"
            cover
            rounded="lg"
            class="!my-4 !max-w-24"
            width="50"
            aspect-ratio="1"
            :src="`http://127.0.0.1:8000${item.image}`"
          />
        </div>
      </template>

      <template #item.order="{ item }">
        {{ item.order ? 'Created' : 'Not Created yet' }}
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
  </v-card>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const props = defineProps<{
  title?: string
  hide?: string[]
  userId?: number
}>()

const prescriptionStore = usePrescriptionStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { prescriptions, paginationOptions, search, prescriptionsTotalCount } =
  storeToRefs(prescriptionStore)

const { pending, refresh } = await useAsyncData('prescriptions', () =>
  prescriptionStore.list(props.userId ?? undefined)
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

<style>

</style>