<template>
  <v-card :disabled="loading">
    <v-card-title>Account Details</v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <form @submit.prevent="submit">
        <div class="item-center md:grid grid-cols-3 flex flex-col gap-2">
          <base-label>Name</base-label>

          <base-text-field v-model="user.first_name" name="first_name" />

          <base-text-field v-model="user.last_name" name="last_name" />
        </div>

        <div class="flex justify-end gap-4">
          <v-btn variant="tonal" color="dark" @click="router.replace('/')">
            Return
          </v-btn>

          <v-btn type="submit" :loading> {{ $t('actions.save') }}</v-btn>
        </div>
      </form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const toast = useToasterStore()
const router = useRouter()

const { user } = storeToRefs(authStore)

const loading = ref(false)

const submit = async () => {
  loading.value = true

  try {
    // await authStore.()

    authStore.me()

    // toast.showSuccessToaster('تم تعديل المعلومات بنجاح')

    router.replace('/')
  } finally {
    loading.value = false
  }
}
</script>

<style></style>
