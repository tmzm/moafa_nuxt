<template>
  <div
    class="flex"
    :class="{
      'flex-row-reverse': message.type == 'RECEIVED'
    }"
  >
    <div class="min-w-1/2">
      <div
        class="flex gap-4 items-center mb-3"
        :class="{
          'flex-row-reverse': message.type == 'RECEIVED'
        }"
      >
        <user-item
          v-if="message.type == 'RECEIVED'"
          class="!m-0 flex-row-reverse gap-2"
          size="small"
          :name="message.user.first_name + ' ' + message.user.last_name"
          :id="message.user.id"
        />

        <div class="text-xs">
          {{ dayjs(message.created_at).fromNow() }}
        </div>
      </div>
      <div
        class="p-3 rounded-lg text-xs bg-light"
        :style="
          message.type == 'SENDED'
            ? 'border-start-start-radius: 0 !important;'
            : 'border-start-end-radius: 0 !important;'
        "
      >
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

defineProps<{
  message: Message
}>()
</script>
