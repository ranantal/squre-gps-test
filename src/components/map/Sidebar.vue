<template>
  <aside class="sidebar">
    <v-list-subheader class="text-h6 font-weight-bold">
      {{ $t('map.markers') }}:
    </v-list-subheader>

    <div class="markers-container">
      <v-list v-if="appStore.markers.length > 0" class="scrollable-list">
        <v-list-item
          v-for="marker in appStore.markers"
          :key="marker.id"
          :class="{ 'selected-marker': selectedMarkerId === marker.id.toString() }"
          @click="handleMarkerClick(marker)"
        >
          <v-list-item-title>
            {{ $t('map.marker') }} {{ marker.id }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ marker.lat.toFixed(6) }}, {{ marker.lng.toFixed(6) }}
          </v-list-item-subtitle>

          <template #append>
            <v-btn
              class="delete-btn"
              color="error"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click.stop="handleDeleteMarker(marker)"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-alert
        v-else
        class="mt-4 no-markers-alert"
        type="info"
        variant="tonal"
      >
        {{ $t('map.no-markers') }}
      </v-alert>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import type { Marker } from '@/interfaces/marker.interface'
  
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAppStore } from '@/stores/app'

  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()

  const selectedMarkerId = computed(() => (route.params as { id?: string }).id)

  function handleMarkerClick (marker: Marker) {
    appStore.setCenterMarker(marker)
    router.push(`/map/${marker.id}`)
  }

  function handleDeleteMarker (marker: Marker) {
    appStore.deleteMarker(marker.id)
  }
</script>

<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 16px;
  }

  .markers-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .scrollable-list {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 184px);
  }

  .no-markers-alert {
    flex: none;
    align-self: flex-start;
  }

  .scrollable-list::-webkit-scrollbar {
    width: 6px;
  }

  .scrollable-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .scrollable-list::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .scrollable-list::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .scrollable-list :deep(.v-list-item) {
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .scrollable-list :deep(.v-list-item:hover) {
    background-color: rgba(0, 0, 0, 0.08);
  }

  .scrollable-list :deep(.v-list-item:active) {
    background-color: rgba(0, 0, 0, 0.12);
  }

  .scrollable-list :deep(.v-list-item.selected-marker) {
    background-color: rgba(25, 118, 210, 0.12);
    border-left: 4px solid #1976d2;
  }

  .scrollable-list :deep(.v-list-item.selected-marker:hover) {
    background-color: rgba(25, 118, 210, 0.16);
  }

  .scrollable-list :deep(.delete-btn) {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .scrollable-list :deep(.v-list-item:hover .delete-btn) {
    opacity: 1;
  }
</style>
