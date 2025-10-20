import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useNavigation() {
  const route = useRoute()

  const activeTab = computed(() => {
    if (route.path === '/') return 'main'
    if (route.path.startsWith('/map')) return 'map'
    return null
  })

  return {
    activeTab,
  }
}