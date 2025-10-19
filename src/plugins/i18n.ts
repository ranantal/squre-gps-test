/**
 * plugins/i18n.ts
 *
 * Vue i18n configuration
 */

import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    'default-layout': {
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
    'map': {
      'markers': 'Markers',
      'marker': 'Marker',
      'no-markers': 'No markers found',
      'error': {
        'title': 'Error',
        'message': 'An error occurred while retrieving the address',
        'close-button': 'OK',
      },
    },
  },
  ru: {
    'default-layout': {
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
    'map': {
      'markers': 'Маркеры',
      'marker': 'Маркер',
      'no-markers': 'Маркеры не найдены',
      'error': {
        'title': 'Ошибка',
        'message': 'Произошла ошибка при получении адреса',
        'close-button': 'ОК',
      },
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
