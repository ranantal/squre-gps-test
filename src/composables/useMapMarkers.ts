import type { Marker } from '@/types'

import * as L from 'leaflet'
import { onUnmounted, type Ref, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'

import { COORDINATE_PRECISION } from '@/constants/format.constants'
import { DEFAULT_MAP_PARAMS } from '@/constants/leaflet.constants'

export interface UseMapMarkersReturn {
  updateMarkers: (markers: Marker[]) => void
  focusMarker: (markerId: string) => void
  addMarker: (marker: Marker) => void
  removeMarker: (markerId: string) => void
}

export function useMapMarkers (map: Ref<L.Map | null>): UseMapMarkersReturn {
  const router = useRouter()
  const markersLayer = shallowRef<L.LayerGroup | null>(null)
  const leafletMarkers = shallowRef(new Map<string, L.Marker>())
  const currentMarkerIds = shallowRef(new Set<string>())

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

  const addMarker = (marker: Marker) => {
    if (!markersLayer.value) {
      return
    }

    const leafletMarker = L.marker([marker.lat, marker.lng])
      .bindPopup(createPopupContent(marker))
      .on('click', () => {
        router.push(`/map/${marker.id}`)
      })

    markersLayer.value.addLayer(leafletMarker)
    leafletMarkers.value.set(marker.id, leafletMarker)
    currentMarkerIds.value.add(marker.id)
  }

  const removeMarker = (markerId: string) => {
    const existingMarker = leafletMarkers.value.get(markerId)
    if (existingMarker && markersLayer.value) {
      markersLayer.value.removeLayer(existingMarker)
      leafletMarkers.value.delete(markerId)
      currentMarkerIds.value.delete(markerId)
    }
  }

  const updateMarkers = (markers: Marker[]) => {
    if (!markersLayer.value) {
      return
    }

    const newMarkerIds = new Set(markers.map(m => m.id))

    for (const markerId of currentMarkerIds.value) {
      if (!newMarkerIds.has(markerId)) {
        removeMarker(markerId)
      }
    }

    for (const marker of markers) {
      if (!currentMarkerIds.value.has(marker.id)) {
        addMarker(marker)
      }
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
    currentMarkerIds.value.clear()
  })

  return {
    updateMarkers,
    focusMarker,
    addMarker,
    removeMarker,
  }
}
