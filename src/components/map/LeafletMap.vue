<template>
  <div :class="{ 'map-wrapper': true, 'edit-mode': appStore.editMode, 'is-saving': appStore.isSaving }">
    <div id="map" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/stores/app'
  import 'leaflet/dist/leaflet.css'
  // eslint-disable-next-line
  import * as L from 'leaflet'
  import { COORDINATE_PRECISION } from '@/constants/format.constants'
  import { DEFAULT_MAP_PARAMS } from '@/constants/leaflet.constants'

  interface MapClickEvent {
    lat: number
    lng: number
  }

  const emit = defineEmits<{
    'map-click': [event: MapClickEvent]
  }>()

  const router = useRouter()
  const appStore = useAppStore()
  const initialMap: Ref<L.Map | null> = shallowRef(null)
  const markersLayer: Ref<L.LayerGroup | null> = shallowRef(null)
  const leafletMarkers: Ref<Map<string, L.Marker>> = shallowRef(new Map())

  function addMarkersToMap () {
    if (!initialMap.value || !markersLayer.value) return

    markersLayer.value.clearLayers()
    leafletMarkers.value.clear()

    for (const marker of appStore.markers) {
      if (markersLayer.value) {
        const popupContent = `
          <div style="font-family: Arial, sans-serif;">
            <div style="margin-bottom: 4px;"><strong>ID:</strong> ${marker.id}</div>
            <div style="margin-bottom: 4px;"><strong>LAT:</strong> ${marker.lat.toFixed(COORDINATE_PRECISION)}</div>
            <div><strong>LNG:</strong> ${marker.lng.toFixed(COORDINATE_PRECISION)}</div>
          </div>
        `
        const leafletMarker = L.marker([marker.lat, marker.lng])
          .bindPopup(popupContent)
          .on('click', () => {
            router.push(`/map/${marker.id}`)
          })
        markersLayer.value.addLayer(leafletMarker)
        leafletMarkers.value.set(marker.id, leafletMarker)
      }
    }
  }

  onMounted(() => {
    initialMap.value = L.map('map').setView([DEFAULT_MAP_PARAMS.lat, DEFAULT_MAP_PARAMS.lng], DEFAULT_MAP_PARAMS.zoom)
    L.tileLayer(DEFAULT_MAP_PARAMS.tileSrc, {
      maxZoom: DEFAULT_MAP_PARAMS.maxZoom,
    }).addTo(initialMap.value)

    markersLayer.value = L.layerGroup().addTo(initialMap.value)

    addMarkersToMap()

    watch(() => appStore.markers, () => {
      addMarkersToMap()
    }, { deep: true })

    watch(() => appStore.centerMarker, marker => {
      if (!marker) return

      if (leafletMarkers.value.has(marker.id)) {
        const leafletMarker = leafletMarkers.value.get(marker.id)
        if (leafletMarker) {
          leafletMarker.openPopup()
        }
      }

      if (initialMap.value) {
        initialMap.value.setView([marker.lat, marker.lng], DEFAULT_MAP_PARAMS.centeredZoom)
        appStore.setCenterMarker(null)
      }
    })

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
