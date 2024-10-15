<template>
  <rate-table
    class="mt-6"
    title="Recent Rates"
    :hide="['user']"
    :user-id="Number(userId)"
  />
</template>

<script lang="ts" setup>
const userId = useRoute().params.user_id
</script>

<style></style>
