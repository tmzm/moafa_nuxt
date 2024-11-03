<template>
  <base-page-header
    title="Create Order"
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
        to: `/admin/prescriptions/${prescriptionId}`
      },
      {
        title: 'Create Order',
        disabled: true
      }
    ]"
  />

  <v-skeleton-loader
    v-if="pending"
    type="list-item-two-line, list-item-two-line, table"
  />

  <v-row v-else>
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>Prescription Details</v-card-title>

        <v-divider />

        <v-card-text>
          <v-img
            @click="showImage = true"
            class="mb-4 cursor-pointer"
            rounded="lg"
            :src="loadImage(prescription.image)"
          />

          <base-label>User:</base-label>
          <user-item
            @click="navigateTo(`/admin/users/${prescription.user?.id}/details`)"
            size="small"
            class="!m-0 !mb-2 cursor-pointer"
            show-phone-number
            :user="prescription.user"
          />
          <base-label>Description:</base-label>
          <div class="text-lg">{{ prescription.description }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="9">
      <product-table
        v-model="selectedProducts"
        show-select
        :show="['image', 'name', 'price', 'is_offer', 'is_quantity']"
      >
        <template #title>
          <v-card-title>Select Products</v-card-title>
          <v-divider />
        </template>

        <div class="text-lg font-semibold">Add Products to this order</div>
        <div class="p-2 rounded-lg border-dark border">
          <div v-if="selectedProducts.length === 0">
            Select one or more products from the list below by ticking the
            checkbox.
          </div>
          <div v-else class="m-1 mt-2">
            <div class="grid grid-cols-3 gap-4">
              <product-item
                class="border border-dark rounded-lg"
                v-for="selectedProduct in selectedProducts"
                :product="selectedProduct.product"
              />
            </div>
          </div>
        </div>
        <div class="text-lg font-semibold mb-6 mt-2">
          Total price: {{ totalPrice }}
        </div>
      </product-table>

      <base-status-input
        v-model="selectCoupon"
        item="Do you want to apply coupon?"
        class="mt-6"
      />

      <transition>
        <v-card v-if="selectCoupon" class="mt-6">
          <v-card-title> Coupon </v-card-title>

          <v-divider />

          <v-card-text>
            <coupon-lookup> </coupon-lookup>
          </v-card-text>
        </v-card>
      </transition>
    </v-col>
  </v-row>

  <div class="flex gap-2 justify-end mt-4">
          <v-btn @click="goBack" color="gray">Cancel</v-btn>
      <v-btn :disabled="selectedProducts.length <= 0" @click="create"
        >Save</v-btn
      >
  </div>

  <v-dialog
    class="!h-screen"
    @click:outside="showImage = false"
    v-model="showImage"
  >
    <v-img
      v-if="showImage"
      class="!max-h-[90vh]"
      :lazy-src="loadImage()"
      :src="loadImage(prescription.image)"
    />

    <base-icon-button
      variant="tonal"
      icon="mdi-close"
      class="!absolute z-10 right-2 top-2"
      color="gray"
      @click="showImage = false"
    />
  </v-dialog>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})

const prescriptionStore = usePrescriptionStore()
const orderStore = useOrderStore()

const { prescription } = storeToRefs(prescriptionStore)
const { selectedProducts, selectCoupon } = storeToRefs(orderStore)

const prescriptionId = useRoute().params.prescription_id

const { pending } = await useAsyncData(async () => {
  await prescriptionStore.get(Number(prescriptionId))

  if (prescription.value.order_id) {
    showErrorToaster('Order Created Already')

    goBack()
  }
})

const loading = ref(false)

const showImage = ref(false)

const totalPrice = computed(() => {
  let totalPrice = 0

  selectedProducts.value.forEach((selectedProduct) => {
    totalPrice += !selectedProduct.product.is_offer
      ? selectedProduct.product.price
      : ((selectedProduct.product.price *
          (100 - selectedProduct.product.offer)) /
          100) *
        selectedProduct.orderedQuantity
  })

  return totalPrice
})

const create = () => {
  loading.value = true

  try {
    orderStore.create(prescription.value.user_id, Number(prescriptionId))

    showSuccessToaster('Order created successfully')

    goBack()
  } catch {
    showErrorToaster('Something happened, Try again')
  } finally {
    loading.value = false
  }
}

const goBack = () => navigateTo(`/admin/prescriptions/${prescriptionId}`)
</script>

<style></style>
