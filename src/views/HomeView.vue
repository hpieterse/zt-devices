<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTaskStore } from '@/stores/task-store'
import { computed } from 'vue'

// initialize the store
const taskStore = useTaskStore()
taskStore.dispatchInitialize()

const storeError = computed(() => taskStore.failed)
const storeInitializing = computed(() => !taskStore.initialized)
</script>

<template>
  <template v-if="storeInitializing">
    <p class="text-center">Loading...</p>
  </template>
  <p v-else-if="storeError" class="text-center text-red-600">
    The store failed to load. Please reload the page to try again.
  </p>
  <RouterView v-else />
</template>
