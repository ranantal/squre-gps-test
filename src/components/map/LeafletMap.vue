<template>
  <div :class="{ 'map-wrapper': true, 'edit-mode': appStore.editMode, 'is-saving': appStore.isSaving }">
    <div id="map" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/stores/app'
  import 'leaflet/dist/leaflet.css'
  // eslint-disable-next-line
  import * as L from 'leaflet'

  interface MapClickEvent {
    lat: number
    lng: number
  }

  const emit = defineEmits<{
    'map-click': [event: MapClickEvent]
  }>()

  const router = useRouter()
  const appStore = useAppStore()
  const initialMap: Ref<L.Map | null> = ref(null)
  const markersLayer: Ref<L.LayerGroup | null> = ref(null)

  function addMarkersToMap () {
    if (!initialMap.value || !markersLayer.value) return

    markersLayer.value.clearLayers()

    for (const marker of appStore.markers) {
      if (markersLayer.value) {
        const popupContent = `
          <div style="font-family: Arial, sans-serif;">
            <div style="margin-bottom: 4px;"><strong>ID:</strong> ${marker.id}</div>
            <div style="margin-bottom: 4px;"><strong>LAT:</strong> ${marker.lat.toFixed(6)}</div>
            <div><strong>LNG:</strong> ${marker.lng.toFixed(6)}</div>
          </div>
        `
        const leafletMarker = L.marker([marker.lat, marker.lng])
          .bindPopup(popupContent)
          .on('click', () => {
            router.push(`/map/${marker.id}`)
          })
        markersLayer.value.addLayer(leafletMarker)
      }
    }
  }

  onMounted(() => {
    initialMap.value = L.map('map').setView([44.804, 20.4651], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(initialMap.value)

    markersLayer.value = L.layerGroup().addTo(initialMap.value)

    addMarkersToMap()

    watch(() => appStore.markers, () => {
      addMarkersToMap()
    }, { deep: true })

    initialMap.value.on('click', (e: L.LeafletMouseEvent) => {
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
