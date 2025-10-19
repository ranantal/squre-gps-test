import type { Marker } from '@/types'
import { API_CONFIG } from '@/constants/api.constants'
import { BackendService } from './backend.service'

export class ApiService {
  public static getAddress (lat: number, lng: number): Promise<any> {
    const url = `${API_CONFIG.GEOCODING.BASE_URL}${API_CONFIG.GEOCODING.ENDPOINTS.REVERSE}?lat=${lat}&lon=${lng}&api_key=${API_CONFIG.GEOCODING.API_KEY}`
    return fetch(url).then(response => response.json())
  }

  public static getMarkers (): Promise<Marker[]> {
    return BackendService.getMarkers()
  }

  public static saveMarker (lat: number, lng: number): Promise<Marker> {
    return BackendService.saveMarker(lat, lng)
  }

  public static deleteMarker (markerId: string): Promise<void> {
    return BackendService.deleteMarker(markerId)
  }
}
