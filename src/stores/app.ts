import type { Marker } from '@/interfaces/marker.interface'
import { defineStore } from 'pinia'
import { ApiService } from '@/utils/api'

export const useAppStore = defineStore('app', {
  state: () => ({
    markers: [] as Array<Marker>,
    isLoading: false,
    isSaving: false,
    editMode: false,
    centerMarker: null as Marker | null,
    error: null as string | null,
  }),

  actions: {
    clearError () {
      this.error = null
    },

    setError (message: string) {
      this.error = message
    },

    setEditMode (value: boolean) {
      this.editMode = value
    },

    async getMarkers () {
      this.isLoading = true
      this.clearError()
      try {
        this.markers = await ApiService.getMarkers()
      } catch (error) {
        console.error('Failed to get markers:', error)
        this.setError('Failed to get markers')
      } finally {
        this.isLoading = false
      }
    },

    async saveMarker (lat: number, lng: number) {
      this.isSaving = true
      this.clearError()
      try {
        const address = await ApiService.getAddress(lat, lng)
        if (!address || address.error) {
          throw new Error('Failed to get address')
        }

        const marker = await ApiService.saveMarker(lat, lng)
        this.markers.push(marker)
      } catch (error) {
        console.error('Failed to save marker:', error)
        this.setError('Failed to save marker')
      } finally {
        this.isSaving = false
        this.editMode = false
      }
    },

    setCenterMarker (marker: Marker | null) {
      this.centerMarker = marker
    },

    async deleteMarker (markerId: string) {
      this.clearError()
      try {
        await ApiService.deleteMarker(markerId)
        this.markers = this.markers.filter(marker => marker.id !== markerId)
      } catch (error) {
        console.error('Failed to delete marker:', error)
        this.setError('Failed to delete marker')
      }
    },
  },
})
