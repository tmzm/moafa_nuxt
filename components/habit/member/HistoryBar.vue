<template>
  <div class="flex w-full">
    <v-tooltip
      location="top center"
      v-for="(h, i) in historyList"
      :text="h.date"
    >
      <template v-slot:activator="{ props }">
        <div
          v-bind="props"
          class="h-4 cursor-pointer border !border-white flex-1"
          :class="{
            'bg-primary !hover:bg-green-500': h.value == 'DONE',
            'bg-warning !hover:bg-yalow-500': h.value == 'PENALTY',
            'bg-error !hover:bg-red-500': h.value == 'NONE',
            'rounded-s-full': i == 0,
            'rounded-e-full': i == historyList.length - 1
          }"
        />
      </template>
    </v-tooltip>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  historyList: HistoryItem[]
}>()
</script>

<style></style>
