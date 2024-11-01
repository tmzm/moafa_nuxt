<template>
  <div>
    <base-page-header :breadcrumbs title="Account Sittings" />

    <!-- <profile-card /> -->

    <layout-admin-profile-details class="my-4" />

    <layout-admin-profile-deactivate />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})

const { t } = useI18n()
const breadcrumbs = [
  {
    title: t('links.home'),
    to: '/'
  },
  {
    title: 'My Profile',
    disabled: true
  }
]
</script>

<style></style>
