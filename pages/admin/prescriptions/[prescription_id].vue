<template>
  <div>
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
      <template #actions>
        <base-action-button
          :to="`/admin/prescriptions/${prescriptionId}/create-order`"
          icon="mdi-shopping"
          >Create Order</base-action-button
        >
        <base-action-button color="error" icon="mdi-delete"
          >Delete Prescription</base-action-button
        >
      </template>
    </base-page-header>
  </div>

  <nuxt-page />
</template>

<script lang="ts" setup>
const prescriptionId = useRoute().params.prescription_id

definePageMeta({
  layout: 'admin'
})
</script>

<style></style>
