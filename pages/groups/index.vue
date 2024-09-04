<template>
  <base-page-header :breadcrumbs title="المجموعات">
    <template #actions>
      <base-action-button icon="mdi-plus-box-outline" to="/groups/create">
        مجموعة جديدة
      </base-action-button>
    </template>
  </base-page-header>

  <base-info class="mb-6"></base-info>

  <base-loader v-if="pending" />

  <div v-else class="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
    <group-card v-for="group in groups" :group></group-card>
  </div>

  <NuxtPage />
</template>

<script setup lang="ts">
const groupStore = useGroupStore()

const { groups } = storeToRefs(groupStore)
const { t } = useI18n()
const breadcrumbs = [
  {
    title: t('links.home'),
    to: '/'
  },
  {
    title: t('links.groups'),
    disabled: true
  }
]

const { pending } = useLazyAsyncData<Group[]>(() => groupStore.list())
</script>
