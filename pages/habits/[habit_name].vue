<template>
  <base-page-header :loading :breadcrumbs="items" :title="group.name" />

  <habit-card />

  <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
    <habit-member :member="({} as any)" />
    <habit-member :member="({} as any)" />
    <habit-member :member="({} as any)" />
  </div>

  <nuxt-page />
</template>

<script lang="ts" setup>
const i18n = useI18n()
const groupStore = useGroupStore()

const { group } = storeToRefs(groupStore)

const route = useRoute()

const groupId = Number(route.params.group_id)

const { pending: loading } = useLazyAsyncData(() => groupStore.get(groupId))

const items = [
  {
    title: i18n.t('links.groups'),
    to: '/groups',
    disabled: false
  },
  {
    title: i18n.t('links.group_details'),
    disabled: true
  },
  {
    title: 'عرض العادة',
    disabled: true
  }
]
</script>

<style></style>
