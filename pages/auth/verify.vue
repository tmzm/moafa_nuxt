<template>
  <div class="grid grid-cols-3 min-h-screen bg-background">
    <div class="p-8 flex flex-col justify-between bg-white">
      <div>
        <div class="text-3xl font-semi-bold">Enter Verification Code</div>
        <div v-if="pending && !error">
          We’ve send you code on
          <span v-for="_ in authStore.user.phone_number.length - 3">*</span>
          <span>{{
            authStore.user.phone_number.slice(
              authStore.user.phone_number.length - 3,
              authStore.user.phone_number.length
            )
          }}</span>
        </div>
      </div>

      <form @submit.prevent="submit" class="flex flex-col gap-4">
        <v-otp-input variant="solo-filled" v-model="otp" />

        <v-btn
          :loading="loading"
          :disabled="otp < 6 || loading"
          @click="submit"
          block
          >Verify</v-btn
        >
      </form>

      <div class="flex gap-2 mt-3">
        <div>Did not receive the SMS? Check your messages, or</div>
        <nuxt-link to="/auth/register">Resend Code</nuxt-link>
      </div>
    </div>
    <div
      class="relative col-span-2 bg-[#F0F1F3] flex justify-center items-center"
    >
      <img src="/smartphone-2.svg" width="500" alt="" />
      <img class="absolute top-4 end-4 w-24" src="/logo.png" />
    </div>
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
