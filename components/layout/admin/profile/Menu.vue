<template>
  <base-menu close-on-content-click :loading="loading">
    <template v-slot:activator="{ props }">
      <base-icon-button v-bind="props" color="primary">
        mdi-account
      </base-icon-button>
    </template>

    <template #menu>
      <user-item :user="authStore.user" class="mx-5 my-3" />

      <v-divider class="my-2" />

      <v-list nav>
        <v-list-item
          prepend-icon="mdi-account-outline"
          :title="$t('links.my_account')"
          subtitle="Profile Sittings"
          to="/admin/my-account"
        />

        <layout-language-switcher list-item />

        <v-list-item
          prepend-icon="mdi-logout"
          :title="$t('actions.logout')"
          subtitle="Sign out"
          @click="logout"
        />
      </v-list>
    </template>
  </base-menu>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const loading = ref(false)

const logout = () => {
  loading.value = true

  try {
    authStore.logout()

    authStore.accessToken = null
    authStore.refreshToken = null
    navigateTo('/auth/login')
  } finally {
    loading.value = false
  }
}
</script>
