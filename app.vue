<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <base-toaster v-model="showToaster" :type="toasterType">
    {{ message }}
  </base-toaster>
</template>

<script setup lang="ts">
import { localize } from '@vee-validate/i18n'

const toasterStore = useToasterStore()

localize('en')

const { showToaster, message, toasterType } = storeToRefs(toasterStore)
</script>
