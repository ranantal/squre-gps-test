<template>
  <MapPage :id="id" />
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = (route.params as { id?: string }).id || ''
</script>
