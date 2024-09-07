<template>
  <div class="grid grid-cols-3 min-h-screen bg-background">
    <div
      class="relative col-span-2 bg-light_white flex justify-center items-center"
    >
      <img src="/images/login-bg.svg" width="500" alt="" />
      <img class="absolute top-4 start-4 w-24" src="/logo.png" />
    </div>
    <div class="p-8 flex flex-col bg-white justify-between">
      <div>
        <div class="text-3xl font-semi-bold">Register in Moafa</div>
        <div>Your Beautiful online pharmacy</div>
      </div>

      <Form class="flex flex-col gap-4" v-slot="{ errors }" @submit="submit">
        <div>
          <base-label>Name</base-label>
          <Field
            v-model="user.name"
            v-slot="{ field }"
            rules="required"
            name="name"
          >
            <v-text-field :error-messages="errors.name" v-bind="field" />
          </Field>
        </div>

        <div>
          <base-label>Phone number</base-label>
          <Field
            v-model="user.phone_number"
            v-slot="{ field }"
            rules="required"
            name="phone_number"
          >
            <v-text-field
              :error-messages="errors.phone_number"
              v-bind="field"
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

        <v-btn type="submit" :loading class="w-full">Sign up</v-btn>
      </Form>

      <div class="flex gap-2 mt-3">
        <div>Already have an Account?</div>
        <nuxt-link to="/auth/register">Sign in</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const loading = ref(false)
const showPassword = ref(false)

const submit = async () => {
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

definePageMeta({
  layout: 'blank'
})
</script>

<style></style>
