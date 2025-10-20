<template>
  <v-app-bar
    color="primary"
    elevation="2"
    height="56"
    class="mobile-header"
  >
    <v-app-bar-nav-icon
      color="white"
      @click="drawer = !drawer"
    />
    
    <v-app-bar-title
      color="white"
      class="mobile-title"
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
          size="small"
        >
          <img
            alt="Current language flag"
            class="flag-icon-mobile"
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
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    width="280"
  >
    <v-list>
      <v-list-item
        :active="activeTab === 'main'"
        prepend-icon="mdi-information"
        :title="$t('default-layout.header.about')"
        to="/"
        @click="drawer = false"
      />
      
      <v-list-item
        :active="activeTab === 'map'"
        prepend-icon="mdi-map"
        :title="$t('default-layout.header.map')"
        to="/map"
        @click="drawer = false"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useLocalization } from '@/composables/useLocalization'
  import { useNavigation } from '@/composables/useNavigation'

  const { currentLocale, changeLocale, getFlagIcon } = useLocalization()
  const { activeTab } = useNavigation()

  const drawer = ref(false)
  const currentFlagImage = computed(() => getFlagIcon(currentLocale.value))
</script>

<style scoped>
.mobile-header {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1005;
}

.mobile-title {
  font-size: 18px !important;
  font-weight: 500;
}

.flag-icon-mobile {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  object-fit: cover;
}
</style>