<template>
  <div
    class="relative w-full min-h-screen bg-background flex items-center justify-center"
  >
    <img class="absolute top-4 start-4 w-24" src="/logo.png" />
    <v-card
      :loading="pending || loading"
      v-if="!error"
    >
      <v-card-title>Enter Verification Code</v-card-title>
      <v-card-text>
        <div class="mb-4">
          We’ve send you code on
          <span v-for="_ in authStore.user.phone_number.length - 3">*</span>
          <span>{{
            authStore.user.phone_number.slice(
              authStore.user.phone_number.length - 3,
              authStore.user.phone_number.length
            )
          }}</span>
        </div>

        <Form @submit="submit" class="flex flex-col gap-4" v-slot="{ errors }">
          <Field v-model="otp" name="otp" rules="required" v-slot="{ field }">
            <v-otp-input v-bind="field" :error="errors.otp"></v-otp-input>
          </Field>
          <v-btn :loading="loading" type="submit" block>Verify</v-btn>
        </Form>
        <div class="flex gap-2 items-center mt-4">
          <div>Did not receive the SMS? Check your messages, or</div>
          <nuxt-link>Resend Code</nuxt-link>
        </div>
      </v-card-text>
    </v-card>
    <v-card title="An error happened" v-else>
      <v-card-text> </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const route = useRoute()

const loading = ref(false)

const { otp } = storeToRefs(authStore)

const submit = async () => {
  loading.value = true

  try {
    await authStore.verify()

    if (authStore.user.role == 'user') {
      navigateTo('/')
    } else {
      navigateTo('/admin')
    }
  } catch {
    showErrorToaster('OTP not valid')
  } finally {
    loading.value = false
  }
}

const { pending, error } = await useLazyAsyncData(async () =>
  authStore.me(route.query.verify_token as string)
)

definePageMeta({
  layout: 'blank'
})
</script>

<style></style>
