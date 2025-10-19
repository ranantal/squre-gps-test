import type { Marker } from '@/interfaces/marker.interface'

export class BackendService {
  public static getMarkers (): Promise<Marker[]> {
    const markers = localStorage.getItem('markers') || '[]'

    return Promise.resolve(JSON.parse(markers))
  }

  public static saveMarker (lat: number, lng: number): Promise<Marker> {
    const markers = localStorage.getItem('markers') || '[]'
    const id = this.randomid()
    const marker = { id, lat, lng }
    const updatedMarkers = JSON.parse(markers)

    updatedMarkers.push(marker)

    localStorage.setItem('markers', JSON.stringify(updatedMarkers))

    return Promise.resolve(marker)
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
