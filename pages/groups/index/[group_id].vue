<template>
  <base-dialog
    :loading="pending"
    :model-value="true"
    width="600"
    @close="goBack"
  >
    <template #title> معلومات المجموعة</template>

    <Form v-slot="{ errors }" @submit="submit">
      <div class="label">اسم المجموعة</div>

      <Field
        v-model="group.name"
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
          حذف المجموعة
        </base-action-button>

        <v-spacer />

        <div class="flex gap-2">
          <v-btn-cancel @click="goBack">إلغاء</v-btn-cancel>

          <v-btn
            type="submit"
            :loading
            :disabled="!!Object.keys(errors)?.length"
          >
            حفظ
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
    :item="$t('group')"
    @action="remove"
  />
</template>

<script setup lang="ts">
const groupStore = useGroupStore()
const route = useRoute()

const { group } = storeToRefs(groupStore)

const loading = ref<boolean>(false)
const deleteDialog = ref(false)

const groupId = route.params.group_id

const editMode = groupId != 'create'

const { pending } = useLazyAsyncData<Group>(() => {
  // reset
  groupStore.reset()

  if (editMode) return groupStore.get(Number(groupId))

  return Promise.resolve({} as Group)
})

const remove = async (callback: any) => {
  console.log('test');
  try {
    await groupStore.remove(Number(groupId))

    // re-get groups information
    await groupStore.list()
  } finally {
    callback()
    goBack()
  }
}

const submit = async () => {
  loading.value = true

  try {
    editMode ? await groupStore.update(Number(groupId)) : await groupStore.create()

    // re-get groups information
    await groupStore.list()

    goBack()
  } finally {
    loading.value = false
  }
}

const goBack = () => navigateTo('/groups')
</script>
