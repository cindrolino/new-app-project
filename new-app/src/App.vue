<template>
  <component :is="currentViewComponent" />
</template>

<script>
import { computed, onMounted } from 'vue'
import { noteStore } from './store/noteStore'
import { router } from './router'
import ListView from './views/ListView.vue'
import EditorView from './views/EditorView.vue'

export default {
  name: 'App',
  components: {
    ListView,
    EditorView
  },
  setup() {
    const routerState = router.getState()

    const currentViewComponent = computed(() => {
      return routerState.currentView === 'ListView' ? ListView : EditorView
    })

    onMounted(() => {
      noteStore.load()
    })

    return {
      currentViewComponent
    }
  }
}
</script>