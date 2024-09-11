<template>
  <base-dialog
    :loading="pending"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title>Category details</template>

    <form @submit.prevent="submit">
      <base-label>Image</base-label>
      <base-image-input
        :model-url="
          editMode ? $config.public.baseUrl + category.image : undefined
        "
        v-model="imageFileInput"
      />

      <base-label>Name</base-label>

      <base-text-field v-model="category.name" name="name" />

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

const categoryStore = useCategoryStore()
const route = useRoute()

const { category, imageFileInput } = storeToRefs(categoryStore)

const loading = ref<boolean>(false)
const deleteDialog = ref(false)

const categoryId = route.params.category_id

const editMode = categoryId != 'create'

const { handleSubmit, setValues } = useForm<Category>({
  validationSchema: yup.object().shape({
    name: yup.string().required().min(8)
  })
})

const { pending } = useLazyAsyncData<Category>(async () => {
  // reset
  categoryStore.reset()

  if (editMode) {
    await categoryStore.get(Number(categoryId))

    setValues(category.value)
  }

  return Promise.resolve({} as Category)
})

const remove = async (callback: any) => {
  console.log('test')
  try {
    await categoryStore.remove(Number(categoryId))

    // re-get groups information
    await categoryStore.list()
  } finally {
    callback()
    goBack()
  }
}

const submitFun = async () => {
  loading.value = true

  try {
    editMode
      ? await categoryStore.edit(Number(categoryId))
      : await categoryStore.create()

    // re-get categories information
    await categoryStore.list()

    goBack()
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(submitFun)

const goBack = () => navigateTo('/admin/categories')
</script>
