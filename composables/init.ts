export const initGroup = (): Group => ({
  name: ''
})

export const initHabit = (): Habit => ({
  amount: 1,
  category_id: 0,
  goal: 1,
  icon: 'apple_2',
  id: 0,
  interval: 'ANY',
  name: '',
  notification: '12:00',
  start_date: new Date(),
  unit: 'مرة',
  days: [
    'MONDAY',
    'WEDNESDAY',
    'FRIDAY',
    'SUNDAY',
    'TUESDAY',
    'THURSDAY',
    'SATURDAY'
  ],
  notes: '',
  penalty_note: undefined,
  group_id: 0,
  consecutive: false
})
