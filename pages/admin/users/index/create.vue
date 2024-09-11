<template>
  <base-dialog
    :loading="loading"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Admin details</template>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div>
        <base-label>Name</base-label>

        <base-text-field v-model="user.name" name="name" />
      </div>

      <div>
        <base-label>Phone Number</base-label>

        <base-text-field v-model="user.phone_number" name="phone_number" />
      </div>

      <div>
        <base-label>Password</base-label>
        <base-text-field
          v-model="user.password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
        >
          <template #append-inner>
            <v-icon @click="showPassword = !showPassword">{{
              showPassword ? 'mdi-eye' : 'mdi-eye-off'
            }}</v-icon>
          </template>
        </base-text-field>
      </div>

      <div class="flex gap-2">
        <v-btn-cancel @click="goBack">Cancel</v-btn-cancel>

        <v-btn type="submit" :loading="loading"> Save </v-btn>
      </div>
    </form>
  </base-dialog>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const loading = ref<boolean>(false)
const showPassword = ref<boolean>(false)

user.value = {} as User

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
    await authStore.create()

    refreshNuxtData('list_all_users')

    goBack()
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(submitFun)

const goBack = () => navigateTo('/admin/users')
</script>
