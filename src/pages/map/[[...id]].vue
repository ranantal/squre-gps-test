<template>
  <MapPage />

  <v-dialog
    v-model="showError"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="text-h6">
        {{ $t('map.error.title') }}
      </v-card-title>

      <v-card-text>
        {{ $t('map.error.message') }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="handleErrorClose"
        >
          {{ $t('map.error.close-button') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  const showError = ref(false)

  function handleErrorClose () {
    showError.value = false
  }

  onMounted(async () => {
    await appStore.getMarkers()
  })

  appStore.$onAction(({
    name,
    onError,
  }) => {
    onError(error => {
      switch (name) {
        case 'saveMarker':
        case 'getMarkers': {
          showError.value = true
          break
        }
        default: {
          break
        }
      }
    })
  })
</script>
