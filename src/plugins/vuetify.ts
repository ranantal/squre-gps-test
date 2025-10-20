/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// I18n
import { useI18n } from 'vue-i18n'

// Composables
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

// Local imports
import i18n from './i18n'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  display: {
    mobileBreakpoint: 'sm',
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n: i18n as any, useI18n }),
  },
  theme: {
    defaultTheme: 'system',
  },
})
