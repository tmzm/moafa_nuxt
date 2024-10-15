<template>
  <prescription-table
    class="mt-6"
    title="Recent Prescriptions"
    :hide="['user']"
    :user-id="Number(userId)"
  />
</template>

<script lang="ts" setup>
const userId = useRoute().params.user_id
</script>

<style></style>
