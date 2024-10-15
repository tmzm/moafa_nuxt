<template>
  <v-card class="overflow-hidden">
    <template v-if="title">
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-divider />
    </template>

    <v-card-text>
      <slot />

      <div class="flex justify-between items-center">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="search"
              placeholder="Search for prescription"
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
      v-if="prescriptions?.length > 0"
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
          :name="item.user.first_name + ' ' + item.user.last_name"
          @click="navigateTo(`/admin/users/${item.user?.id}/details`)"
        />
      </template>

      <template #item.actions="{ item }">
        <base-icon-button
          :to="`/admin/prescriptions/${item.id}`"
          class="me-2"
          size="md"
          >mdi-eye-outline</base-icon-button
        >
        <v-tooltip v-if="item.order_id" text="Click to copy order url">
          <template #activator="{ props }">
            <base-icon-button size="md" color="secondary" v-bind="props"
              >mdi-link</base-icon-button
            >
          </template>
        </v-tooltip>
      </template>

      <template #item.image="{ item }">
        <div class="flex items-center gap-3">
          <v-img
            :lazy-src="loadImage()"
            cover
            rounded="lg"
            class="!my-4 !max-w-24"
            width="50"
            aspect-ratio="1"
            :src="loadImage(item.image)"
          />
        </div>
      </template>

      <template #item.order="{ item }">
        <v-chip :color="item.order_id ? 'success' : 'error'">
          {{ item.order_id ? 'Created' : 'Not Created yet' }}
        </v-chip>
      </template>

      <template #item.description="{ item }">
        <div class="max-w-64 overflow-hidden text-truncate">
          {{ item.description }}
        </div>
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
      <template #title> No Prescriptions yet </template>
    </layout-empty-placeholder>
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

<style></style>
