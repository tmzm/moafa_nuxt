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
            :max="ratesTotalCount"
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
      :items="rates"
      :items-length="rates?.length ?? 0"
      :loading="pending"
      item-key="id"
      :headers="rateHeaders.filter((h) => !hide?.includes(h.key))"
    >
      <template #item.product="{ item }">
        <div class="flex items-center gap-3">
          <v-img
            lazy-src="http://127.0.0.1:8000/images/placeholder.jpg"
            cover
            rounded="lg"
            class="!max-w-14 !my-4"
            width="50"
            aspect-ratio="1"
            :src="`http://127.0.0.1:8000${item.product?.image}`"
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
