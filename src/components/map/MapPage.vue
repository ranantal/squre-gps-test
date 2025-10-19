<template>
  <main class="main">
    <Sidebar />
    <LeafletMap :id="id" />
  </main>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'

  interface Props {
    id?: string
  }

  const props = defineProps<Props>()
</script>

<style scoped>
  .main {
    display: flex;
    height: 100%;
  }
</style>
