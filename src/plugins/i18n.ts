/**
 * plugins/i18n.ts
 *
 * Vue i18n configuration
 */

import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    header: {
      title: 'Test task for SqureGPS',
      about: 'About Task',
      map: 'Map',
    },
    languages: {
      russian: 'Русский',
      english: 'English',
    },
  },
  ru: {
    header: {
      title: 'Тестовое задание для SqureGPS',
      about: 'О Задании',
      map: 'Карта',
    },
    languages: {
      russian: 'Русский',
      english: 'English',
    },
  },
}

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  legacy: false,
  globalInjection: true,
})
