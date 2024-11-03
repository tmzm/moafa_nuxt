<template>
  <base-page-header
    title="Prescription Details"
    :breadcrumbs="[
      {
        title: 'Home',
        to: '/admin'
      },
      {
        title: 'Prescriptions',
        to: '/admin/prescriptions'
      },
      {
        title: 'Prescription Details',
        disabled: true
      }
    ]"
  >
  </base-page-header>

  <v-card v-if="!pending">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-img rounded="lg" :src="loadImage(prescription.image)" />
        </v-col>
        <v-col cols="12" md="6">
          <user-item
            @click="navigateTo(`/admin/users/${prescription.user?.id}/details`)"
            show-phone-number
            :user="prescription.user"
          />
          <base-label>Description:</base-label>
          <div class="text-lg">{{ prescription.description }}</div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-end">
      <base-action-button
        v-if="!prescription.order_id"
        :to="`/admin/prescriptions/${prescriptionId}/create-order`"
        icon="mdi-shopping"
        >Create Order</base-action-button
      >
      <base-action-button
        @click="deleteDialog = true"
        color="error"
        icon="mdi-delete"
        >Delete Prescription</base-action-button
      >
    </v-card-actions>
  </v-card>

  <v-skeleton-loader v-else type="image, avatar, list-item-two-line" />

  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    :item="$t('Prescription')"
    @action="remove"
  />

  <nuxt-page />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const deleteDialog = ref(false)

const prescriptionStore = usePrescriptionStore()

const { prescription } = storeToRefs(prescriptionStore)

const prescriptionId = useRoute().params.prescription_id

const { pending } = await useLazyAsyncData(() =>
  prescriptionStore.get(Number(prescriptionId))
)

const goBack = () => navigateTo('/admin/prescriptions')

const remove = async (callback: any) => {
  try {
    await prescriptionStore.remove(Number(prescriptionId))

    // re-get groups information
    await prescriptionStore.list()
  } finally {
    callback()
    goBack()
  }
}
</script>

<style></style>
