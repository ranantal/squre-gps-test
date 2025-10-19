<template>
  <v-dialog
    v-model="dialogModel"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="text-h6">
        {{ $t('map.error.title') }}
      </v-card-title>

      <v-card-text>
        {{ errorMessage || $t('map.error.message') }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="handleClose"
        >
          {{ $t('map.error.close-button') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    isOpen: boolean
    errorMessage?: string | null
  }

  interface Emits {
    close: []
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const dialogModel = computed({
    get: () => props.isOpen,
    set: () => handleClose(),
  })

  function handleClose () {
    emit('close')
  }
</script>
