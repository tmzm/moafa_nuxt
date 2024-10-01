<template>
  <div
    class="flex"
    :class="{
      'flex-row-reverse': received
    }"
  >
    <div class="min-w-1/2">
      <div
        class="flex gap-4 items-center mb-3"
        :class="{
          'flex-row-reverse': received
        }"
      >
        <user-item
          class="!m-0"
          :class="{
            'flex-row-reverse gap-2': received
          }"
          size="small"
          :name="message.sender.name"
          :id="message.sender.id"
        />

        <div>
          {{ dayjs(message.created_at).fromNow() }}
        </div>
      </div>
      <div class="p-4 rounded-lg bg-light">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

defineProps<{
  message: Message
  received?: boolean
}>()
</script>
