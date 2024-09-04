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
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min_value)
  defineRule('max', max_value)
  defineRule('url', url)
  defineRule('length', length)

  localize({ en, ar })

  nuxtApp.vueApp.component('Field', Field)
  nuxtApp.vueApp.component('Form', Form)

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
