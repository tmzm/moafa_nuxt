<template>
  <v-item-group class="mt-4" mandatory multiple>
    <div class="ms-2 mb-2 mt-4">
      {{ $t('days.select') }}
    </div>

    <v-item
      v-for="day in daysNames"
      :value="day"
      v-slot="{ isSelected, toggle }"
    >
      <v-chip
        @click="toggle"
        :color="isSelected ? 'primary' : 'dark'"
        class="ms-2 mt-2"
        >{{ $t(`days.${day}`) }}
      </v-chip>
    </v-item>
  </v-item-group>
</template>

<script setup lang="ts">
const daysNames = ref([
  'MONDAY',
  'WEDNESDAY',
  'FRIDAY',
  'SUNDAY',
  'TUESDAY',
  'THURSDAY',
  'SATURDAY'
])
</script>
