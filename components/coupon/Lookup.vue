<template>
  <base-label>Type Coupon Code</base-label>
  <v-text-field v-model="couponCode" placeholder="#******" hide-details />
  <transition mode="out-in">
    <div class="text-primary" v-if="status == 'pending'">
      loading <v-progress-circular size="x-small" indeterminate />
    </div>
    <div class="text-error" v-else-if="status == 'error'">Code not valid</div>
    <div class="text-success" v-else>Code valid</div>
  </transition>
</template>

<script lang="ts" setup>
const couponStore = useCouponStore()
const orderStore = useOrderStore()

const { couponCode } = storeToRefs(orderStore)

const {
  status,
  refresh
} = useLazyAsyncData(() => couponStore.unique(couponCode.value))

debouncedWatch(couponCode, async () => refresh(), {
  debounce: 200
})
</script>

<style></style>
