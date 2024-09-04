<template>
  <base-page-header :loading :breadcrumbs="items" :title="group.name" />

  <habit-card />

  <div class="grid md:grid-cols-2 my-8">
    <div class="text-xl grow flex items-center">
      <span>الأعضاء المشاركين</span>
    </div>

    <div class="flex gap-4">
      <v-select
        :items="sortOptions"
        variant="solo"
        v-model="sort"
        class=""
        hide-details
      />
      <v-text-field
        label="البحث"
        variant="solo"
        v-model="search"
        placeholder="البحث في الأعضاء"
        hide-details
      />

      <v-card
        @click="grid = true"
        :color="grid ? 'light' : undefined"
        elevation="2"
        class="!rounded-sm h-full aspect-square !flex items-center justify-center"
      >
        <v-icon>mdi-grid-large</v-icon>
      </v-card>
      <v-card
        @click="grid = false"
        :color="!grid ? 'light' : undefined"
        elevation="2"
        class="!rounded-sm h-full aspect-square !flex items-center justify-center"
      >
        <v-icon>mdi-view-list</v-icon>
      </v-card>
    </div>
  </div>

  <div v-if="!loadingStats">
    <div v-if="grid">
      <habit-member
        v-for="state in filteredStats"
        :member="state"
        :habit-goal="habitStore.habit.goal"
      />
    </div>
    <v-card v-else>
      <v-card-text>
        <div v-for="(state, i) in filteredStats">
          <habit-member-row
            :member="state"
            :habit-goal="habitStore.habit.goal"
          />
          <v-divider v-if="i != filteredStats?.length -1" />
        </div>
      </v-card-text>
    </v-card>
  </div>

  <div v-else class="grid md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
    <v-skeleton-loader class="border w-full" type="article" />
  </div>

  <nuxt-page />
</template>

<script lang="ts" setup>
const i18n = useI18n()
const groupStore = useGroupStore()
const habitStore = useHabitStore()

const { group } = storeToRefs(groupStore)

const sort = ref('days_completed')
const search = ref('')
const grid = ref(true)

const route = useRoute()

const groupId = Number(route.params.group_id)
const habitName = String(route.params.habit_name)

const { pending: loading } = useLazyAsyncData(() => groupStore.get(groupId))
const { pending: loadingStats } = useLazyAsyncData(() =>
  habitStore.getHabitStatistics(groupId, habitName)
)

const sortOptions = [
  {
    title: 'حسب أفضل سلسلة',
    value: 'max_streak'
  },
  {
    title: 'حسب أكثر الأيام',
    value: 'days_completed'
  }
]

const filteredStats = computed(() => {
  let filtered = habitStore.memberStats

  if (search.value)
    filtered = habitStore.memberStats.filter((s) =>
      (s.first_name + ' ' + s.last_name).includes(search.value)
    )

  //@ts-ignore
  return filtered.sort((s1, s2) => s2[sort.value] - s1[sort.value])
})

const items = [
  {
    title: i18n.t('links.groups'),
    to: '/groups',
    disabled: false
  },
  {
    title: i18n.t('links.group_details'),
    to: `/groups/${groupId}/details`
  },
  {
    title: 'عرض العادة',
    disabled: true
  }
]
</script>

<style></style>
