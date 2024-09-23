<template>
  <base-dialog
    :loading="pending"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Coupon details</template>

    <form @submit.prevent="submit">
      <div>
        <base-label>Coupon code</base-label>

        <base-text-field v-model="coupon.code" name="code" />
      </div>

      <div>
        <base-label>Discount Type</base-label>

        <base-select
          v-model="coupon.discount_type"
          :items="[
            {
              title: 'Percentage value',
              value: 'percentage'
            },
            {
              title: 'Fixed value',
              value: 'fixed'
            }
          ]"
          name="discount_type"
        />
      </div>

      <div>
        <base-label>Discount value</base-label>

        <base-text-field
          prepend-inner-icon="mdi-tag-multiple"
          v-model="coupon.discount"
          type="number"
          name="discount"
        />
      </div>

      <base-status-input
        class="my-4"
        item="Is the Coupon has price?"
        name="is_price"
        v-model="couponIsPrice"
      />

      <div v-if="couponIsPrice">
        <base-label>Price</base-label>

        <base-text-field
          hide-details
          type="number"
          v-model="coupon.price"
          name="price"
        >
          <template #append> SP </template>
        </base-text-field>
      </div>

      <base-status-input
        class="my-4"
        item="Is the Coupon for specific user?"
        name="is_user_coupon"
        v-model="userCoupon"
      />

      <div v-if="userCoupon">
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
      </div>

      <div class="flex justify-between">
        <base-action-button
          v-if="editMode"
          color="error"
          variant="tonal"
          icon="mdi-trash-can-outline"
          @click="deleteDialog = true"
        >
          Delete
        </base-action-button>

        <v-spacer />

        <div class="flex gap-2">
          <v-btn-cancel @click="goBack">Cancel</v-btn-cancel>

          <v-btn type="submit" :loading="loading"> Save </v-btn>
        </div>
      </div>
    </form>
  </base-dialog>

  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    item="Category"
    @action="remove"
  />
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const couponStore = useCouponStore()
const authStore = useAuthStore()
const route = useRoute()

const { coupon, userCoupon, couponIsPrice } = storeToRefs(couponStore)

const loading = ref<boolean>(false)
const deleteDialog = ref(false)

const couponId = route.params.coupon_id

const phoneNumber = ref()

const editMode = couponId != 'create'

const { handleSubmit, setValues } = useForm<Coupon>({
  validationSchema: yup.object().shape({
    code: yup.string().required().min(8),
    discount: yup
      .number()
      .required()
      .when('discount_type', {
        is: (val: any) => {
          return val === 'percentage'
        },
        then: (schema) => schema.min(1).max(99)
      }),
    price: yup.number().when('is_price', {
      is: true,
      then: (schema) => schema.required()
    })
  })
})

const { pending } = useLazyAsyncData<Coupon>(async () => {
  // reset
  couponStore.reset()

  if (editMode) {
    await couponStore.get(Number(couponId))

    couponIsPrice.value =
      coupon.value.price != undefined && coupon.value.price > 0

    setValues({
      ...coupon.value
    })
  }

  userCoupon.value = coupon.value.user_id !== null

  return Promise.resolve({} as Coupon)
})

const remove = async (callback: any) => {
  console.log('test')
  try {
    await couponStore.remove(Number(couponId))

    // re-get groups information
    await couponStore.list()
  } finally {
    callback()
    goBack()
  }
}

const submitFun = async () => {
  loading.value = true

  try {
    editMode
      ? await couponStore.edit(Number(couponId))
      : await couponStore.create()

    // re-get categories information
    await couponStore.list()

    editMode
      ? showSuccessToaster('Coupon updated successfully')
      : showSuccessToaster('Coupon created successfully')

    goBack()
  } catch {
    showErrorToaster('An error occurred, please try again')
  } finally {
    loading.value = false
  }
}

const { status, refresh } = useLazyAsyncData(async () => {
  if (userCoupon.value) {
    try {
      const res = await authStore.unique(phoneNumber.value)

      coupon.value.user_id = res.data.id
    } catch (e) {
      coupon.value.user_id = undefined

      throw e
    }
  }
})

debouncedWatch(phoneNumber, () => refresh(), {
  debounce: 200
})

const submit = handleSubmit(submitFun)

const goBack = () => navigateTo('/admin/coupons')
</script>
