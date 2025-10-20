<template>
  <AppHeader v-if="!isMobile" />
  <MobileHeader v-if="isMobile" />
  <v-main :class="{ 'mobile-content': isMobile }">
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()
  const isMobile = computed(() => mobile.value)
</script>

<style scoped>
.mobile-content {
  padding-top: 56px !important;
}
</style>
