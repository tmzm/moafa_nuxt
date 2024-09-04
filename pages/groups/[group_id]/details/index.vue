<template>
  <v-container class="relative">
    <base-page-header :breadcrumbs="items" :title="group.name" :pending>
      <template #actions>
        <base-action-button
          color="blue"
          variant="tonal"
          icon="mdi-link"
          :loading="linkLoading"
          @click="getLink"
        >
          {{ $t('actions.copy_link') }}
        </base-action-button>

        <base-action-button
          icon="mdi-plus"
          :to="`/groups/${groupId}/details/habits/create`"
        >
          {{ $t('actions.add_habit') }}
        </base-action-button>
      </template>
    </base-page-header>

    <v-tabs>
      <v-tab :to="`/groups/${groupId}/details/habits`"> {{ $t('habits') }} </v-tab>

      <v-tab :to="`/groups/${groupId}/details/members`">
        {{ $t('group_members') }}
      </v-tab>
    </v-tabs>
  </v-container>

  <NuxtPage />
</template>

<script setup lang="ts">
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)

const route = useRoute()
const groupId = Number(route.params.group_id)

const i18n = useI18n()

const items = [
  {
    title: i18n.t('links.groups'),
    to: '/groups',
    disabled: false
  },
  {
    title: i18n.t('links.group_details'),
    disabled: true
  }
]

const link = ref<string>('')
const linkLoading = ref<boolean>(false)

const { pending } = useLazyAsyncData(() => groupStore.get(groupId))

const getLink = async () => {
  linkLoading.value = true

  try {
    link.value = await groupStore.getLink(groupId)

    // copy value to clipboard
    navigator.clipboard.writeText(link.value)
  } finally {
    linkLoading.value = false
  }
}
</script>

<style scoped>
.sidebar-container {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 999999;
  background: white;
  min-width: 400px;
}

.sidebar {
  /* position: sticky; */
  top: 5rem;
  left: 0;
  max-width: 400px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
