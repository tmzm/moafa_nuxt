<template>
  <base-menu location="start top" close-on-content-click>
    <template v-slot:activator="{ props, isActive }">
      <v-list-item
      v-if="listItem"
        v-bind="props"
        prepend-icon="mdi-translate"
        :title="$t('language.label')"
      />

      <div v-else class="cursor-pointer w-fit" v-bind="props">
        <v-avatar size="small">
          <v-img :src="currentLocale?.image"></v-img
        ></v-avatar>
        <span class="ms-2">{{ currentLocale?.title }}</span>
      </div>
    </template>

    <template #menu>
      <v-list density="compact">
        <v-list-item
          v-for="locale in locales"
          :title="locale.title"
          @click="changeLocale(locale.value)"
        >
          <template #prepend>
            <img :src="locale.image" class="rounded w-8 me-4" />
          </template>
        </v-list-item>
      </v-list>
    </template>
  </base-menu>
</template>

<script setup lang="ts">
import { useLocale } from 'vuetify'
import { useI18n } from '#i18n'

const locales = ref<{ title: string; value: string; image: string }[]>([
  {
    title: 'العربية',
    value: 'ar',
    image: 'https://flagcdn.com/sa.svg'
  },
  {
    title: 'ُEnglish',
    value: 'en',
    image: 'https://flagcdn.com/us.svg'
  }
])

const { current } = useLocale()
const { setLocale } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find(l => l.value == current.value)
})

const changeLocale = (locale: string) => {
  current.value = locale

  // change locale for i18n
  setLocale(locale)
}

defineProps<{
  listItem?: boolean
}>()
</script>
