import * as L from 'leaflet'
import { onUnmounted, type Ref, shallowRef } from 'vue'

import { DEFAULT_MAP_PARAMS } from '@/constants/leaflet.constants'

export interface UseLeafletMapReturn {
  map: Readonly<Ref<L.Map | null>>
  initializeMap: (containerId: string) => void
  setView: (lat: number, lng: number, zoom?: number) => void
  addEventListener: (event: string, callback: (e: any) => void) => void
}

export function useLeafletMap (): UseLeafletMapReturn {
  const map = shallowRef<L.Map | null>(null)

  const initializeMap = (containerId: string) => {
    if (map.value) {
      console.warn('Map already initialized')
      return
    }

    try {
      map.value = L['map'](containerId, {
        center: [DEFAULT_MAP_PARAMS.lat, DEFAULT_MAP_PARAMS.lng],
        zoom: DEFAULT_MAP_PARAMS.zoom,
        maxZoom: DEFAULT_MAP_PARAMS.maxZoom,
      })

      L.tileLayer(DEFAULT_MAP_PARAMS.tileSrc, {
        maxZoom: DEFAULT_MAP_PARAMS.maxZoom,
      }).addTo(map.value)
    } catch (error) {
      console.error('Failed to initialize map:', error)
    }
  }

  const setView = (lat: number, lng: number, zoom?: number) => {
    if (!map.value) {
      console.warn('Map not initialized')
      return
    }

    const targetZoom = zoom || DEFAULT_MAP_PARAMS.centeredZoom
    map.value.setView([lat, lng], targetZoom)
  }

  const addEventListener = (event: string, callback: (e: any) => void) => {
    if (!map.value) {
      console.warn('Map not initialized')
      return
    }

    map.value.on(event, callback)
  }

  onUnmounted(() => {
    if (map.value) {
      map.value.remove()
      map.value = null
    }
  })

  return {
    map: map as Readonly<Ref<L.Map | null>>,
    initializeMap,
    setView,
    addEventListener,
  }
}
