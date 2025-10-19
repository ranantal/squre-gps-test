<template>
  <main class="main">
    <Sidebar />
    <LeafletMap />
  </main>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'

  interface Props {
    id?: string
  }

  const props = defineProps<Props>()

  onMounted(() => {
    console.log('Map ID:', props.id)
  })
</script>

<style scoped>
  .main {
    display: flex;
    height: 100%;
  }
</style>
