<template>
  <div :class="{ 'map-wrapper': true, 'edit-mode': appStore.editMode }">
    <div
      id="map"
    />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app'
  import 'leaflet/dist/leaflet.css'
  // eslint-disable-next-line
  import * as L from 'leaflet'

  interface Props {
    id?: string
  }

  interface MapClickEvent {
    lat: number
    lng: number
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    'map-click': [event: MapClickEvent]
  }>()

  const appStore = useAppStore()
  const initialMap: Ref<L.Map | null> = ref(null)

  onMounted(() => {
    initialMap.value = L.map('map').setView([44.804, 20.4651], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(initialMap.value)

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

#map {
  overflow: hidden;
  height: 100%;
}

</style>
