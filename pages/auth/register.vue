<template>
  <div class="grid grid-cols-3 min-h-screen bg-background">
    <div
      class="relative col-span-2 bg-[#F0F1F3] flex justify-center items-center"
    >
      <img src="/images/login-bg.svg" width="500" alt="" />
      <img class="absolute top-4 start-4 w-24" src="/logo.png" />
    </div>
    <div class="p-8 flex flex-col bg-white justify-between">
      <div>
        <div class="text-3xl font-semi-bold">Register in Moafa</div>
        <div>Your Beautiful online pharmacy</div>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="submit">
        <div>
          <base-label>Name</base-label>
          <base-text-field v-model="user.name" name="name" />
        </div>

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
  </div>
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
    name: yup.string().required().min(8),
    phone_number: yup.string().required().min(8),
    password: yup.string().required()
  })
})

const submitFun = async () => {
  loading.value = true

  try {
    await authStore.signup()

    showSuccessToaster('Signed up successfully')

    if (authStore.user.role == 'user') {
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
