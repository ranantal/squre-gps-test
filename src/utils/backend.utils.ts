import type { Marker } from '@/interfaces/marker.interface'
import { STORAGE_DEFAULTS, STORAGE_KEYS } from '@/constants/storage.constants'

export class BackendService {
  public static getMarkers (): Promise<Marker[]> {
    const markers = localStorage.getItem(STORAGE_KEYS.MARKERS) || STORAGE_DEFAULTS.MARKERS

    return Promise.resolve(JSON.parse(markers))
  }

  public static saveMarker (lat: number, lng: number): Promise<Marker> {
    const markers = localStorage.getItem(STORAGE_KEYS.MARKERS) || STORAGE_DEFAULTS.MARKERS
    const id = this.randomid()
    const marker = { id, lat, lng }
    const updatedMarkers = JSON.parse(markers)

    updatedMarkers.push(marker)

    localStorage.setItem(STORAGE_KEYS.MARKERS, JSON.stringify(updatedMarkers))

    return Promise.resolve(marker)
  }

  public static deleteMarker (markerId: string): Promise<void> {
    const markers = localStorage.getItem(STORAGE_KEYS.MARKERS) || STORAGE_DEFAULTS.MARKERS
    const updatedMarkers = JSON.parse(markers).filter((marker: Marker) => marker.id !== markerId)

    localStorage.setItem(STORAGE_KEYS.MARKERS, JSON.stringify(updatedMarkers))

    return Promise.resolve()
  }

  private static randomid (): string {
    const bytes = new Uint8Array(16)

    crypto.getRandomValues(bytes)
    bytes[6] = ((bytes[6] || 0) & 0x0f) | 0x40
    bytes[8] = ((bytes[8] || 0) & 0x3f) | 0x80

    const hex: string = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('')

    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }
}
