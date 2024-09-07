<template>
  <base-dialog
    :loading="pending"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Coupon details</template>

    <Form v-slot="{ errors }" @submit="submit">
      <div>
        <base-label>Coupon code</base-label>

        <Field
          v-model="coupon.code"
          :rules="!userCoupon ? 'required' : undefined"
          name="code"
          v-slot="{ field }"
        >
          <v-text-field
            v-bind="field"
            :error-messages="errors.code"
          />
        </Field>
      </div>

      <div>
        <base-label>Discount Type</base-label>

        <Field
          v-model="coupon.discount_type"
          rules="required"
          name="discount_type"
          v-slot="{ field }"
        >
          <v-select
            v-bind="field"
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
            :model-value="field.value"
            @update:model-value="coupon.discount_type = $event"
            :error-messages="errors.discount_type"
          />
        </Field>
      </div>

      <div>
        <base-label>Discount value</base-label>

        <Field
          v-model="coupon.discount"
          rules="required"
          name="discount"
          v-slot="{ field }"
        >
          <v-text-field
            prepend-inner-icon="mdi-tag-multiple"
            v-bind="field"
            type="number"
            :error-messages="errors.discount"
          />
        </Field>
      </div>

      <base-status-input
        class="my-4"
        item="Is the Coupon for specific user?"
        v-model="userCoupon"
      />

      <div v-if="userCoupon">
        <base-label>Select User</base-label>

        <Field
          v-model="coupon.user_id"
          :rules="userCoupon ? 'required' : undefined"
          name="user"
          v-slot="{ field }"
        >
          <v-autocomplete
            v-bind="field"
            :items="users"
            variant="outlined"
            item-title="name"
            item-value="id"
            clearable
            :model-value="field.value"
            @update:model-value="coupon.user_id = $event"
            :error-messages="errors.user"
          >
            <template v-slot:selection="{ item }">
              <user-item
                :name="item.raw.name"
                :id="item.raw.id"
                :subtitle="item.raw.phone_number"
              />
            </template>
            <template v-slot:item="{ props, item }">
              <user-item
                v-bind="props"
                :name="item.raw.name"
                :id="item.raw.id"
                :subtitle="item.raw.phone_number"
              />
            </template>
          </v-autocomplete>
        </Field>
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

          <v-btn
            type="submit"
            :loading="loading"
            :disabled="!!Object.keys(errors)?.length"
          >
            Save
          </v-btn>
        </div>
      </div>
    </Form>
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
const couponStore = useCouponStore()
const authStore = useAuthStore()
const route = useRoute()

const { coupon, userCoupon } = storeToRefs(couponStore)
const { users } = storeToRefs(authStore)

const loading = ref<boolean>(false)
const deleteDialog = ref(false)

const couponId = route.params.coupon_id

const editMode = couponId != 'create'

const { pending } = useLazyAsyncData<Coupon>(async () => {
  // reset
  coupon.value = {} as Coupon

  coupon.value.discount_type = 'percentage'

  if (editMode) {
    await couponStore.get(Number(couponId))
  }

  await authStore.list()

  userCoupon.value = (coupon.value.user_id !== null)

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

const submit = async () => {
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

const goBack = () => navigateTo('/admin/coupons')
</script>
