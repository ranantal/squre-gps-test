import type { Marker } from '@/interfaces/marker.interface'
import { BackendService } from './backend'

export class ApiService {
  private static apiKey = '68f502327e411743351937nav1265ee'

  public static getAddress (lat: number, lng: number): Promise<any> {
    return fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${this.apiKey}`).then(response => response.json())
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
