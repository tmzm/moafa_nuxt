import type { Notification } from '@/types'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])

  const listAllNotification = async () => {
    try {
      const res = await api('/notifications')

      notifications.value = res.data
    } catch (e) {}
  }

  const readNotifications = async () => {
    try {
      await api(`/notifications/read`)
    } catch (e) {}
  }

  return {
    notifications,
    listAllNotification,
    readNotifications
  }
})
