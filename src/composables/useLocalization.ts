import { computed } from 'vue'
import { useSettingsStore, type Locale } from '@/stores/settings'

export function useLocalization() {
  const settingsStore = useSettingsStore()

  const currentLocale = computed(() => settingsStore.locale)

  const changeLocale = (newLocale: Locale) => {
    settingsStore.setLocale(newLocale)
  }

  const getFlagIcon = (localeCode: Locale): string => {
    const flagMap = {
      en: '/flags/gb.svg',
      ru: '/flags/ru.svg',
    }
    return flagMap[localeCode] || flagMap.en
  }

  return {
    currentLocale,
    changeLocale,
    getFlagIcon,
  }
}