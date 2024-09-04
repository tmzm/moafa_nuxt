import { ar } from 'vuetify/locale'

export default defineI18nLocale((locale) => ({
  $vuetify: {
    ...ar
  },
  role: {
    COACH: 'كوتش',
    USER: 'مستخدم',
    PREMIUM: 'بريميوم',
    ADMIN: 'أدمن'
  },
  actions: {
    save: 'حفظ',
    copy_link: 'نسخ الرابط',
    add_habit: 'إضافة عادة',
    logout: 'تسجيل الخروج',
    login: 'سجل الدخول',
    signup: 'أنشئ الحساب',
    yes_delete: 'نعم احذفها!',
    cancel: 'إلغاء',
    yes_kick: 'نعم اطرد!',
    kick: 'طرد'
  },
  base: {
    habit: 'عادة',
    day: 'يوم',
    completed: 'منهي',
    trying: 'قيد المحاولة',
    max_streak: 'أقصى سلسلة',
    current_streak: 'السلسلة الحالية',
    day_of_goal: 'يوم محقق',
    completed_goal: 'نسبة تحقيق الهدف',
    penalty_days_count: 'أيام التعويض'
  },
  toast: {
    success: {
      group_create: 'تم إنشاء المجموعة بنجاح',
      copy_link: 'تم نسخ الرابط بنجاح',
      kick: 'تم طرد العضو من المجموعة بنجاح',
      group_update: 'تم تعديل المجموعة بنجاح',
      group_delete: 'تم حذف المجموعة بنجاح'
    }
    // error: {

    // }
  },
  first_name: {
    label: 'الاسم',
    placeholder: 'أدخل اسمك'
  },

  last_name: {
    label: 'الكنية',
    placeholder: 'أدخل الكنية'
  },

  email: {
    label: 'البريد الإلكتروني',
    placeholder: 'أدخل بريدك الإلكتروني'
  },
  password: {
    label: 'كلمة السر',
    placeholder: 'أدخل كلمة السر'
  },
  habit_name: {
    label: 'اسم العادة',
    placeholder: 'أدخل اسم العادة'
  },
  icon: {
    label: 'اختر أيقونة'
  },
  goal: {
    label: 'ضع هدفاً',
    continuous: 'هدف مستمر',
    tooltip: 'الهدف هو كمية تريد الوصول إليها'
  },
  interval: {
    label: 'الفترة الزمنية',
    ANY: 'أي فترة',
    DAILY: 'كل يوم',
    WEEKLY: 'كل أسبوع',
    MONTHLY: 'كل شهر'
  },
  amount: 'الكمية خلال اليوم',
  days: {
    select: 'اختر الأيام',
    SUNDAY: 'الأحد',
    MONDAY: 'الإثنين',
    TUESDAY: 'الثلاثاء',
    WEDNESDAY: 'الأربعاء',
    THURSDAY: 'الخميس',
    FRIDAY: 'الجمعة',
    SATURDAY: 'السبت'
  },
  notifications: {
    label: 'التنبيهات',
    time: 'اختر وقت التنبيه'
  },
  remindMe: 'ذكرني في',

  reminder: {
    label: 'رسالة التنبيه',
    placeholder: 'مثال: هل شربت الماء اليوم؟'
  },

  date: {
    label: 'تاريخ البداية'
  },

  penalty_note: {
    label: 'تعويض العادة',
    placeholder: 'ادخل تعويض العادة إن وجد',
    details: 'كيفية تعويض العادة. في حال ترك الحقل فارغاً فلا يمكن تعويض العادة'
  },

  login: {
    hero: {
      title: 'أفضل طريقة لتطوير عاداتك',
      subtitle: 'ابدأ التطور بشكل بسيط مع سليم'
    },
    card: {
      title: 'سجل الدخول إلى سليم',
      subtitle: 'أدخل بريدك الإلكتروني وكلمة السر وادخل الى بوابة عادتك',
      submit: 'تسجيل الدخول',
      no_account: 'ليس لديك حساب؟ '
    }
  },

  signup: {
    hero: {
      title: 'أفضل طريقة لتطوير عاداتك',
      subtitle: 'ابدأ التطور بشكل بسيط مع سليم'
    },
    card: {
      title: 'أنشئ حساب مع سليم',
      subtitle: 'أدخل معلوماتك الشخصية وادخل الى بوابة عادتك',
      submit: 'إنشاء حساب',
      have_account: 'لديك حساب بالفعل؟'
    }
  },

  links: {
    home: 'الصفحة الرئيسية',
    habits: 'العادات',
    groups: 'المجموعات',
    group_details: 'عرض المجموعة',
    my_account: 'حسابي'
  },

  habits_dialog: {
    title: 'معلومات العادة',
    submit: 'حفظ'
  },
  language: {
    label: 'اللغة',
    ar: 'العربية',
    en: 'الإنكليزية'
  },
  delete_dialog: {
    text: 'هل أنت متاكد انك تريد حذف'
  },
  kick_dialog: {
    text: 'هل انت متاكد انك تريد طرد'
  },
  group: 'مجموعة',
  groups: 'مجموعات',
  habit: 'عادة',
  habits: 'العادات',
  group_members: 'اعضاء المجموعة'
}))
