<template>
  <order-table
          title="Recent Orders"
          :hide="['user']"
          :user-id="Number(userId)"
        />
</template>

<script lang="ts" setup>
const userId = useRoute().params.user_id

</script>

<style>

</style>