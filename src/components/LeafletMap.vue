<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import 'leaflet/dist/leaflet.css'
  // eslint-disable-next-line
  import * as L from 'leaflet'

  const initialMap = ref(null)

  onMounted(() => {
    initialMap.value = L.map('map').setView([44.804, 20.4651], 12)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(initialMap.value)
  })

</script>

<style scoped>
#map {
  height: 100%;
}
</style>
