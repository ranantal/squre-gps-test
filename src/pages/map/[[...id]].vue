<template>
  <MapPage />

  <ErrorModal
    :error-message="appStore.error"
    :is-open="!!appStore.error"
    @close="appStore.clearError"
  />
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  onMounted(async () => {
    await appStore.getMarkers()
  })
</script>
