<template>
  <v-card>
    <v-card-text>
      <v-infinite-scroll
        class="!flex-col-reverse gap-6"
        @load="listChat"
        height="300"
      >
        <message-card
          :message
          v-for="message in messages"
        />

        <template v-slot:empty>
          <v-alert variant="outlined" class="border-dashed !border-2 !rounded-lg" color="warning" type="warning"
            >No more messages!</v-alert
          >
        </template>

        <template v-slot:error="{ props }">
          <v-alert type="error">
            <div class="d-flex justify-space-between align-center">
              Something went wrong...
              <v-btn
                color="white"
                size="small"
                variant="outlined"
                v-bind="props"
              >
                Retry
              </v-btn>
            </div>
          </v-alert>
        </template>
      </v-infinite-scroll>
    </v-card-text>

    <v-divider />

    <v-card-actions class="!block">
      <form @submit.prevent="submit">
        <div>
          <base-label>Send Message</base-label>
          <base-textarea v-model="message.content" name="content" />
        </div>
        <v-btn
          class="float-end mb-4"
          type="submit"
          :loading
          append-icon="mdi-send"
          >Send</v-btn
        >
      </form>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

definePageMeta({
  layout: 'admin'
})

const messageStore = useMessageStore()
const authStore = useAuthStore()

const { messages, message, allFetched } = storeToRefs(messageStore)
const { userDetails } = storeToRefs(authStore)

// reset
messages.value = []

const loading = ref(false)

const { handleSubmit } = useForm({
  validationSchema: yup.object().shape({
    content: yup.string().required().max(120)
  })
})

const userId = useRoute().params.user_id

const submitFun = async () => {
  loading.value = true

  try {
    const res = await messageStore.send(Number(userId))

    messages.value.unshift(res.data)

    message.value.content = ''
  } catch {
    showErrorToaster('Message couldn`t be send')
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(submitFun)

// list and scroll
const listChat = async ({ done }: any) => {
  setTimeout(async () => {
    try {
      await messageStore.list(Number(userId))
    } catch (e) {
      done('error')
    }

    done('ok')

    if (allFetched.value) done('empty')
  }, 1000)
}
</script>

<style>
.v-infinite-scroll__side {
  padding: 0 !important;
}
</style>
