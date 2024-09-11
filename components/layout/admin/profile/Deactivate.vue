<template>
  <v-card>
    <v-card-title>Deactivating Account</v-card-title>

    <v-divider />

    <v-card-text>
      <v-card
        variant="tonal"
        color="warning"
        elevation="0"
        class="!flex !border-2 !border-dashed !border-warning items-center gap-4 px-8 py-4"
      >
        <v-icon size="xxx-large" color="warning"
          >mdi-alert-circle-outline</v-icon
        >

        <div>
          <div class="text-xl text-dark mb-2">
            You are deactivating you account
          </div>
        </div>
      </v-card>

      <v-checkbox
        hide-details
        v-model="conform"
        color="primary"
        label="I Accept deactivate my account"
      />
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-btn @click="alert = true" :disabled="!conform" color="error"
        >Deactivate</v-btn
      >
    </v-card-text>
  </v-card>

  <base-alert-dialog
    @close="alert = false"
    @action="deactivate"
    action="Deactivate"
    v-model="alert"
    title="Are you sure you want to deactivate your account?"
  />
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const toast = useToasterStore()

const conform = ref(false)
const alert = ref(false)

const deactivate = async (callback: any) => {
  try {
    await authStore.deactivate()

    navigateTo('/auth/login')

    toast.showSuccessToaster('تم إلغاء الحساب بنجاح')
  } finally {
    callback()
  }
}
</script>

<style></style>
