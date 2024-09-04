<template>
  <v-card class="mt-6">
    <v-card-text>
      <div class="flex-between-wrap mb-6">
        <div class="text-2xl text-dark">عادات المجموعة</div>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          class="max-w-[400px]"
          placeholder="بحث..."
          hide-details
        />
      </div>

      <v-row v-if="group.habits?.length">
        <v-col v-for="habit in filteredHabits" cols="12" lg="4">
          <group-habit :habit />
        </v-col>
      </v-row>

      <layout-empty-placeholder v-else>
        <template #title> لا يوجد أي عادة في المجموعة </template>

        <template #subtitle>
          يمكنك إنشاء العادات عن طريق ضغظ زر إضافة عادة
        </template>
      </layout-empty-placeholder>
    </v-card-text>
  </v-card>

  <nuxt-page />
</template>

<script lang="ts" setup>
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)

const search = ref('')

const filteredHabits = computed(() =>
  group.value.habits?.filter((habit) => {
    if (!search.value) return true

    return habit.name.includes(search.value)
  })
)
</script>

<style></style>
