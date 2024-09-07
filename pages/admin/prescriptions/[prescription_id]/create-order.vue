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

  <v-row v-if="!pending">
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>Prescription Details</v-card-title>

        <v-divider />

        <v-card-text>
          <v-img
            @click="showImage = true"
            class="mb-4 cursor-pointer"
            rounded="lg"
            :src="$config.public.baseUrl + prescription.image"
          />

          <base-label>User:</base-label>
          <user-item
            size="small"
            class="!m-0 !mb-2"
            :name="prescription.user?.name"
            :subtitle="prescription.user?.phone_number"
            :id="prescription.user?.id"
            @click="navigateTo(`/admin/users/${prescription.user?.id}`)"
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
              <v-list-item
                v-for="selectedProduct in selectedProducts"
                class="!p-3 border border-dark rounded-lg"
                :title="selectedProduct.product.name"
                :subtitle="'Price: $' + selectedProduct.product.price"
              >
                <template #prepend>
                  <v-img
                    class="!w-14 me-4 aspect-square object-cover"
                    rounded="lg"
                    :src="
                      $config.public.baseUrl + selectedProduct.product.image
                    "
                  />
                </template>
              </v-list-item>
            </div>
          </div>
        </div>
        <div class="text-lg font-semibold mb-6 mt-2">
          Total price: {{ totalPrice }}
        </div>
      </product-table>

      <v-card class="mt-6">
        <v-card-title> Coupon </v-card-title>

        <v-divider />

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <base-status-input
                v-model="selectCoupon"
                item="Do you want to apply Coupon?"
              />
            </v-col>
            <v-col cols="12" md="6">
              <transition>
                <div v-if="selectCoupon">
                  <base-label>Select Coupon</base-label>
                  <v-select hide-details> </v-select>
                </div>
              </transition>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-skeleton-loader
    v-else
    type="list-item-two-line, list-item-two-line, table"
  />

  <v-dialog
    class="!h-screen"
    @click:outside="showImage = false"
    v-model="showImage"
  >
    <v-img
      v-if="showImage"
      class="!max-h-[90vh]"
      :lazy-src="`${$config.public.baseUrl}/images/placeholder.jpg`"
      :src="$config.public.baseUrl + prescription.image"
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

const selectedProducts = ref<{ product: Product; orderedQuantity: number }[]>(
  []
)

const selectCoupon = ref(false)

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

const prescriptionStore = usePrescriptionStore()

const { prescription } = storeToRefs(prescriptionStore)

const prescriptionId = useRoute().params.prescription_id

const { pending } = await useLazyAsyncData(() =>
  prescriptionStore.get(Number(prescriptionId))
)

const goBack = () => navigateTo('/admin/prescriptions')
</script>

<style></style>
