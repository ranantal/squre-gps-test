<template>
  <aside class="sidebar">
    <v-list-subheader class="text-h6 font-weight-bold">
      {{ $t('map.markers') }}:
    </v-list-subheader>

    <div class="markers-container">
      <v-list v-if="appStore.markers.length > 0" class="scrollable-list">
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
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()
</script>

<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 16px;
  }

  .markers-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .scrollable-list {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 184px);
  }

  .scrollable-list::-webkit-scrollbar {
    width: 6px;
  }

  .scrollable-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .scrollable-list::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .scrollable-list::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
</style>
