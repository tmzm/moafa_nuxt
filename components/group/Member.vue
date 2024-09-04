<template>
  <v-card color="background" elevation="0">
    <v-card-text>
      <div class="flex gap-2 items-center">
        <v-avatar
          :image="`https://avatar.iran.liara.run/public/boy?username=${member.userId}`"
        />

        <div class="flex flex-col">
          <div class="text-dark text-lg">
            {{ member.user.first_name }} {{ member.user.last_name }}
          </div>

          <div class="text-slate -mt-1">
            {{ member.user.email }}
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <v-btn
          v-if="member.userId != authStore.user?.id"
          color="red"
          @click="
            $emit('kick', {
              id: member.userId,
              name: member.user.first_name + ' ' + member.user.last_name
            })
          "
          >{{ $t('actions.kick') }}</v-btn
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

defineProps<{
  member: Member
}>()
</script>
