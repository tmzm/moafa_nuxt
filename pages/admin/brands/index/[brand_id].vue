<template>
  <base-dialog
    :loading="pending"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Brand details</template>

    <form @submit.prevent="submit">
      <base-label>Image</base-label>
      <base-image-input
        :model-url="editMode ? loadImage(brand.image) : undefined"
        v-model="imageFileInput"
      />

      <base-label>Name</base-label>

      <base-text-field v-model="brand.name" name="name" />

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
          >
            Save
          </v-btn>
        </div>
      </div>
    </form>
  </base-dialog>

  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    item="Brand"
    @action="remove"
  />
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const brandStore = useBrandStore()
const route = useRoute()

const { brand, imageFileInput } = storeToRefs(brandStore)

const loading = ref<boolean>(false)
const deleteDialog = ref(false)

const brandId = route.params.brand_id

const editMode = brandId != 'create'

const { handleSubmit } = useForm({
  validationSchema: yup.object().shape({
    name: yup.string().required().min(8).max(120)
  })
})

const { pending } = useLazyAsyncData<Brand>(() => {
  // reset
  brand.value = {} as Brand

  if (editMode) brandStore.get(Number(brandId))

  return Promise.resolve({} as Brand)
})

const remove = async (callback: any) => {
  try {
    await brandStore.remove(Number(brandId))

    // re-get groups information
    await brandStore.list()
  } finally {
    callback()
    goBack()
  }
}

const submitFun = async () => {
  loading.value = true

  try {
    editMode
      ? await brandStore.edit(Number(brandId))
      : await brandStore.create()

    // re-get groups information
    await brandStore.list()

    goBack()
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(submitFun)

const goBack = () => navigateTo('/admin/brands')
</script>
