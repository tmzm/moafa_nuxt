<template>
  <base-dialog
    :loading="pending"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Brand details</template>

    <Form v-slot="{ errors }" @submit="submit">
      <base-label>Image</base-label>
      <base-image-input v-model="imageFileInput" />

      <base-label>Name</base-label>

      <Field
        v-model="brand.name"
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
    item="Brand"
    @action="remove"
  />
</template>

<script setup lang="ts">
const brandStore = useBrandStore()
const route = useRoute()

const { brand, imageFileInput } = storeToRefs(brandStore)

const loading = ref<boolean>(false)
const deleteDialog = ref(false)

const brandId = route.params.brand_id

const editMode = brandId != 'create'

const { pending } = useLazyAsyncData<Brand>(() => {
  // reset
  brand.value = {} as Brand

  if (editMode) return brandStore.get(Number(brandId))

  return Promise.resolve({} as Brand)
})

const remove = async (callback: any) => {
  console.log('test')
  try {
    await brandStore.remove(Number(brandId))

    // re-get groups information
    await brandStore.list()
  } finally {
    callback()
    goBack()
  }
}

const submit = async () => {
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

const goBack = () => navigateTo('/admin/brands')
</script>
