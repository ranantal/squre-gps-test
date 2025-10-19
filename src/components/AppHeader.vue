<template>
  <v-app-bar
    color="primary"
    elevation="2"
    extended
  >
    <v-app-bar-title
      color="white"
      size="large"
      variant="text"
    >
      {{ $t('default-layout.header.title') }}
    </v-app-bar-title>

    <v-spacer />

    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="white"
          variant="text"
        >
          <img
            alt="Current language flag"
            class="flag-icon"
            :src="currentFlagImage"
          >
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLocale('ru')">
          <v-list-item-title>{{ $t('default-layout.languages.russian') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLocale('en')">
          <v-list-item-title>{{ $t('default-layout.languages.english') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <template #extension>
      <v-tabs
        v-model="activeTab"
        color="white"
        slider-color="white"
      >
        <v-tab to="/" :value="'main'">{{ $t('default-layout.header.about') }}</v-tab>
        <v-tab to="/map" :value="'map'">{{ $t('default-layout.header.map') }}</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  const { locale } = useI18n()
  const route = useRoute()

  const currentFlagImage = computed(() => {
    return locale.value === 'ru' ? '/flags/ru.svg' : '/flags/gb.svg'
  })

  const activeTab = computed(() => {
    if (route.path === '/') return 'main'
    if (route.path.startsWith('/map')) return 'map'
    return null
  })

  function changeLocale (newLocale: string) {
    locale.value = newLocale
  }
</script>

<style scoped>
.flag-icon {
  width: 24px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
}
</style>
