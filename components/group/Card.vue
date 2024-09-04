<template>
  <v-card>
    <v-card-text class="py-8 px-8">
      <nuxt-link
        class="text-decoration-none text-dark"
        :to="`/groups/${group.id}/details/habits`"
      >
        <div class="text-2xl font-weight-bold">{{ group.name }}</div>
      </nuxt-link>

      <div class="flex items-center gap-2">
        <div class="text-lg text-gray-400">عدد المشاركين بالمجموعة</div>

        <v-chip v-if="group._count?.members" color="blue" rounded="lg">
          {{ group._count?.members }} أفراد
        </v-chip>

        <v-chip v-else color="error" rounded="lg"> لا يوجد أفراد </v-chip>
      </div>

      <div class="text-lg font-weight-bold mt-12 mb-4">أعضاء المجموعة</div>

      <v-avatar
        v-for="member in group.members"
        class="-ml-3"
        :image="`https://avatar.iran.liara.run/public/boy?username=${member.userId}`"
      />

      <div class="flex justify-end">
        <base-action-button
          icon="mdi-pencil-outline"
          variant="tonal"
          color="slate"
          size="small"
          :to="`groups/${group.id}`"
        >
          تعديل
        </base-action-button>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  group: Group
}>()
</script>
