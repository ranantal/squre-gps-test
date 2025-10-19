<template>
  <aside class="sidebar">
    <div class="text-h5">{{ $t('map.markers') }}:</div>

    <v-list v-if="appStore.markers.length > 0">
      <v-list-item
        v-for="marker in appStore.markers"
        :key="marker.id"
      >
        <v-list-item-title>
          {{ $t('map.marker') }} {{ marker.id }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ marker.lat.toFixed(6) }}, {{ marker.lng.toFixed(6) }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-alert
      v-else
      class="mt-4"
      type="info"
      variant="tonal"
    >
      {{ $t('map.no-markers') }}
    </v-alert>
  </aside>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()
</script>

<style scoped>
  .sidebar {
    width: 300px;
    padding: 16px;
  }
</style>
