<template>
  <main class="main">
    <Sidebar />
    <LeafletMap @map-click="handleMapClick" />

    <v-btn
      class="add-button"
      color="primary"
      icon="mdi-plus"
      size="large"
      variant="elevated"
      @click="handleAddClick"
    />
  </main>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  function handleAddClick () {
    appStore.setEditMode(!appStore.editMode)
  }

  function handleMapClick (event: { lat: number, lng: number }) {
    if (!appStore.editMode || appStore.isSaving) return

    appStore.saveMarker(event.lat, event.lng)
  }
</script>

<style scoped>
  .main {
    display: flex;
    height: 100%;
    position: relative;
  }

  .add-button {
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
</style>
