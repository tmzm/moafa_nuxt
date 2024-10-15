<template>
  <v-row class="min-h-screen">
    <v-col
      class="relative col-span-2 bg-[#F0F1F3] flex justify-center items-center"
    >
      <img src="/images/login-bg.svg" width="500" alt="" />
      <img class="absolute top-8 start-8 w-24" src="/logo.png" />
    </v-col>
    <v-col class="bg-white flex items-center justify-center">
      <div class="flex flex-col gap-4 w-[520px]">
        <div class="text-center">
          <div class="text-2xl font-bold mb-1">Welcome back to Moafa</div>
          <div class="text-md">Your Beautiful online pharmacy</div>
        </div>

        <form class="flex flex-col gap-4" @submit.prevent="submit">
          <div>
            <base-label>Phone number</base-label>
            <base-text-field name="phone_number" v-model="user.phone_number">
              <template #prependInner>
                <div class="flex gap-3 me-3">
                  <img
                    class="h-6 rounded-md"
                    src="https://flagcdn.com/sy.svg"
                  />
                  <div class="font-bold">+960</div>
                  <v-divider vertical />
                </div>
              </template>
            </base-text-field>
          </div>

          <div>
            <base-label>Password</base-label>
            <base-text-field
              :type="showPassword ? 'text' : 'password'"
              name="password"
              v-model="user.password"
            >
              <template #appendInner>
                <v-icon @click.prevent="showPassword = !showPassword">{{
                  showPassword ? 'mdi-eye' : 'mdi-eye-off'
                }}</v-icon>
              </template>
            </base-text-field>
          </div>

          <v-btn type="submit" block :loading>Sign in</v-btn>
        </form>

        <div class="flex gap-2 mt-3 text-center">
          <div>New to Moafa?</div>
          <nuxt-link to="/auth/register">Create an account</nuxt-link>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

user.value = {} as User

const loading = ref(false)
const showPassword = ref(false)

const { handleSubmit } = useForm<User>({
  validationSchema: yup.object().shape({
    phone_number: yup.string().required().min(8),
    password: yup.string().required()
  })
})

const submitFun = async () => {
  loading.value = true

  try {
    await authStore.login()

    showSuccessToaster('Login successfully')

    if (authStore.user.role == 'user') {
      navigateTo('/')
    } else {
      navigateTo('/admin')
    }
  } catch (e) {
    showErrorToaster('Phone number or password isn`t valid')
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(submitFun)

definePageMeta({
  layout: 'blank'
})
</script>

<style></style>
