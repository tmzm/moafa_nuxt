<template>
  <v-card :disabled="loading">
    <v-card-title>Account Details</v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <Form v-slot="{ errors }" @submit="submit">

        <div class="item-center md:grid grid-cols-3 flex flex-col gap-2">
          <base-label>Name</base-label>

            <Field
              v-model="user.name"
              rules="required"
              name="name"
              v-slot="{ field }"
            >
              <v-text-field
                v-bind="field"
                :error-messages="errors.name"
              />
            </Field>
        </div>

        <div class="flex justify-end gap-4">
          <v-btn variant="tonal" color="dark" @click="router.replace('/')">
            Return
          </v-btn>

          <v-btn type="submit" :loading> {{ $t('actions.save') }}</v-btn>
        </div>
      </Form>
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
