<template>
  <v-row class="min-h-screen">
    <v-col
      class="relative col-span-2 bg-[#F0F1F3] flex justify-center items-center"
    >
      <img src="/images/login-bg.svg" width="500" alt="" />
      <img class="absolute top-8 start-8 w-24" src="/logo.png" />
    </v-col>
    <v-col class="bg-white flex items-center justify-center">
      <div class="p-8 flex flex-col gap-4 w-[520px]">
        <div class="text-center">
          <div class="text-2xl mb-2 font-bold">Register in Moafa</div>
          <div class="text-lg">Your Beautiful online pharmacy</div>
        </div>

        <form class="flex flex-col gap-4" @submit.prevent="submit">
          <v-row>
            <v-col cols="6">
              <base-label>First name</base-label>
              <base-text-field v-model="user.first_name" name="first_name" />
            </v-col>
            <v-col cols="6">
              <base-label>Last name</base-label>
              <base-text-field v-model="user.last_name" name="last_name" />
            </v-col>
          </v-row>

          <div>
            <base-label>Phone number</base-label>
            <base-text-field v-model="user.phone_number" name="phone_number" />
          </div>

          <div>
            <base-label>Password</base-label>
            <base-text-field
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
            >
              <template #appendInner>
                <v-icon @click="showPassword = !showPassword">{{
                  showPassword ? 'mdi-eye' : 'mdi-eye-off'
                }}</v-icon>
              </template>
            </base-text-field>
          </div>

          <v-btn type="submit" :loading class="w-full">Sign up</v-btn>
        </form>

        <div class="flex gap-2 mt-3">
          <div>Already have an Account?</div>
          <nuxt-link to="/auth/login">Sign in</nuxt-link>
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
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone_number: yup.string().required().min(8),
    password: yup.string().required()
  })
})

const submitFun = async () => {
  loading.value = true

  try {
    await authStore.signup()

    showSuccessToaster('Signed up successfully')

    if (authStore.user.role == 'USER') {
      navigateTo('/')
    } else {
      navigateTo('/admin')
    }
  } catch (e) {
    showErrorToaster('Phone number has already been taken')
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
