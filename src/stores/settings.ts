import { defineStore } from 'pinia'
import { STORAGE_KEYS, STORAGE_DEFAULTS } from '@/constants/storage.constants'

export type Locale = 'en' | 'ru'

interface SettingsState {
  locale: Locale
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    locale: (localStorage.getItem(STORAGE_KEYS.LOCALE) as Locale) || (STORAGE_DEFAULTS.LOCALE as Locale),
  }),

  actions: {
    setLocale(locale: Locale) {
      this.locale = locale
      localStorage.setItem(STORAGE_KEYS.LOCALE, locale)
    },
  },
})