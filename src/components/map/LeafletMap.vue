<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import 'leaflet/dist/leaflet.css'
  // eslint-disable-next-line
  import * as L from 'leaflet'

  interface Props {
    id?: string
  }

  const props = defineProps<Props>()

  const initialMap: Ref<L.Map | null> = ref(null)

  onMounted(() => {
    initialMap.value = L.map('map').setView([44.804, 20.4651], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(initialMap.value)
  })
</script>

<style scoped>
#map {
  flex-basis:100%;
}
</style>
