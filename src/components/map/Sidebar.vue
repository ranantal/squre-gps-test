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
            {{ marker.lat.toFixed(COORDINATE_PRECISION) }}, {{ marker.lng.toFixed(COORDINATE_PRECISION) }}
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
  import type { Marker } from '@/types'

  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { COORDINATE_PRECISION } from '@/constants/format.constants'
  import { useAppStore } from '@/stores'

  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()

  const selectedMarkerId = computed(() => (route.params as { id?: string }).id)

  const emit = defineEmits<{
    markerClick: [marker: Marker]
  }>()

  function handleMarkerClick (marker: Marker) {
    appStore.setCenterMarker(marker)
    router.push(`/map/${marker.id}`)
    
    emit('markerClick', marker)
  }

  async function handleDeleteMarker (marker: Marker) {
    const currentMarkerId = selectedMarkerId.value
    const isCurrentMarker = currentMarkerId === marker.id

    await appStore.deleteMarker(marker.id)

    if (isCurrentMarker) {
      router.push('/map')
    }
  }
</script>

<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 280px;
    min-width: 280px;
    padding: 16px;
  }
  
  @media (max-width: 600px) {
    .sidebar {
      height: 100%;
      width: 100%;
      max-width: none;
      height: auto;
    }
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
    max-height: calc(100vh - 150px);
  }

  @media (max-width: 600px) {
    .scrollable-list {
      max-height: calc(100vh - 128px);
    }
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
