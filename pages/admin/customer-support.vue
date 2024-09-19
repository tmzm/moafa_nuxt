<template>
  <div>
    <base-page-header
      title="Customers Chats"
      :breadcrumbs="[
        {
          title: 'Home',
          to: '/admin'
        },
        {
          title: 'Customer Chats',
          disabled: true
        }
      ]"
    />

    <v-row>
      <v-col>
        <v-card class="h-full overflow-auto">
          <v-card-title>
            <v-text-field
              hide-details
              placeholder="Search Users"
              prepend-inner-icon="mdi-magnify"
            />
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="user in users">
                <v-card
                  @click="toggle(user)"
                  elevation="0"
                  :class="
                    user == selectedUser
                      ? 'border-dashed border-primary !border-2'
                      : '!border-none'
                  "
                  class="p-4 rounded-lg"
                >
                  <v-card-text class="flex justify-between items-center">
                    <user-item
                      class="!m-0"
                      size="small"
                      :name="user.name"
                      :subtitle="user.phone_number"
                      :id="user.id"
                    />

                    <div>
                      {{ dayjs((user as any).last_message_date).fromNow() }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            {{ selectedUser.name }}
          </v-card-title>

          <v-divider />

          <v-card-text
            ref="chatContainer"
            @scroll.self="onScroll"
            class="h-[45vh] flex flex-col flex-col-reverse bottom-0 gap-6 overflow-auto"
          >
            <template v-if="!selectedUser.id"
              >select user to show messages</template
            >
            <template v-else>
              <div v-if="pending">
                <v-progress-circular indeterminate />
              </div>

              <div
                class="flex"
                :class="{
                  'flex-row-reverse': message.receiver.id == selectedUser.id
                }"
                v-for="message in messages"
              >
                <div class="w-64">
                  <div
                    class="flex justify-between items-center mb-3"
                    :class="{
                      'flex-row-reverse': message.receiver.id == selectedUser.id
                    }"
                  >
                    <user-item
                      class="!m-0"
                      :class="{
                        'flex-row-reverse gap-2':
                          message.receiver.id == selectedUser.id
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
          </v-card-text>

          <v-card-actions v-if="selectedUser.id" class="!block">
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
      </v-col>
    </v-row>
  </div>
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

const chatContainer = ref<HTMLElement>()

const chatContainerHeight = ref<number>(
  chatContainer.value?.clientHeight as number
)

const selectedUser = ref<User>({} as User)

const messageStore = useMessageStore()

const { users, messages, message, allFetched } = storeToRefs(messageStore)

const { pending } = useLazyAsyncData(() => messageStore.list_users())

const loading = ref(false)

const { handleSubmit } = useForm({
  validationSchema: yup.object().shape({
    content: yup.string().required().max(120)
  })
})

const submitFun = async () => {
  loading.value = true

  try {
    const res = await messageStore.send(selectedUser.value.id)

    messages.value.unshift(res.data)

    message.value.content = ''
  } catch {
    showErrorToaster('Message couldn`t be send')
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(submitFun)

const toggle = (user: User) => {
  if (!pending.value || !loading.value) selectedUser.value = user
}

const onScroll = async () => {
  if (
    (chatContainer.value?.scrollTop as number) < 10 &&
    !pending.value &&
    !allFetched.value
  ) {
    await listChat()
  }
}

// list and scroll
const listChat = async () => {
  setTimeout(async () => {
    pending.value = true

    try {
      await messageStore.list(selectedUser.value?.id)

      chatContainer.value?.scrollTo({
        top: calculateScroll(),
        behavior: 'smooth'
      })
    } finally {
      pending.value = false
    }
  }, 300)
}

// calculateSscroll calculates the amount that messages should scroll down after loading some messages, it's the difference between old messages container height and the present container height
const calculateScroll = () => {
  let oldHeight = chatContainerHeight.value

  chatContainerHeight.value = chatContainer.value?.scrollHeight as number

  return chatContainerHeight.value - oldHeight
}

watch(selectedUser, () => {
  messageStore.list(selectedUser.value?.id)
})
</script>

<style></style>
