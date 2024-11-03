<template>
  <base-dialog
    :loading="loading"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Transfer details</template>

    <form @submit.prevent="submit">
      <div>
        <base-label>Transfer amount</base-label>

        <base-text-field v-model="pointsTransfer.amount" name="amount" />
      </div>

      <div>
        <base-label>Transfer Type</base-label>

        <base-select
          v-model="pointsTransfer.type"
          :items="[
            {
              title: 'Deposit',
              value: 'deposit'
            },
            {
              title: 'Withdrawal',
              value: 'withdrawal'
            }
          ]"
          name="type"
        />
      </div>

      <div>
        <base-label>Reason</base-label>

        <base-text-field v-model="pointsTransfer.reason" name="reason" />
      </div>

      <div>
        <base-label>User Phone number</base-label>

        <base-text-field
          hide-details
          v-model="phoneNumber"
          name="phone_number"
        />

        <transition mode="out-in" class="text-sm">
          <div v-if="status == 'pending'">
            Loading <v-progress-circular indeterminate size="x-small" />
          </div>
          <div class="text-error" v-else-if="status == 'error'">
            Phone number not valid
          </div>
          <div class="text-success" v-else>Phone number valid</div>
        </transition>

        <transition>
          <v-card class="my-4" v-if="userDetails" color="primary" variant="tonal">
            <user-item :user="(userDetails as any)" />
          </v-card>
        </transition>
      </div>

      <div class="flex justify-between">
        <v-spacer />

        <div class="flex gap-2">
          <v-btn-cancel @click="goBack">Cancel</v-btn-cancel>

          <v-btn
            :disabled="status !== 'success'"
            type="submit"
            :loading="loading"
          >
            Save
          </v-btn>
        </div>
      </div>
    </form>
  </base-dialog>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const pointsStore = usePointsStore()
const authStore = useAuthStore()
const route = useRoute()

const { pointsTransfer } = storeToRefs(pointsStore)

const userDetails = ref<User | undefined>()

const loading = ref<boolean>(false)

const phoneNumber = ref()

const { handleSubmit } = useForm<Coupon>({
  validationSchema: yup.object().shape({
    amount: yup.number().required(),
    reason: yup.string().required()
  })
})

pointsStore.reset()

const submitFun = async () => {
  loading.value = true

  try {
    await pointsStore.create()

    // re-get categories information
    await pointsStore.list()

    showSuccessToaster('Points Transferred successfully')

    goBack()
  } catch {
    showErrorToaster('An error occurred, please try again')
  } finally {
    loading.value = false
  }
}

const { status, refresh } = useLazyAsyncData(async () => {
  try {
    const res = await authStore.unique(phoneNumber.value)

    userDetails.value = res.data

    pointsTransfer.value.user_id = res.data.id
  } catch (e) {
    userDetails.value = undefined

    pointsTransfer.value.user_id = undefined as any

    throw e
  }
})

debouncedWatch(phoneNumber, () => refresh(), {
  debounce: 200
})

const submit = handleSubmit(submitFun)

const goBack = () => navigateTo('/admin/points')
</script>
