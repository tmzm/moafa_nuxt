import { defineRule, configure, Field, Form } from 'vee-validate'
import {
  required,
  email,
  min_value,
  url,
  length,
  max_value
} from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import ar from '@vee-validate/i18n/dist/locale/ar.json'
import en from '@vee-validate/i18n/dist/locale/en.json'

export default defineNuxtPlugin((nuxtApp) => {
  localize({ en, ar })


  configure({
    generateMessage: localize('ar', {
      names: {
        last_name: 'الاسم الأخير',
        first_name: 'الاسم الأول',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        password: 'كلمة السر',
        habit_name: 'اسم العادة',
        reminder_message: 'رسالة التنبيه'
      }
    })
  })
})
