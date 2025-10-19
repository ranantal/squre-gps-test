import type { Marker } from '@/types'

import * as L from 'leaflet'
import { onUnmounted, type Ref, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'

import { COORDINATE_PRECISION } from '@/constants/format.constants'
import { DEFAULT_MAP_PARAMS } from '@/constants/leaflet.constants'

export interface UseMapMarkersReturn {
  updateMarkers: (markers: Marker[]) => void
  focusMarker: (markerId: string) => void
}

export function useMapMarkers (map: Ref<L.Map | null>): UseMapMarkersReturn {
  const router = useRouter()
  const markersLayer = shallowRef<L.LayerGroup | null>(null)
  const leafletMarkers = shallowRef(new Map<string, L.Marker>())

  const initializeMarkersLayer = () => {
    if (!map.value || markersLayer.value) {
      return
    }
    markersLayer.value = L.layerGroup().addTo(map.value)
  }

  const createPopupContent = (marker: Marker): string => {
    return `
      <div style="font-family: Arial, sans-serif;">
        <div style="margin-bottom: 4px;"><strong>ID:</strong> ${marker.id}</div>
        <div style="margin-bottom: 4px;"><strong>LAT:</strong> ${marker.lat.toFixed(COORDINATE_PRECISION)}</div>
        <div><strong>LNG:</strong> ${marker.lng.toFixed(COORDINATE_PRECISION)}</div>
      </div>
    `
  }

  const updateMarkers = (markers: Marker[]) => {
    if (!markersLayer.value) {
      return
    }

    markersLayer.value.clearLayers()
    leafletMarkers.value.clear()

    for (const marker of markers) {
      const leafletMarker = L.marker([marker.lat, marker.lng])
        .bindPopup(createPopupContent(marker))
        .on('click', () => {
          router.push(`/map/${marker.id}`)
        })

      markersLayer.value.addLayer(leafletMarker)
      leafletMarkers.value.set(marker.id, leafletMarker)
    }
  }

  const focusMarker = (markerId: string) => {
    const marker = leafletMarkers.value.get(markerId)
    if (marker && map.value) {
      const latLng = marker.getLatLng()
      map.value.setView(latLng, DEFAULT_MAP_PARAMS.centeredZoom)
      marker.openPopup()
    }
  }

  watch(
    map,
    newMap => {
      if (newMap && !markersLayer.value) {
        initializeMarkersLayer()
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (markersLayer.value && map.value) {
      map.value.removeLayer(markersLayer.value)
      markersLayer.value = null
    }
    leafletMarkers.value.clear()
  })

  return {
    updateMarkers,
    focusMarker,
  }
}
