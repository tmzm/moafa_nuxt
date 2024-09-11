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
              placeholder="Search for rate"
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
      density="comfortable"
      class="text-no-wrap"
      :items="rates"
      :items-length="rates?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="rateHeaders.filter((h) => !hide?.includes(h.key))"
    >
      <template #item.product="{ item }">
        <div class="flex items-center gap-3">
          <v-img
            :lazy-src="$config.public.basePlaceholderUrl"
            cover
            rounded="lg"
            class="!my-4 !max-w-24"
            width="50"
            aspect-ratio="1"
            :src="$config.public.baseUrl + item.product?.image"
          />
          <div>{{ item.product?.name }}</div>
        </div>
      </template>

      <template #item.user="{ item }">
        <user-item
          :id="item.user?.id ?? 0"
          :name="item.user?.name ?? ''"
          @click="navigateTo(`/admin/users/${item.user?.id}`)"
        />
      </template>

      <template #item.number="{ item }">
        <v-rating
          half-increments
          size="sm"
          color="secondary"
          disabled
          :model-value="item.number"
        />
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

const rateStore = useRateStore()

const page = ref(1)
const itemsPerPage = ref(10)

const { rates, paginationOptions, search, ratesTotalCount } =
  storeToRefs(rateStore)

const { pending, refresh } = await useAsyncData(() =>
  rateStore.list(props.userId)
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
  return Math.ceil(ratesTotalCount.value / itemsPerPage.value)
})
</script>

<style></style>
