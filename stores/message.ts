import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([])

  const message = ref<Message>({} as Message)

  const users = ref<User[]>([])

  const allFetched = ref(false)

  const list_users = async () => {
    const res = await api('messages/users')

    users.value = res.data
  }

  const list = async (userId: number): Promise<Message[]> => {
    const skip = messages.value.length
    const take = 10

    const res = await api(`messages/users/${userId}`, {
      method: 'post',
      body: {
        skip,
        take
      }
    })

    messages.value.unshift(...res.data.messages)

    if (res.data.count < take) allFetched.value = true

    return messages.value
  }

  const send = async (userId: number) => {
    return await api(`messages/create`, {
      method: 'post',
      body: {
        receiver_id: userId,
        content: message.value.content
      }
    })
  }

  return {
    messages,
    message,
    users,
    allFetched,
    list_users,
    list,
    send
  }
})
