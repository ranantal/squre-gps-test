<template>
  <main class="main">
    <Sidebar v-if="!mobile" />
    
    <v-navigation-drawer
      v-if="mobile"
      v-model="drawer"
      temporary
      location="left"
      width="280"
    >
      <Sidebar @marker-click="handleMarkerClick" />
    </v-navigation-drawer>

    <LeafletMap @map-click="handleMapClick" />

    <v-btn
      v-if="mobile"
      class="menu-button"
      color="primary"
      icon="mdi-menu"
      size="large"
      variant="elevated"
      @click="drawer = !drawer"
    />

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
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'

  import { useAppStore } from '@/stores'

  const appStore = useAppStore()
  const { mobile } = useDisplay()
  
  const drawer = ref(false)

  function handleAddClick () {
    appStore.setEditMode(!appStore.editMode)
  }

  function handleMapClick (event: { lat: number, lng: number }) {
    if (!appStore.editMode || appStore.isSaving) return

    appStore.saveMarker(event.lat, event.lng)
  }

  function handleMarkerClick () {
    if (mobile.value) {
      drawer.value = false
    }
  }
</script>

<style scoped>
  .main {
    display: flex;
    height: 100%;
    position: relative;
  }

  .menu-button {
    position: absolute;
    bottom: 84px;
    right: 24px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .add-button {
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
</style>
