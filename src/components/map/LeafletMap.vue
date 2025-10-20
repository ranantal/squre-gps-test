<template>
  <div :class="{ 'map-wrapper': true, 'edit-mode': appStore.editMode, 'is-saving': appStore.isSaving }">
    <div id="map" />
  </div>
</template>

<script lang="ts" setup>
  import type * as L from 'leaflet'

  import { onMounted, watch } from 'vue'

  import { useLeafletMap } from '@/composables/useLeafletMap'
  import { useMapMarkers } from '@/composables/useMapMarkers'
  import { useAppStore } from '@/stores'

  import 'leaflet/dist/leaflet.css'

  interface MapClickEvent {
    lat: number
    lng: number
  }

  const emit = defineEmits<{
    'map-click': [event: MapClickEvent]
  }>()

  const appStore = useAppStore()
  const { map, initializeMap, setView, addEventListener } = useLeafletMap()
  const { updateMarkers, focusMarker } = useMapMarkers(map)

  onMounted(() => {
    initializeMap('map')

    updateMarkers(appStore.markers)

    watch(() => appStore.markers, () => {
      updateMarkers(appStore.markers)
    }, { deep: true })

    watch(() => appStore.centerMarker, marker => {
      if (!marker) return

      focusMarker(marker.id)
      setView(marker.lat, marker.lng)
      appStore.setCenterMarker(null)
    })

    addEventListener('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      emit('map-click', { lat, lng })
    })
  })
</script>

<style scoped>
.map-wrapper {
  flex-basis: 100%;
}

.map-wrapper.edit-mode #map {
  cursor: crosshair;
}

.map-wrapper.is-saving #map {
  cursor: progress;
}

#map {
  overflow: hidden;
  height: 100%;
}
</style>
