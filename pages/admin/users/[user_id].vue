<template>
  <div>
    <base-page-header
      title="User details"
      :breadcrumbs="[
        {
          title: 'Home',
          to: '/admin'
        },
        {
          title: 'Users',
          to: '/admin/users'
        },
        {
          title: 'User Details',
          disabled: true
        }
      ]"
    >
      <template #actions>
        <base-action-button
          @click="deleteDialog = true"
          color="error"
          icon="mdi-delete"
          >Delete User</base-action-button
        >
      </template>
    </base-page-header>

    <v-tabs class="mb-6">
      <v-tab :to="`/admin/users/${userId}/details`">Details</v-tab>
      <v-tab :to="`/admin/users/${userId}/chat`">Chat</v-tab>
      <v-tab :to="`/admin/users/${userId}/orders`">Orders</v-tab>
      <v-tab :to="`/admin/users/${userId}/rates`">Rates</v-tab>
      <v-tab :to="`/admin/users/${userId}/prescriptions`">Prescriptions</v-tab>
    </v-tabs>
  </div>

  <nuxt-page />

  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    :item="$t('User')"
    @action="remove"
  />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})

const deleteDialog = ref(false)

const authStore = useAuthStore()

const userId = useRoute().params.user_id

const goBack = () => navigateTo('/admin/users')

const remove = async (callback: any) => {
  try {
    await authStore.remove(Number(userId))

    // re-get groups information
    await authStore.list()
  } finally {
    callback()
    goBack()
  }
}
</script>

<style></style>
