<template>
  <base-dialog
    :loading="loading"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Admin details</template>

    <Form class="flex flex-col gap-4" v-slot="{ errors }" @submit="submit">
      <div>
        <base-label>Name</base-label>

        <Field
          v-model="user.name"
          rules="required"
          name="name"
          v-slot="{ field }"
        >
          <v-text-field
            v-bind="field"
            variant="outlined"
            label=""
            :error-messages="errors.name"
          />
        </Field>
      </div>

      <div>
        <base-label>Phone Number</base-label>

        <Field
          v-model="user.phone_number"
          rules="required"
          name="phone_number"
          v-slot="{ field }"
        >
          <v-text-field
            v-bind="field"
            variant="outlined"
            label=""
            :error-messages="errors.phone_number"
          />
        </Field>
      </div>

      <div>
        <base-label>Password</base-label>
        <Field
          v-model="user.password"
          v-slot="{ field }"
          rules="required"
          name="password"
        >
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            :error-messages="errors.password"
            v-bind="field"
          >
            <template #append-inner>
              <v-icon @click="showPassword = !showPassword">{{
                showPassword ? 'mdi-eye' : 'mdi-eye-off'
              }}</v-icon>
            </template>
          </v-text-field>
        </Field>
      </div>

      <div class="flex gap-2">
        <v-btn-cancel @click="goBack">Cancel</v-btn-cancel>

        <v-btn
          type="submit"
          :loading="loading"
          :disabled="!!Object.keys(errors)?.length"
        >
          Save
        </v-btn>
      </div>
    </Form>
  </base-dialog>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const loading = ref<boolean>(false)
const showPassword = ref<boolean>(false)

user.value = {} as User

const submit = async () => {
  loading.value = true

  try {
    await authStore.create()

    refreshNuxtData('list_all_users')

    goBack()
  } finally {
    loading.value = false
  }
}

const goBack = () => navigateTo('/admin/users')
</script>
