import { ar } from 'vuetify/locale'

export default defineI18nLocale((locale) => ({
  $vuetify: {
    ...ar
  },
  role: {
    COACH: 'Coach',
    USER: 'User',
    PREMIUM: 'Premium',
    ADMIN: 'Admin'
  },
  base: {
    habit: 'Habit',
    day: 'Day',
    completed: 'Completed',
    trying: 'Trying',
    max_streak: 'Max Streak',
    current_streak: 'Current Streak',
    day_of_goal: 'Day completed of goal',
    completed_goal: 'Completed goal'
  },
  toast: {
    success: {
      group_create: 'group created successfully',
      copy_link: 'link copied successfully',
      kick: 'member removed from group successfully',
      group_update: 'group updated successfully',
      group_delete: 'group deleted successfully'
    }
    // error: {

    // }
  },
  actions: {
    save: 'Save',
    copy_link: 'Copy Link',
    add_habit: 'Add Habit',
    logout: 'Logout',
    login: 'Log in',
    signup: 'Sign up',
    yes_delete: 'Yes Delete!',
    cancel: 'Cancel',
    yes_kick: 'Yes Kick!',
    kick: 'kick from group'
  },
  email: {
    label: 'Email',
    placeholder: 'Enter your email'
  },
  password: {
    label: 'Password',
    placeholder: 'enter Password'
  },
  habit_name: {
    label: 'Habit Name',
    placeholder: 'enter Habit Name'
  },
  icon: {
    label: 'Choose an icon'
  },
  goal: {
    label: 'Set a goal',
    continuous: 'Continuous goal',
    tooltip: 'The goal is the amount you want to reach'
  },
  interval: {
    label: 'Interval',
    ANY: 'Any interval',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly'
  },
  amount: 'Amount during the day',
  days: {
    select: 'Select days',
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday'
  },
  notifications: {
    label: 'Notifications',
    time: 'Choose notification time'
  },
  remindMe: 'Remind me at',
  reminder: {
    label: 'Reminder message',
    placeholder: 'Example: Did you drink water today?'
  },
  date: {
    label: 'Start date'
  },
  login: {
    hero: {
      title: 'The best way to develop your habits',
      subtitle: 'Start evolving simply with Salim'
    },
    card: {
      title: 'Log in to Salim',
      subtitle: 'Enter your email and password and enter your habit portal',
      submit: 'Log in',
      no_account: 'Not a Member yet? '
    }
  },
  signup: {
    hero: {
      title: 'The best way to develop your habits',
      subtitle: 'Start evolving simply with Salim'
    },
    card: {
      title: 'Sign up to Salim',
      subtitle: 'Enter your personal information and enter your habit portal',
      submit: 'Sign up',
      have_account: 'Already have an Account? '
    }
  },
  links: {
    home: 'Home',
    habits: 'Habits',
    groups: 'Groups',
    group_details: 'View group',
    my_account: 'My account'
  },
  habits_dialog: {
    title: 'Add Habit',
    submit: 'Save'
  },
  language: {
    label: 'Language',
    ar: 'Arabic',
    en: 'English'
  },
  delete_dialog: {
    text: 'Are you sure you want to delete'
  },
  kick_dialog: {
    text: 'Are you sure you want to kick'
  },
  group: 'Group',
  groups: 'Groups',
  habit: 'Habit',
  habits: 'Habits',
  group_members: 'Group Members'
}))
