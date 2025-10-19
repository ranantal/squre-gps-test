import type { Marker } from '@/interfaces/marker.interface'
import { defineStore } from 'pinia'
import { ApiService } from '@/utils/api'

export const useAppStore = defineStore('app', {
  state: () => ({
    markers: [] as Array<Marker>,
    isLoading: false,
    isSaving: false,
    editMode: false,
  }),

  actions: {
    setEditMode (value: boolean) {
      this.editMode = value
    },

    async getMarkers () {
      this.isLoading = true
      this.markers = await ApiService.getMarkers()
      this.isLoading = false
    },

    async saveMarker (lat: number, lng: number) {
      this.isSaving = true
      try {
        const address = await ApiService.getAddress(lat, lng)
        if (!address || address.error) {
          throw new Error('Failed to get address')
        }

        const marker = await ApiService.saveMarker(lat, lng)
        this.markers.push(marker)
      } finally {
        this.isSaving = false
        this.editMode = false
      }
    },
  },
})
